const Utils = rootRequire('utils/Utils.js');
const CompileError = rootRequire('utils/CompileError.js');

function regMustBeReg1(reg){
	return reg.bitshiftAmt != 0 || reg.coreshiftAmt != 0;
}

function regMustBeReg2(reg){
	return false;
}

module.exports = (ast, errors) => {
	const expandGPURegModifiers = (regWithModifiers) => {
		const modifiersToken = regWithModifiers.modifiers;
		const modifiers = modifiersToken.val; 
		const reg = regWithModifiers.reg;
		let bitshiftAmt = 0;
		let coreshiftAmt = 0;
		for(modifier of modifiers){
			switch(modifier){
				case 'l':
				case 'r':
					if(coreshiftAmt != 0){
						errors.push(CompileError.error(
							'Repeated horizontal shift modifier on' + Utils.tokenToString(reg) + '.',
							modifiersToken.loc
						));
					}
					coreshiftAmt = (modifier == 'l') ? -1 : 1;
				break;
				case 'u':
				case 'd':
					if(bitshiftAmt != 0){
						errors.push(CompileError.error(
							'Repeated vertical shift modifier on ' + Utils.tokenToString(reg) + '.',
							modifiersToken.loc
						));
					}
					bitshiftAmt = (modifier == 'u') ? -1 : 1;
				break;
				default:
					errors.push(CompileError.error(
						'Invalid modifier \'' + modifier + '\' on GPU register ' + Utils.regToString(reg) + '.',
						modifiersToken.loc
					));
				break;
			}
		}
		reg.bitshiftAmt = bitshiftAmt;
		reg.coreshiftAmt = coreshiftAmt;
	};
	Utils.mapStatements(ast, {
		gpu: (statement) => {
			let regsValid = true;
			expandGPURegModifiers(statement.reg1);
			expandGPURegModifiers(statement.reg2);
			const reg1 = statement.reg1.reg;
			const reg2 = statement.reg2.reg;
			if(!regsValid){
				return null;
			}
			const reg1MustBeReg1 = regMustBeReg1(reg1);
			const reg2MustBeReg1 = regMustBeReg1(reg2);
			const reg1MustBeReg2 = regMustBeReg2(reg1);
			const reg2MustBeReg2 = regMustBeReg2(reg2);
			if(reg1MustBeReg1 && reg2MustBeReg1){
				errors.push(CompileError.error(
					'Only one operand can be shifted.',
					statement.loc
				));
				return null;
			}
			if(reg1MustBeReg2 && reg2MustBeReg2){
				errors.push(CompileError.error(
					'Only one operand can be a uniform.',
					statement.loc
				));
				return null;
			}
			const needSwap = reg1MustBeReg2 || reg2MustBeReg1;
			statement.reg1 = needSwap ? reg2 : reg1;
			statement.reg2 = needSwap ? reg1 : reg2;
			if(needSwap){
				statement.truthTable.val =
					((statement.truthTable.val & 0b0010) << 1) |
					((statement.truthTable.val & 0b0100) >> 1) |
					(statement.truthTable.val & 0b1001);
			}
			return statement;
		},
		screen: (statement) => {
			if(statement.updateGraphicsBuffer){
				expandGPURegModifiers(statement.dataReg);
			}
			return statement;
		}
	});
};


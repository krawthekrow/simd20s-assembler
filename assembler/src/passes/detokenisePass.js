const Utils = rootRequire('utils/Utils.js');
const CompileError = rootRequire('utils/CompileError.js');

function detokeniseGPUReg1(statement, reg1){
	statement.reg1 = reg1.val;
	statement.bitshift = reg1.bitshiftAmt != 0;
	statement.coreshift = reg1.coreshiftAmt != 0;
	if(statement.bitshift){
		statement.bitshiftDir = (reg1.bitshiftAmt == 1) ? 1 : 0;
	}
	if(statement.coreshift){
		statement.coreshiftDir = (reg1.coreshiftAmt == 1) ? 1 : 0;
	}
}

module.exports = (ast, errors) => {
	Utils.mapStatements(ast, {
		gpu: (statement) => {
			statement.writeReg = statement.writeReg.val;
			statement.truthTable = statement.truthTable.val;
			const reg1 = statement.reg1;
			const reg2 = statement.reg2;
			detokeniseGPUReg1(statement, reg1);
			delete statement.reg1;
			delete statement.reg2;
			statement.reg2Type = reg2.regType;
			statement.reg2 = reg2.val;
			return statement;
		},
		screen: (statement) => {
			if(statement.updateGraphicsBuffer){
				const reg1 = statement.reg1;
				delete statement.reg1;
				detokeniseGPUReg1(statement, reg1);
			}
			if(statement.updateColour)
				statement.colour = statement.colour.val;
			return statement;
		}
	});
}

const Utils = rootRequire('utils/Utils.js');
const CompileError = rootRequire('utils/CompileError.js');

function normaliseSyntax(block, errors){
	Utils.mapStatements(block, {
		gpu: (statement) => {
			statement.writeEnable = true;
			return statement;
		},
		screen: (statement) => {
			statement.flushScreen = false;
			statement.updateGraphicsBuffer = !(statement.dataReg.type == 'placeholder');
			if(!statement.updateGraphicsBuffer) delete statement.dataReg;
			statement.updateColour = !(statement.colour.type == 'placeholder');
			if(!statement.updateColour) delete statement.colour;
			for(extension of statement.extensions){
				switch(extension.type){
					case 'flush':
						statement.flushScreen = true;
					break;
					default:
						errors.push(CompileError.critical(
							'Unrecognised GPU statement extension type -- ' + extension.type,
							extensions.loc
						));
					break;
				}
			}
			delete statement.extensions;
			return statement;
		}
	});
};

module.exports = (ast, errors) => {
	normaliseSyntax(ast, errors);
};

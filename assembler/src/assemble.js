const fs = require('fs');
const jison = require('jison');

const CompileError = rootRequire('utils/CompileError.js');

const normaliseSyntaxPass = rootRequire('passes/normaliseSyntaxPass.js');
const expandMacrosPass = rootRequire('passes/expandMacrosPass.js');
const expandBlockStatementsPass = rootRequire('passes/expandBlockStatementsPass.js');
const expandSpecialMacrosPass = rootRequire('passes/expandSpecialMacrosPass.js');
const expandRegistersPass = rootRequire('passes/expandRegistersPass.js');
const validateBoundsPass = rootRequire('passes/validateBoundsPass.js');
const detokenisePass = rootRequire('passes/detokenisePass.js');
const flattenTreePass = rootRequire('passes/flattenTreePass.js');
const encodeOpsPass = rootRequire('passes/encodeOpsPass.js');
const setRayBitPass = rootRequire('passes/setRayBitPass.js');

const grammar = fs.readFileSync('grammar.jison', 'utf8');
const parser = new jison.Parser(grammar);

module.exports = (code) => {
	const errors = [];

	let parseSuccessful = true;
	let ast = null;
	try{
		ast = parser.parse(code);
	}
	catch(err){
		errors.push(CompileError.parse(err.message));
		parseSuccessful = false;
	}

	const output = [];

	try{
		if(ast != null){
			normaliseSyntaxPass(ast, errors);
			expandMacrosPass(ast, errors);

			expandSpecialMacrosPass(ast, errors);
			expandBlockStatementsPass(ast, errors);

			expandRegistersPass(ast, errors);

			validateBoundsPass(ast, errors);
			detokenisePass(ast, errors);
			flattenTreePass(ast, errors);

			encodeOpsPass(ast, errors);
			setRayBitPass(ast, errors);

			for(statement of ast.statements){
				console.assert(statement.type);
				console.assert(statement.loc);
				switch(statement.type){
					case 'word':
						output.push(statement.val.toString(2));
					break;
					default:
						errors.push(CompileError.critical(
							'Non-word statement after final pass -- ' + statement.type + '.',
							statement.loc
						));
					break;
				}
			}
		}
	}
	catch(err){
		errors.push(CompileError.critical('Assembler crashed -- \n' + err.stack, null));
	}

	CompileError.sortErrors(errors);
	
	return {
		binary: output,
		errors: errors
	};
};

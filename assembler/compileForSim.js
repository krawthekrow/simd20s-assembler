require('./rootRequire.js');

const fs = require('fs');

const assemble = rootRequire('assemble.js');
const objToJS = rootRequire('utils/objToJS.js');

const inputFile = (process.argv.length < 3) ?
	'tests/asm/gpuTest.asm' :
	process.argv[2];
const code = fs.readFileSync(inputFile, 'utf8');

const assemblerOutput = assemble(code);
const errors = assemblerOutput.errors;

const lines = code.split('\n');

for(error of errors){
	console.log(error.getOutputString());
	if(error.loc != null && error.loc.line >= 1 && error.loc.line - 1 < lines.length){
		console.log(lines[error.loc.line - 1]);
		console.log(new Array(Math.max(error.loc.col, 0)).fill('-').join('') + '^');
	}
}

if(errors.every((error) => {
	return error.type == 'warning';
})){
	const binaryJS = objToJS(assemblerOutput.binary);
	fs.writeFileSync('../simulation/src/tests/gpuTest.js', binaryJS);
}
else{
	console.log('Compile failed.');
}

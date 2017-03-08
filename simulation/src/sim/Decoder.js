function extractField(instruction, offset, length){
	return (instruction >> offset) & ((1 << length) - 1);
}

function extractBool(instruction, offset){
	return extractField(instruction, offset, 1) == 1;
}

module.exports = {
	extractField: extractField,
	extractBool: extractBool
};

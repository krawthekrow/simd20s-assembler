const CompileError = rootRequire('utils/CompileError.js');
const Format = rootRequire('arch/InstructionFormat.js');
const Arch = rootRequire('arch/Arch.js');
const Opcodes = rootRequire('arch/Opcodes.js');
const Utils = rootRequire('utils/Utils.js');

function validateInstruction(instruction, errors, loc){
	if(instruction < 0 || instruction > Arch.WORD_MAX){
		errors.push(CompileError.critical(
			'Instruction word out of bounds [0, ' + Arch.WORD_MAX.toString() + '] -- ' + instruction.toString(2),
			statement.loc
		));
		return 0;
	}
	return instruction;
}

module.exports = (ast, errors) => {
	for(const [i, statement] of ast.statements.entries()){
		if(statement == null){
			errors.push(CompileError.critical(
				'Null statement encountered after tree flattened.',
				ast.loc
			));
			continue;
		}
		switch(statement.type){
			case 'gpu':
			{
				let instruction = 0;
				instruction |= statement.writeReg << Format.GPU_WRITE_REG_OFFSET;
				instruction |= statement.truthTable << Format.GPU_OPCODE_OFFSET;
				instruction |= statement.reg1 << Format.GPU_REG1_OFFSET;
				if(statement.coreshift){
					instruction |= 1 << Format.GPU_CORESHIFT_FLAG_OFFSET;
					instruction |= statement.coreshiftDir << Format.GPU_CORESHIFT_DIR_OFFSET;
				}
				if(statement.bitshift){
					instruction |= 1 << Format.GPU_BITSHIFT_FLAG_OFFSET;
					instruction |= statement.bitshiftDir << Format.GPU_BITSHIFT_DIR_OFFSET;
				}
				instruction |= statement.reg2 << Format.GPU_REG2_OFFSET;
				instruction |= Utils.boolToInt(statement.writeEnable) << Format.GPU_WRITE_ENABLE_FLAG_OFFSET;

				instruction = validateInstruction(instruction, errors, statement.loc);
				ast.statements[i] = {
					type: 'word',
					val: instruction,
					loc: statement.loc
				};
			}
			break;
			case 'screen':
			{
				let instruction = 0;
				instruction |= Format.SCREEN_OPCODE << Format.GPU_OPCODE_OFFSET;
				instruction |= statement.dataReg << Format.GPU_REG1_OFFSET;
				if(statement.coreshift){
					instruction |= 1 << Format.GPU_CORESHIFT_FLAG_OFFSET;
					instruction |= statement.coreshiftDir << Format.GPU_CORESHIFT_DIR_OFFSET;
				}
				if(statement.bitshift){
					instruction |= 1 << Format.GPU_BITSHIFT_FLAG_OFFSET;
					instruction |= statement.bitshiftDir << Format.GPU_BITSHIFT_DIR_OFFSET;
				}
				instruction |= Utils.boolToInt(statement.flushScreen) << Format.SCREEN_FLUSH_FLAG_OFFSET;
				instruction |= Utils.boolToInt(statement.updateColour) << Format.SCREEN_UPDATE_COLOUR_FLAG_OFFSET;
				instruction |= Utils.boolToInt(statement.updateGraphicsBuffer) << Format.SCREEN_UPDATE_GRAPHICS_BUFFER_FLAG_OFFSET;
				instruction |= statement.colour << Format.SCREEN_COLOUR_OFFSET;

				instruction = validateInstruction(instruction, errors, statement.loc);
				ast.statements[i] = {
					type: 'word',
					val: instruction,
					loc: statement.loc
				};
			}
			break;
			case 'op':
			{
				let instruction = 0;
				instruction |= opcode << Format.OPCODE_OFFSET;
				if(reg1 in statement){
					instruction |= statement.reg1 << REG1_OFFSET;
				}
				if(imm in statement){
					instruction |= (statement.imm & Format.IMM_MASK) << Format.IMM_OFFSET;
				}
				instruction = validateInstruction(instruction, errors, statement.loc);
				ast.statements[i] = {
					type: 'word',
					val: instruction,
					loc: statement.loc
				};
			}
			break;
			case 'word':
				statement.val &= Arch.WORD_MASK;
			break;
		}
	}
};

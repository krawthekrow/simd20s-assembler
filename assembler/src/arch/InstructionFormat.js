class InstructionFormat {
};

InstructionFormat.UPDATE_FLAGS_OFFSET = 28;
InstructionFormat.OPCODE_OFFSET = 22;

InstructionFormat.REG1_OFFSET = 18;
InstructionFormat.IMMREG_FLAG_OFFSET = 17;

InstructionFormat.IMM_OFFSET = 0;
InstructionFormat.IMM_WIDTH = 17;
InstructionFormat.IMM_MASK = 1 << InstructionFormat.IMM_WIDTH;
InstructionFormat.IMM_MAX = 1 << (InstructionFormat.IMM_WIDTH - 1);
InstructionFormat.IMM_MIN = -(1 << (InstructionFormat.IMM_WIDTH - 1));


InstructionFormat.GPU_WRITE_REG_OFFSET = 0;
InstructionFormat.GPU_WRITE_ENABLE_OFFSET = 5;
InstructionFormat.GPU_REG2_OFFSET = 6;
InstructionFormat.GPU_REG1_OFFSET = 11;
InstructionFormat.GPU_BITSHIFT_DIR_OFFSET = 16;
InstructionFormat.GPU_BITSHIFT_FLAG_OFFSET = 17;
InstructionFormat.GPU_CORESHIFT_DIR_OFFSET = 18;
InstructionFormat.GPU_CORESHIFT_FLAG_OFFSET = 19;
InstructionFormat.GPU_REG_LENGTH = 5;

InstructionFormat.GPU_OPCODE_OFFSET = 20;
InstructionFormat.GPU_OPCODE_LENGTH = 4;

InstructionFormat.SCREEN_COLOUR_OFFSET = 0;
InstructionFormat.SCREEN_COLOUR_LENGTH = 4;
InstructionFormat.SCREEN_FLUSH_FLAG_OFFSET = 4;
InstructionFormat.SCREEN_UPDATE_COLOUR_FLAG_OFFSET = 5;
InstructionFormat.SCREEN_UPDATE_GRAPHICS_BUFFER_FLAG_OFFSET = 6;

module.exports = InstructionFormat;

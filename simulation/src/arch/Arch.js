class Arch {
};

Arch.SCREEN_WIDTH = 20;
Arch.SCREEN_HEIGHT = 20;

Arch.NUM_REG = 32;
Arch.CPU_RAM_SIZE = 1 << 10;

Arch.NUM_GPU_REG = 32;
Arch.GPU_REG_WIDTH = 20;
Arch.GPU_REG_HEIGHT = 20;

Arch.NUM_COLOURS = (1 << 4);

Arch.WORD_WIDTH = 29;
Arch.WORD_MASK = 1 << Arch.WORD_WIDTH;
Arch.WORD_MAX = 1 << (Arch.WORD_WIDTH - 1);
Arch.WORD_MIN = -(1 << (Arch.WORD_WIDTH - 1));

Arch.RAY_BIT = 0x20000000;

module.exports = Arch;

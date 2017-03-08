Assembler for the upcoming SIMD20S (an SIMD unit made in The Powder Toy). Still under development and very unstable. This is a fork of [SIMD16S's assembler](https://github.com/krawthekrow/simd16s-assembler), which has been abandoned for obvious reasons.

See arch_docs.txt for sketchy details on the SIMD20S architecture (along with a lot of other future plans).

To use:

1. Install [node](https://nodejs.org/en/).
2. `node assembler.js asm-file > bin-file`, where asm-file is the assembly code and bin-file is the file to output the machine code to. So, for example, `node assembler.js gpuTest.asm > gpuTest.bin`.
3. Use `loadProgram.lua` to load a program into the RAM. Enter `loadfile('loadProgram.lua')(x, y, filename)` into the Lua console, where (x, y) are the coordinates of the top-left corner of the RAM block, and filename is the name of the machine code file. So, for example, `loadfile('loadProgram.lua')(71, 112, 'gpuTest.bin')`
4. Don't complain about my using Javascript.

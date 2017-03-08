import Arch from 'arch/Arch.js';
import InstructionFormat from 'arch/InstructionFormat.js';
import {extractField, extractBool} from 'sim/Decoder.js';
import DebugUtils from 'sim/DebugUtils.js';

const Format = InstructionFormat;

class CPUSim{
	constructor(){
		this.memory = new Uint32Array(Arch.CPU_RAM_SIZE);
		this.programCounter = 0;
	}
	attachScreen(screen){
		this.screen = screen;
	}
	attachGPU(gpu){
		this.gpu = gpu;
	}
	runCycle(){
		const instruction = this.memory[this.programCounter];
		DebugUtils.logWord(instruction);
		this.programCounter = (this.programCounter + 1) % Arch.CPU_RAM_SIZE;
		this.gpu.instruction = instruction;
		this.screen.instruction = instruction;
		const isGPUCommand = true;
		if(!isGPUCommand) this.gpu.disabled = true;
	}
};

module.exports = CPUSim;

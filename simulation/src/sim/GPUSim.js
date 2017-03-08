import Arch from 'arch/Arch.js';
import InstructionFormat from 'arch/InstructionFormat.js';
import {extractField, extractBool} from 'sim/Decoder.js';
import DebugUtils from 'sim/DebugUtils.js';

const Format = InstructionFormat;
const TT_OVERWRITE = 0b0011;
const FILLED_COLUMN = (1 << Arch.GPU_REG_HEIGHT) - 1;

class GPUSim {
	constructor(){
		this.regs = new Array(Arch.NUM_GPU_REG).fill(
			new Uint32Array(Arch.GPU_REG_WIDTH).fill(0)
		);
		this.instruction = 0;
		this.disabled = false;
	}
	attachGraphicsBuffer(graphicsBuffer){
		this.graphicsBuffer = graphicsBuffer;
	}
	runCycle(){
		if(!this.disabled){
			const instruction = this.instruction;
			const opcode = extractField(instruction, Format.GPU_OPCODE_OFFSET, Format.GPU_OPCODE_LENGTH);
			const reg1 = extractField(instruction, Format.GPU_REG1_OFFSET, Format.GPU_REG_LENGTH);
			const reg2 = extractField(instruction, Format.GPU_REG2_OFFSET, Format.GPU_REG_LENGTH);
			const coreshift = extractBool(instruction, Format.GPU_CORESHIFT_FLAG_OFFSET);
			let coreshiftDir = (extractField(instruction, Format.GPU_CORESHIFT_DIR_OFFSET, 1) == 1) ? 1 : -1;
			if(!coreshift) coreshiftDir = 0;
			const bitshift = extractBool(instruction, Format.GPU_BITSHIFT_FLAG_OFFSET);
			let bitshiftDir = (extractField(instruction, Format.GPU_BITSHIFT_DIR_OFFSEt, 1) == 1) ? 1 : -1;
			if(!bitshift) bitshiftDir = 0;
			let truthTable = opcode;
			let writeEnable = extractBool(instruction, Format.GPU_WRITE_ENABLE_OFFSET);
			const writeReg = extractField(instruction, Format.GPU_WRITE_REG_OFFSET, Format.GPU_REG_LENGTH);
			let updateGraphicsBuffer = true;
			const isScreenCommand = opcode == Format.SCREEN_OPCODE;
			if(isScreenCommand){
				updateGraphicsBuffer = extractBool(instruction, Format.SCREEN_UPDATE_GRAPHICS_BUFFER_FLAG_OFFSET);
				writeEnable = false;
				truthTable = TT_OVERWRITE;
			}

			const reg1Val = new Uint32Array(Arch.GPU_REG_WIDTH);
			for(let i = 0; i < Arch.GPU_REG_WIDTH; i++){
				const oi = i + coreshiftDir;
				let columnVal = (oi >= 0 && oi < Arch.GPU_REG_WIDTH) ? this.regs[reg1][oi] : 0;
				if(bitshiftDir == -1) columnVal <<= 1;
				else if(bitshiftDir == 1) columnVal >>= 1;
				reg1Val[i] = columnVal;
			}
			console.log(truthTable);
			const reg2Val = this.regs[reg2];
			const result = new Uint32Array(Arch.GPU_REG_WIDTH).fill(0);
			for(let i = 0; i < Arch.GPU_REG_WIDTH; i++){
				for(let tti = 0; tti < 4; tti++){
					if(extractBool(truthTable, 4 - tti - 1))
						result[i] |= (reg1Val[i] ^ (extractBool(tti, 1) ? 0 : FILLED_COLUMN)) & (reg2Val[i] ^ (extractBool(tti, 0) ? 0 : FILLED_COLUMN));
				}
			}
			if(updateGraphicsBuffer) this.graphicsBuffer.set(result);
			if(writeEnable) this.regs[writeReg] = result;
		}
		this.disabled = false;
	}
};

module.exports = GPUSim;

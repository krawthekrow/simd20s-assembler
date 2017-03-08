import {Dimensions, Vector, Utils} from 'utils/Utils.js';
import Arch from 'arch/Arch.js';
import InstructionFormat from 'arch/InstructionFormat.js';
import {extractField, extractBool} from 'sim/Decoder.js';
import DebugUtils from 'sim/DebugUtils.js';

const Format = InstructionFormat;

const SCREEN_COLOURS_DEFAULT = new Uint32Array([
	0xDDDDDD,
	0xDB7D3E,
	0xB350BC,
	0x6B8AC9,
	0xB1A627,
	0x41AE38,
	0xD08499,
	0x404040,
	0x9AA1A1,
	0x2E6E89,
	0x7E3DB5,
	0x2E388D,
	0x4F321F,
	0x35461B,
	0x963430,
	0x191616
]);
const SCREEN_INITIAL_COLOUR_DEFAULT = 0xF;

function colourToCSSString(colour){
	return '#' + Utils.padStr(colour.toString(16), 6);
}

class ScreenSim {
	constructor(ctx, boundingRect){
		this.ctx = ctx;
		this.boundingRect = boundingRect;
		
		this.pixDims = new Dimensions(
			this.boundingRect.width / Arch.SCREEN_WIDTH,
			this.boundingRect.height / Arch.SCREEN_HEIGHT
		);

		this.colours = SCREEN_COLOURS_DEFAULT;
		const initialColour = SCREEN_INITIAL_COLOUR_DEFAULT;
		this.buffer = new Uint32Array(Arch.SCREEN_HEIGHT * Arch.SCREEN_WIDTH).fill(
			this.colours[initialColour]
		);
		this.colour = initialColour;
		this.inputBuffer = new Uint32Array(Arch.SCREEN_WIDTH);
		this.instruction = 0;
	}
	flush(){
		for(let i = 0; i < Arch.SCREEN_HEIGHT; i++){
			for(let i2 = 0; i2 < Arch.SCREEN_WIDTH; i2++){
				this.ctx.fillStyle = colourToCSSString(
					this.buffer[i * Arch.SCREEN_WIDTH + i2]
				);
				this.ctx.fillRect(
					this.boundingRect.x + i2 * this.pixDims.width,
					this.boundingRect.y + i * this.pixDims.height,
					this.pixDims.width, this.pixDims.height
				);
			}
		}
	}
	runCycle(){
		const instruction = this.instruction;
		const opcode = extractField(instruction, Format.GPU_OPCODE_OFFSET, Format.GPU_OPCODE_LENGTH);
		if(opcode != Format.SCREEN_OPCODE) return;
		const updateColour = extractBool(instruction, Format.SCREEN_UPDATE_COLOUR_FLAG_OFFSET);
		const colour = extractField(instruction, Format.SCREEN_COLOUR_OFFSET, Format.SCREEN_COLOUR_LENGTH);
		const flush = extractBool(instruction, Format.SCREEN_FLUSH_FLAG_OFFSET);
		if(updateColour) this.colour = colour;
		const colourVal = this.colours[this.colour];
		for(let i = 0; i < Arch.SCREEN_HEIGHT; i++){
			for(let i2 = 0; i2 < Arch.SCREEN_WIDTH; i2++){
				if(((this.inputBuffer[i2] >> i) & 1) == 1)
					this.buffer[i * Arch.SCREEN_WIDTH + i2] = colourVal;
			}
		}
		if(flush) this.flush();
	}
	convertMousePosToPixCoords(mousePos){
		return new Vector(
			Math.floor(mousePos.x / this.pixDims.width),
			Math.floor(mousePos.y / this.pixDims.height)
		);
	}
};

module.exports = ScreenSim;

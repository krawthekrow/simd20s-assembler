import Arch from 'arch/Arch.js';
import {Utils} from 'utils/Utils.js';

class DebugUtils {
};

DebugUtils.logGPUReg = (reg) => {
	let str = '';
	for(let i = 0; i < Arch.GPU_REG_HEIGHT; i++){
		for(let i2 = 0; i2 < Arch.GPU_REG_WIDTH; i2++){
			str += ((reg[i2] >> i) & 1).toString();
		}
		str += '\n';
	}
	console.log(str);
};

DebugUtils.logWord = (word) => {
	console.log(Utils.padStr(word.toString(2), 29));
};

module.exports = DebugUtils;

import Arch from 'arch/Arch.js';
import DebugUtils from 'sim/DebugUtils.js';

class GraphicsBufferSim {
	constructor(){
		this.reg = new Uint32Array(Arch.GPU_REG_WIDTH);
	}
	set(val){
		this.reg = val;
	}
	get(){
		return this.reg;
	}
};

module.exports = GraphicsBufferSim;

import ScreenSim from 'sim/ScreenSim.js';
import GPUSim from 'sim/GPUSim.js';
import CPUSim from 'sim/CPUSim.js';
import GraphicsBufferSim from 'sim/GraphicsBufferSim.js';
import DebugUtils from 'sim/DebugUtils.js';

class FullSystemSim {
	constructor(screenCtx, screenBoundingRect){
		this.screen = new ScreenSim(screenCtx, screenBoundingRect);
		this.gpu = new GPUSim();
		this.cpu = new CPUSim();
		this.graphicsBuffer = new GraphicsBufferSim();
		this.gpu.attachGraphicsBuffer(this.graphicsBuffer);
		this.cpu.attachScreen(this.screen);
		this.cpu.attachGPU(this.gpu);
		this.screen.flush();
	}
	loadProgram(binary){
		for(const [i, val] of binary.entries()){
			this.cpu.memory[i] = val;
		}
	}
	runCycle(){
		this.cpu.runCycle();
		this.gpu.runCycle();
		this.screen.inputBuffer = this.graphicsBuffer.get();
		this.screen.runCycle();
	}
};

module.exports = FullSystemSim;

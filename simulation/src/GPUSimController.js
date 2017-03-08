import Arch from 'arch/Arch.js';
import FullSystemSim from 'sim/FullSystemSim.js';
import gpuTest from 'tests/gpuTest.js';
import {Vector, Dimensions} from 'utils/Utils.js';

const FRAME_INTERVAL = 1000.0 / 60.0;

class GPUSimController {
	constructor(screenCtx, screenBoundingRect){
		this.sim = new FullSystemSim(screenCtx, screenBoundingRect);
		this.sim.loadProgram(gpuTest.map(str => (parseInt(str, 2) & (~ Arch.RAY_BIT))));
		this.prevFrameTime = 0;
		this.simRunning = false;
		this.isMouseDown = false;
		this.mousePos = new Vector(0, 0);
		this.debug_cycle_countdown = 3;
	}
	startSim(){
		this.prevFrameTime = Date.now();
		this.simRunning = true;
		requestAnimationFrame(() => this.updateSimWrapper());
	}
	updateSim(){
		if(this.isMouseDown) this.sim.handleTouch(this.mousePos);
		this.sim.runCycle();
		this.debug_cycle_countdown--;
		if(this.debug_cycle_countdown == 0) this.stopSim();
	}
	updateSimWrapper(){
		if(!this.simRunning) return;
		const currFrameTime = Date.now();
		const elapsed = currFrameTime - this.prevFrameTime;
		if(elapsed >= FRAME_INTERVAL){
			this.prevFrameTime += FRAME_INTERVAL;
			this.updateSim();
		}
		requestAnimationFrame(() => this.updateSimWrapper());
	}
	stopSim(){
		this.simRunning = false;
	}
	handleMouseDown(mousePos){
		this.isMouseDown = true;
		this.mousePos = mousePos;
	}
	handleMouseUp(){
		this.isMouseDown = false;
	}
	handleMouseMove(mousePos){
		this.mousePos = mousePos;
	}
};

module.exports = GPUSimController;

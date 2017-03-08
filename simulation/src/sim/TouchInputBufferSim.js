const TOUCH_INPUT_BUFFER_Y_OFFSET = 0;
const TOUCH_INPUT_BUFFER_X_OFFSET = 5;
const TOUCH_INPUT_BUFFER_DIRTY_FLAG_OFFSET = 10;

class TouchInputBufferSim {
	constructor(){
		this.reg = 0;
	}
	handleTouch(mousePos){
		this.reg = (mousePos.y << TOUCH_INPUT_BUFFER_Y_OFFSET) +
			(mousePos.x << TOUCH_INPUT_BUFFER_X_OFFSET) +
			(1 << TOUCH_INPUT_BUFFER_DIRTY_FLAG_OFFSET);
	}
};

module.expots = TouchInputBufferSim;


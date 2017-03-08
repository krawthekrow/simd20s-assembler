import React from 'react';
import ReactDOM from 'react-dom';
import {Utils, Dimensions, Vector, Rect} from 'utils/Utils.js';
import GPUSimController from 'GPUSimController.js';

class GPUSimGUI extends React.Component {
	constructor(props){
		super(props);
		this.SCREEN_CANVAS_DIMS = new Dimensions(400, 400);
		this.SCREEN_BOUNDING_RECT = new Rect(
			new Vector(0, 0),
			this.SCREEN_CANVAS_DIMS
		);
	}
	getCanvasMousePos(ev){
		const canvasRect = canvas.getBoundingClientRect();
		return new Vector(
			ev.clientX - canvasRect.left,
			ev.clientY - canvasRect.top
		);
	}
	componentDidMount(){
		this.controller = new GPUSimController(this.screenCtx, this.SCREEN_BOUNDING_RECT);
		this.screenCtx = this.screenCanvas.getContext('2d');
		this.screenCanvas.addEventListener('mousedown', ev => {
			this.GPUSimController.handleMouseDown(getCanvasMousePos(ev));
		});
		this.screenCanvas.addEventListener('mouseup', ev => {
			this.GPUSimController.handleMouseUp();
		});
		this.screenCanvas.addEventListener('mousemove', ev => {
			this.GPUSimController.handleMouseMove(getCanvasMousePos(ev));
		});
		this.controller.startSim();

	}
	componentWillUnmount(){
	}
	render(){
		return (
			<div>
				<canvas key="mainCanvas" width={this.SCREEN_CANVAS_DIMS.width} height={this.SCREEN_CANVAS_DIMS.height} style={{marginTop: '10px', marginBottom: '40px'}} ref={canvas => {this.screenCanvas = canvas;}}>
					It's about time you upgrade your browser.
				</canvas>
			</div>
		);
	}
};

function init(){
    ReactDOM.render(<GPUSimGUI />, document.getElementById('indexContainer'));
}

module.exports = {
	init: init
};

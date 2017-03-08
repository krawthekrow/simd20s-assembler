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
	getScreenCanvasMousePos(ev){
		const canvasRect = this.screenCanvas.getBoundingClientRect();
		return new Vector(
			ev.clientX - canvasRect.left,
			ev.clientY - canvasRect.top
		);
	}
	componentDidMount(){
		this.screenCtx = this.screenCanvas.getContext('2d');
		this.controller = new GPUSimController(this.screenCtx, this.SCREEN_BOUNDING_RECT);
		this.handleMouseDown = ev => {
			this.controller.handleMouseDown(this.getScreenCanvasMousePos(ev));
		};
		this.handleMouseUp = ev => {
			this.controller.handleMouseUp();
		};
		this.handleMouseMove = ev => {
			this.controller.handleMouseMove(this.getScreenCanvasMousePos(ev));
		};
		this.screenCanvas.addEventListener('mousedown', this.handleMouseDown);
		this.screenCanvas.addEventListener('mouseup', this.handleMouseUp);
		this.screenCanvas.addEventListener('mousemove', this.handleMouseMove);
		this.controller.startSim();

	}
	componentWillUnmount(){
		this.screenCanvas.removeEventListener('mousedown', this.handleMouseDown);
		this.screenCanvas.removeEventListener('mouseup', this.handleMouseUp);
		this.screenCanvas.removeEventListener('mousedown', this.handleMouseMove);
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

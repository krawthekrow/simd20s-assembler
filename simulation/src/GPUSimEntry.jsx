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
	componentDidMount(){
		this.screenCtx = this.screenCanvas.getContext('2d');
		this.controller = new GPUSimController(this.screenCtx, this.SCREEN_BOUNDING_RECT);
		this.controller.startSim();
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

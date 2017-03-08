var GPUSim =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/GPUSimEntry.jsx ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 3);
	
	var _GPUSimController = __webpack_require__(/*! GPUSimController.js */ 4);
	
	var _GPUSimController2 = _interopRequireDefault(_GPUSimController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GPUSimGUI = function (_React$Component) {
		_inherits(GPUSimGUI, _React$Component);
	
		function GPUSimGUI(props) {
			_classCallCheck(this, GPUSimGUI);
	
			var _this = _possibleConstructorReturn(this, (GPUSimGUI.__proto__ || Object.getPrototypeOf(GPUSimGUI)).call(this, props));
	
			_this.SCREEN_CANVAS_DIMS = new _Utils.Dimensions(400, 400);
			_this.SCREEN_BOUNDING_RECT = new _Utils.Rect(new _Utils.Vector(0, 0), _this.SCREEN_CANVAS_DIMS);
			return _this;
		}
	
		_createClass(GPUSimGUI, [{
			key: 'getCanvasMousePos',
			value: function getCanvasMousePos(ev) {
				var canvasRect = canvas.getBoundingClientRect();
				return new _Utils.Vector(ev.clientX - canvasRect.left, ev.clientY - canvasRect.top);
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;
	
				this.controller = new _GPUSimController2.default(this.screenCtx, this.SCREEN_BOUNDING_RECT);
				this.screenCtx = this.screenCanvas.getContext('2d');
				this.screenCanvas.addEventListener('mousedown', function (ev) {
					_this2.GPUSimController.handleMouseDown(getCanvasMousePos(ev));
				});
				this.screenCanvas.addEventListener('mouseup', function (ev) {
					_this2.GPUSimController.handleMouseUp();
				});
				this.screenCanvas.addEventListener('mousemove', function (ev) {
					_this2.GPUSimController.handleMouseMove(getCanvasMousePos(ev));
				});
				this.controller.startSim();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'canvas',
						{ key: 'mainCanvas', width: this.SCREEN_CANVAS_DIMS.width, height: this.SCREEN_CANVAS_DIMS.height, style: { marginTop: '10px', marginBottom: '40px' }, ref: function ref(canvas) {
								_this3.screenCanvas = canvas;
							} },
						'It\'s about time you upgrade your browser.'
					)
				);
			}
		}]);
	
		return GPUSimGUI;
	}(_react2.default.Component);
	
	;
	
	function init() {
		_reactDom2.default.render(_react2.default.createElement(GPUSimGUI, null), document.getElementById('indexContainer'));
	}
	
	module.exports = {
		init: init
	};

/***/ },
/* 1 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/*!****************************!*\
  !*** ./src/utils/Utils.js ***!
  \****************************/
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector = function () {
	    function Vector(x, y) {
	        _classCallCheck(this, Vector);
	
	        this.x = x;
	        this.y = y;
	    }
	
	    _createClass(Vector, [{
	        key: 'add',
	        value: function add(oVec) {
	            return new Vector(this.x + oVec.x, this.y + oVec.y);
	        }
	    }, {
	        key: 'subtract',
	        value: function subtract(oVec) {
	            return new Vector(this.x - oVec.x, this.y - oVec.y);
	        }
	    }, {
	        key: 'multiply',
	        value: function multiply(scale) {
	            return new Vector(this.x * scale, this.y * scale);
	        }
	    }, {
	        key: 'divide',
	        value: function divide(scale) {
	            return new Vector(this.x / scale, this.y / scale);
	        }
	    }, {
	        key: 'equals',
	        value: function equals(oVec) {
	            return this.x == oVec.x && this.y == oVec.y;
	        }
	    }, {
	        key: 'floor',
	        value: function floor() {
	            return new Vector(Math.floor(this.x), Math.floor(this.y));
	        }
	    }, {
	        key: 'dot',
	        value: function dot(oVec) {
	            return this.x * oVec.x + this.y * oVec.y;
	        }
	    }, {
	        key: 'getLength',
	        value: function getLength() {
	            return Math.sqrt(this.dot(this));
	        }
	    }, {
	        key: 'getAngle',
	        value: function getAngle() {
	            return Math.atan2(this.y, this.x);
	        }
	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            return [this.x, this.y];
	        }
	    }], [{
	        key: 'fromPolar',
	        value: function fromPolar(r, phi) {
	            return new Vector(r * Math.cos(phi), r * Math.sin(phi));
	        }
	    }]);
	
	    return Vector;
	}();
	
	;
	
	var Dimensions = function () {
	    function Dimensions(width, height) {
	        _classCallCheck(this, Dimensions);
	
	        this.width = width;
	        this.height = height;
	    }
	
	    _createClass(Dimensions, [{
	        key: 'contains',
	        value: function contains(pos) {
	            return isPointInRect(pos, new Rect(new Vector(0, 0), this));
	        }
	    }, {
	        key: 'getArea',
	        value: function getArea() {
	            return this.width * this.height;
	        }
	    }, {
	        key: 'equals',
	        value: function equals(oDims) {
	            return this.width == oDims.width && this.height == oDims.height;
	        }
	    }, {
	        key: 'toArray',
	        value: function toArray() {
	            return [this.width, this.height];
	        }
	    }]);
	
	    return Dimensions;
	}();
	
	;
	
	var Rect = function () {
	    function Rect(pos, dims) {
	        _classCallCheck(this, Rect);
	
	        this.pos = pos;
	        this.dims = dims;
	    }
	
	    _createClass(Rect, [{
	        key: 'x',
	        get: function get() {
	            return this.pos.x;
	        }
	    }, {
	        key: 'y',
	        get: function get() {
	            return this.pos.y;
	        }
	    }, {
	        key: 'width',
	        get: function get() {
	            return this.dims.width;
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this.dims.height;
	        }
	    }, {
	        key: 'left',
	        get: function get() {
	            return this.pos.x;
	        }
	    }, {
	        key: 'right',
	        get: function get() {
	            return this.pos.x + this.dims.width;
	        }
	    }, {
	        key: 'top',
	        get: function get() {
	            return this.pos.y;
	        }
	    }, {
	        key: 'bottom',
	        get: function get() {
	            return this.pos.y + this.dims.height;
	        }
	    }], [{
	        key: 'fromBounds',
	        value: function fromBounds(left, right, top, bottom) {
	            return new Rect(new Vector(left, top), new Dimensions(right - left, bottom - top));
	        }
	    }]);
	
	    return Rect;
	}();
	
	;
	
	var Array2D = function () {
	    function Array2D(dims, data) {
	        _classCallCheck(this, Array2D);
	
	        this.dims = dims;
	        this.data = data;
	    }
	
	    _createClass(Array2D, [{
	        key: 'getFlatArr',
	        value: function getFlatArr() {
	            return Utils.flatten(this.data);
	        }
	    }, {
	        key: 'width',
	        get: function get() {
	            return this.dims.width;
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this.dims.height;
	        }
	    }]);
	
	    return Array2D;
	}();
	
	;
	
	var MouseButton = function MouseButton() {
	    _classCallCheck(this, MouseButton);
	};
	
	;
	MouseButton.MOUSE_LEFT = 0;
	MouseButton.MOUSE_MIDDLE = 1;
	MouseButton.MOUSE_RIGHT = 2;
	
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: 'isPointInRect',
	        value: function isPointInRect(p, rect) {
	            return p.x >= rect.left && p.x < rect.right && p.y >= rect.top && p.y < rect.bottom;
	        }
	    }, {
	        key: 'compute1DArray',
	        value: function compute1DArray(length, func) {
	            return new Array(length).fill(undefined).map(function (unused, i) {
	                return func(i);
	            });
	        }
	    }, {
	        key: 'compute2DArray',
	        value: function compute2DArray(dims, func) {
	            return Utils.compute1DArray(dims.height, function (i) {
	                return Utils.compute1DArray(dims.width, function (i2) {
	                    return func(new Vector(i2, i));
	                });
	            });
	        }
	    }, {
	        key: 'compute2DArrayAsArray2D',
	        value: function compute2DArrayAsArray2D(dims, func) {
	            return new Array2D(dims, Utils.compute2DArray(dims, func));
	        }
	    }, {
	        key: 'flatten',
	        value: function flatten(arr) {
	            var result = [];
	            for (var i = 0; i < arr.length; i++) {
	                for (var i2 = 0; i2 < arr[i].length; i2++) {
	                    result.push(arr[i][i2]);
	                }
	            }
	            return result;
	        }
	    }, {
	        key: 'clamp',
	        value: function clamp(num, min, max) {
	            return num <= min ? min : num >= max ? max : num;
	        }
	    }, {
	        key: 'padStr',
	        value: function padStr(str, targetLen) {
	            var padChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
	
	            var res = '';
	            for (var i = 0; i < targetLen - str.length; i++) {
	                res += padChar;
	            }res += str;
	            return res;
	        }
	    }]);
	
	    return Utils;
	}();
	
	;
	Utils.DIRS4 = [new Vector(1, 0), new Vector(0, 1), new Vector(-1, 0), new Vector(0, -1)];
	
	module.exports = {
	    Vector: Vector,
	    Dimensions: Dimensions,
	    Rect: Rect,
	    Array2D: Array2D,
	    MouseButton: MouseButton,
	    Utils: Utils
	};

/***/ },
/* 4 */
/*!*********************************!*\
  !*** ./src/GPUSimController.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _FullSystemSim = __webpack_require__(/*! sim/FullSystemSim.js */ 5);
	
	var _FullSystemSim2 = _interopRequireDefault(_FullSystemSim);
	
	var _gpuTest = __webpack_require__(/*! tests/gpuTest.js */ 12);
	
	var _gpuTest2 = _interopRequireDefault(_gpuTest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FRAME_INTERVAL = 1000.0 / 60.0;
	
	var GPUSimController = function () {
		function GPUSimController(screenCtx, screenBoundingRect) {
			_classCallCheck(this, GPUSimController);
	
			this.sim = new _FullSystemSim2.default(screenCtx, screenBoundingRect);
			this.sim.loadProgram(_gpuTest2.default.map(function (str) {
				return parseInt(str, 2) & ~_Arch2.default.RAY_BIT;
			}));
			this.prevFrameTime = 0;
			this.simRunning = false;
			this.isMouseDown = false;
			this.mousePos = new Vector(0, 0);
			this.debug_cycle_countdown = 3;
		}
	
		_createClass(GPUSimController, [{
			key: 'startSim',
			value: function startSim() {
				var _this = this;
	
				this.prevFrameTime = Date.now();
				this.simRunning = true;
				requestAnimationFrame(function () {
					return _this.updateSimWrapper();
				});
			}
		}, {
			key: 'updateSim',
			value: function updateSim() {
				if (this.isMouseDown) this.sim.handleTouch(this.mousePos);
				this.sim.runCycle();
				this.debug_cycle_countdown--;
				if (this.debug_cycle_countdown == 0) this.stopSim();
			}
		}, {
			key: 'updateSimWrapper',
			value: function updateSimWrapper() {
				var _this2 = this;
	
				if (!this.simRunning) return;
				var currFrameTime = Date.now();
				var elapsed = currFrameTime - this.prevFrameTime;
				if (elapsed >= FRAME_INTERVAL) {
					this.prevFrameTime += FRAME_INTERVAL;
					this.updateSim();
				}
				requestAnimationFrame(function () {
					return _this2.updateSimWrapper();
				});
			}
		}, {
			key: 'stopSim',
			value: function stopSim() {
				this.simRunning = false;
			}
		}, {
			key: 'handleMouseDown',
			value: function handleMouseDown(mousePos) {
				this.isMouseDown = true;
				this.mousePos = mousePos;
			}
		}, {
			key: 'handleMouseUp',
			value: function handleMouseUp() {
				this.isMouseDown = false;
			}
		}, {
			key: 'handleMouseMove',
			value: function handleMouseMove(mousePos) {
				this.mousePos = mousePos;
			}
		}]);
	
		return GPUSimController;
	}();
	
	;
	
	module.exports = GPUSimController;

/***/ },
/* 5 */
/*!**********************************!*\
  !*** ./src/sim/FullSystemSim.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ScreenSim = __webpack_require__(/*! sim/ScreenSim.js */ 6);
	
	var _ScreenSim2 = _interopRequireDefault(_ScreenSim);
	
	var _GPUSim = __webpack_require__(/*! sim/GPUSim.js */ 7);
	
	var _GPUSim2 = _interopRequireDefault(_GPUSim);
	
	var _CPUSim = __webpack_require__(/*! sim/CPUSim.js */ 11);
	
	var _CPUSim2 = _interopRequireDefault(_CPUSim);
	
	var _GraphicsBufferSim = __webpack_require__(/*! sim/GraphicsBufferSim.js */ 13);
	
	var _GraphicsBufferSim2 = _interopRequireDefault(_GraphicsBufferSim);
	
	var _DebugUtils = __webpack_require__(/*! sim/DebugUtils.js */ 14);
	
	var _DebugUtils2 = _interopRequireDefault(_DebugUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FullSystemSim = function () {
		function FullSystemSim(screenCtx, screenBoundingRect) {
			_classCallCheck(this, FullSystemSim);
	
			this.screen = new _ScreenSim2.default(screenCtx, screenBoundingRect);
			this.gpu = new _GPUSim2.default();
			this.cpu = new _CPUSim2.default();
			this.graphicsBuffer = new _GraphicsBufferSim2.default();
			this.touchInputBuffer = new TouchInputBufferSim();
	
			this.gpu.attachGraphicsBuffer(this.graphicsBuffer);
			this.cpu.attachScreen(this.screen);
			this.cpu.attachGPU(this.gpu);
	
			this.screen.flush();
		}
	
		_createClass(FullSystemSim, [{
			key: 'loadProgram',
			value: function loadProgram(binary) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = binary.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    i = _step$value[0],
						    val = _step$value[1];
	
						this.cpu.memory[i] = val;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: 'runCycle',
			value: function runCycle() {
				this.cpu.runCycle();
				this.gpu.runCycle();
				this.screen.inputBuffer = this.graphicsBuffer.get();
				this.screen.runCycle();
			}
		}, {
			key: 'handleTouch',
			value: function handleTouch(mousePos) {
				this.touchInputBuffer.handleTouch(this.screen.convertMousePosToPixCoords(mousePos));
			}
		}]);
	
		return FullSystemSim;
	}();
	
	;
	
	module.exports = FullSystemSim;

/***/ },
/* 6 */
/*!******************************!*\
  !*** ./src/sim/ScreenSim.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 3);
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _InstructionFormat = __webpack_require__(/*! arch/InstructionFormat.js */ 9);
	
	var _InstructionFormat2 = _interopRequireDefault(_InstructionFormat);
	
	var _Decoder = __webpack_require__(/*! sim/Decoder.js */ 10);
	
	var _DebugUtils = __webpack_require__(/*! sim/DebugUtils.js */ 14);
	
	var _DebugUtils2 = _interopRequireDefault(_DebugUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Format = _InstructionFormat2.default;
	
	var SCREEN_COLOURS_DEFAULT = new Uint32Array([0xDDDDDD, 0xDB7D3E, 0xB350BC, 0x6B8AC9, 0xB1A627, 0x41AE38, 0xD08499, 0x404040, 0x9AA1A1, 0x2E6E89, 0x7E3DB5, 0x2E388D, 0x4F321F, 0x35461B, 0x963430, 0x191616]);
	var SCREEN_INITIAL_COLOUR_DEFAULT = 0xF;
	
	function colourToCSSString(colour) {
		return '#' + _Utils.Utils.padStr(colour.toString(16), 6);
	}
	
	var ScreenSim = function () {
		function ScreenSim(ctx, boundingRect) {
			_classCallCheck(this, ScreenSim);
	
			this.ctx = ctx;
			this.boundingRect = boundingRect;
	
			this.pixDims = new _Utils.Dimensions(this.boundingRect.width / _Arch2.default.SCREEN_WIDTH, this.boundingRect.height / _Arch2.default.SCREEN_HEIGHT);
	
			this.colours = SCREEN_COLOURS_DEFAULT;
			var initialColour = SCREEN_INITIAL_COLOUR_DEFAULT;
			this.buffer = new Uint32Array(_Arch2.default.SCREEN_HEIGHT * _Arch2.default.SCREEN_WIDTH).fill(this.colours[initialColour]);
			this.colour = initialColour;
			this.inputBuffer = new Uint32Array(_Arch2.default.SCREEN_WIDTH);
			this.instruction = 0;
		}
	
		_createClass(ScreenSim, [{
			key: 'flush',
			value: function flush() {
				for (var i = 0; i < _Arch2.default.SCREEN_HEIGHT; i++) {
					for (var i2 = 0; i2 < _Arch2.default.SCREEN_WIDTH; i2++) {
						this.ctx.fillStyle = colourToCSSString(this.buffer[i * _Arch2.default.SCREEN_WIDTH + i2]);
						this.ctx.fillRect(this.boundingRect.x + i2 * this.pixDims.width, this.boundingRect.y + i * this.pixDims.height, this.pixDims.width, this.pixDims.height);
					}
				}
			}
		}, {
			key: 'runCycle',
			value: function runCycle() {
				var instruction = this.instruction;
				var opcode = (0, _Decoder.extractField)(instruction, Format.GPU_OPCODE_OFFSET, Format.GPU_OPCODE_LENGTH);
				if (opcode != Format.SCREEN_OPCODE) return;
				var updateColour = (0, _Decoder.extractBool)(instruction, Format.SCREEN_UPDATE_COLOUR_FLAG_OFFSET);
				var colour = (0, _Decoder.extractField)(instruction, Format.SCREEN_COLOUR_OFFSET, Format.SCREEN_COLOUR_LENGTH);
				var flush = (0, _Decoder.extractBool)(instruction, Format.SCREEN_FLUSH_FLAG_OFFSET);
				if (updateColour) this.colour = colour;
				var colourVal = this.colours[this.colour];
				for (var i = 0; i < _Arch2.default.SCREEN_HEIGHT; i++) {
					for (var i2 = 0; i2 < _Arch2.default.SCREEN_WIDTH; i2++) {
						if ((this.inputBuffer[i2] >> i & 1) == 1) this.buffer[i * _Arch2.default.SCREEN_WIDTH + i2] = colourVal;
					}
				}
				if (flush) this.flush();
			}
		}, {
			key: 'convertMousePosToPixCoords',
			value: function convertMousePosToPixCoords(mousePos) {
				return new _Utils.Vector(Math.floor(mousePos.x / this.pixDims.width), Math.floor(mousePos.y / this.pixDims.height));
			}
		}]);
	
		return ScreenSim;
	}();
	
	;
	
	module.exports = ScreenSim;

/***/ },
/* 7 */
/*!***************************!*\
  !*** ./src/sim/GPUSim.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _InstructionFormat = __webpack_require__(/*! arch/InstructionFormat.js */ 9);
	
	var _InstructionFormat2 = _interopRequireDefault(_InstructionFormat);
	
	var _Decoder = __webpack_require__(/*! sim/Decoder.js */ 10);
	
	var _DebugUtils = __webpack_require__(/*! sim/DebugUtils.js */ 14);
	
	var _DebugUtils2 = _interopRequireDefault(_DebugUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Format = _InstructionFormat2.default;
	var TT_OVERWRITE = 3;
	var FILLED_COLUMN = (1 << _Arch2.default.GPU_REG_HEIGHT) - 1;
	
	var GPUSim = function () {
		function GPUSim() {
			_classCallCheck(this, GPUSim);
	
			this.regs = new Array(_Arch2.default.NUM_GPU_REG).fill(new Uint32Array(_Arch2.default.GPU_REG_WIDTH).fill(0));
			this.instruction = 0;
			this.disabled = false;
		}
	
		_createClass(GPUSim, [{
			key: 'attachGraphicsBuffer',
			value: function attachGraphicsBuffer(graphicsBuffer) {
				this.graphicsBuffer = graphicsBuffer;
			}
		}, {
			key: 'runCycle',
			value: function runCycle() {
				if (!this.disabled) {
					var instruction = this.instruction;
					var opcode = (0, _Decoder.extractField)(instruction, Format.GPU_OPCODE_OFFSET, Format.GPU_OPCODE_LENGTH);
					var reg1 = (0, _Decoder.extractField)(instruction, Format.GPU_REG1_OFFSET, Format.GPU_REG_LENGTH);
					var reg2 = (0, _Decoder.extractField)(instruction, Format.GPU_REG2_OFFSET, Format.GPU_REG_LENGTH);
					var coreshift = (0, _Decoder.extractBool)(instruction, Format.GPU_CORESHIFT_FLAG_OFFSET);
					var coreshiftDir = (0, _Decoder.extractField)(instruction, Format.GPU_CORESHIFT_DIR_OFFSET, 1) == 1 ? 1 : -1;
					if (!coreshift) coreshiftDir = 0;
					var bitshift = (0, _Decoder.extractBool)(instruction, Format.GPU_BITSHIFT_FLAG_OFFSET);
					var bitshiftDir = (0, _Decoder.extractField)(instruction, Format.GPU_BITSHIFT_DIR_OFFSEt, 1) == 1 ? 1 : -1;
					if (!bitshift) bitshiftDir = 0;
					var truthTable = opcode;
					var writeEnable = (0, _Decoder.extractBool)(instruction, Format.GPU_WRITE_ENABLE_OFFSET);
					var writeReg = (0, _Decoder.extractField)(instruction, Format.GPU_WRITE_REG_OFFSET, Format.GPU_REG_LENGTH);
					var updateGraphicsBuffer = true;
					var isScreenCommand = opcode == Format.SCREEN_OPCODE;
					if (isScreenCommand) {
						updateGraphicsBuffer = (0, _Decoder.extractBool)(instruction, Format.SCREEN_UPDATE_GRAPHICS_BUFFER_FLAG_OFFSET);
						writeEnable = false;
						truthTable = TT_OVERWRITE;
					}
	
					var reg1Val = new Uint32Array(_Arch2.default.GPU_REG_WIDTH);
					for (var i = 0; i < _Arch2.default.GPU_REG_WIDTH; i++) {
						var oi = i + coreshiftDir;
						var columnVal = oi >= 0 && oi < _Arch2.default.GPU_REG_WIDTH ? this.regs[reg1][oi] : 0;
						if (bitshiftDir == -1) columnVal <<= 1;else if (bitshiftDir == 1) columnVal >>= 1;
						reg1Val[i] = columnVal;
					}
					console.log(truthTable);
					var reg2Val = this.regs[reg2];
					var result = new Uint32Array(_Arch2.default.GPU_REG_WIDTH).fill(0);
					for (var _i = 0; _i < _Arch2.default.GPU_REG_WIDTH; _i++) {
						for (var tti = 0; tti < 4; tti++) {
							if ((0, _Decoder.extractBool)(truthTable, 4 - tti - 1)) result[_i] |= (reg1Val[_i] ^ ((0, _Decoder.extractBool)(tti, 1) ? 0 : FILLED_COLUMN)) & (reg2Val[_i] ^ ((0, _Decoder.extractBool)(tti, 0) ? 0 : FILLED_COLUMN));
						}
					}
					if (updateGraphicsBuffer) this.graphicsBuffer.set(result);
					if (writeEnable) this.regs[writeReg] = result;
				}
				this.disabled = false;
			}
		}]);
	
		return GPUSim;
	}();
	
	;
	
	module.exports = GPUSim;

/***/ },
/* 8 */
/*!**************************!*\
  !*** ./src/arch/Arch.js ***!
  \**************************/
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Arch = function Arch() {
	  _classCallCheck(this, Arch);
	};
	
	;
	
	Arch.SCREEN_WIDTH = 20;
	Arch.SCREEN_HEIGHT = 20;
	
	Arch.NUM_REG = 32;
	Arch.CPU_RAM_SIZE = 1 << 10;
	
	Arch.NUM_GPU_REG = 32;
	Arch.GPU_REG_WIDTH = 20;
	Arch.GPU_REG_HEIGHT = 20;
	
	Arch.NUM_COLOURS = 1 << 4;
	
	Arch.WORD_WIDTH = 29;
	Arch.WORD_MASK = 1 << Arch.WORD_WIDTH;
	Arch.WORD_MAX = 1 << Arch.WORD_WIDTH - 1;
	Arch.WORD_MIN = -(1 << Arch.WORD_WIDTH - 1);
	
	Arch.RAY_BIT = 0x20000000;
	
	module.exports = Arch;

/***/ },
/* 9 */
/*!***************************************!*\
  !*** ./src/arch/InstructionFormat.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InstructionFormat = function InstructionFormat() {
	  _classCallCheck(this, InstructionFormat);
	};
	
	;
	
	InstructionFormat.UPDATE_FLAGS_OFFSET = 28;
	InstructionFormat.OPCODE_OFFSET = 22;
	
	InstructionFormat.REG1_OFFSET = 18;
	InstructionFormat.IMMREG_FLAG_OFFSET = 17;
	
	InstructionFormat.IMM_OFFSET = 0;
	InstructionFormat.IMM_WIDTH = 17;
	InstructionFormat.IMM_MASK = 1 << InstructionFormat.IMM_WIDTH;
	InstructionFormat.IMM_MAX = 1 << InstructionFormat.IMM_WIDTH - 1;
	InstructionFormat.IMM_MIN = -(1 << InstructionFormat.IMM_WIDTH - 1);
	
	InstructionFormat.GPU_WRITE_REG_OFFSET = 0;
	InstructionFormat.GPU_WRITE_ENABLE_OFFSET = 5;
	InstructionFormat.GPU_REG2_OFFSET = 6;
	InstructionFormat.GPU_REG1_OFFSET = 11;
	InstructionFormat.GPU_BITSHIFT_DIR_OFFSET = 16;
	InstructionFormat.GPU_BITSHIFT_FLAG_OFFSET = 17;
	InstructionFormat.GPU_CORESHIFT_DIR_OFFSET = 18;
	InstructionFormat.GPU_CORESHIFT_FLAG_OFFSET = 19;
	InstructionFormat.GPU_REG_LENGTH = 5;
	
	InstructionFormat.GPU_OPCODE_OFFSET = 20;
	InstructionFormat.GPU_OPCODE_LENGTH = 4;
	
	InstructionFormat.SCREEN_COLOUR_OFFSET = 0;
	InstructionFormat.SCREEN_COLOUR_LENGTH = 4;
	InstructionFormat.SCREEN_FLUSH_FLAG_OFFSET = 8;
	InstructionFormat.SCREEN_UPDATE_COLOUR_FLAG_OFFSET = 9;
	InstructionFormat.SCREEN_UPDATE_GRAPHICS_BUFFER_FLAG_OFFSET = 10;
	InstructionFormat.SCREEN_OPCODE = 0;
	
	module.exports = InstructionFormat;

/***/ },
/* 10 */
/*!****************************!*\
  !*** ./src/sim/Decoder.js ***!
  \****************************/
/***/ function(module, exports) {

	"use strict";
	
	function extractField(instruction, offset, length) {
		return instruction >> offset & (1 << length) - 1;
	}
	
	function extractBool(instruction, offset) {
		return extractField(instruction, offset, 1) == 1;
	}
	
	module.exports = {
		extractField: extractField,
		extractBool: extractBool
	};

/***/ },
/* 11 */
/*!***************************!*\
  !*** ./src/sim/CPUSim.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _InstructionFormat = __webpack_require__(/*! arch/InstructionFormat.js */ 9);
	
	var _InstructionFormat2 = _interopRequireDefault(_InstructionFormat);
	
	var _Decoder = __webpack_require__(/*! sim/Decoder.js */ 10);
	
	var _DebugUtils = __webpack_require__(/*! sim/DebugUtils.js */ 14);
	
	var _DebugUtils2 = _interopRequireDefault(_DebugUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Format = _InstructionFormat2.default;
	
	var CPUSim = function () {
		function CPUSim() {
			_classCallCheck(this, CPUSim);
	
			this.memory = new Uint32Array(_Arch2.default.CPU_RAM_SIZE);
			this.programCounter = 0;
		}
	
		_createClass(CPUSim, [{
			key: 'attachScreen',
			value: function attachScreen(screen) {
				this.screen = screen;
			}
		}, {
			key: 'attachGPU',
			value: function attachGPU(gpu) {
				this.gpu = gpu;
			}
		}, {
			key: 'runCycle',
			value: function runCycle() {
				var instruction = this.memory[this.programCounter];
				_DebugUtils2.default.logWord(instruction);
				this.programCounter = (this.programCounter + 1) % _Arch2.default.CPU_RAM_SIZE;
				this.gpu.instruction = instruction;
				this.screen.instruction = instruction;
				var isGPUCommand = true;
				if (!isGPUCommand) this.gpu.disabled = true;
			}
		}]);
	
		return CPUSim;
	}();
	
	;
	
	module.exports = CPUSim;

/***/ },
/* 12 */
/*!******************************!*\
  !*** ./src/tests/gpuTest.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	
	module.exports = ["100000100100000000000000100000", "100000001110000000000001100001", "100000000000000000001100001110"];

/***/ },
/* 13 */
/*!**************************************!*\
  !*** ./src/sim/GraphicsBufferSim.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _DebugUtils = __webpack_require__(/*! sim/DebugUtils.js */ 14);
	
	var _DebugUtils2 = _interopRequireDefault(_DebugUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GraphicsBufferSim = function () {
		function GraphicsBufferSim() {
			_classCallCheck(this, GraphicsBufferSim);
	
			this.reg = new Uint32Array(_Arch2.default.GPU_REG_WIDTH);
		}
	
		_createClass(GraphicsBufferSim, [{
			key: 'set',
			value: function set(val) {
				this.reg = val;
			}
		}, {
			key: 'get',
			value: function get() {
				return this.reg;
			}
		}]);
	
		return GraphicsBufferSim;
	}();
	
	;
	
	module.exports = GraphicsBufferSim;

/***/ },
/* 14 */
/*!*******************************!*\
  !*** ./src/sim/DebugUtils.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Arch = __webpack_require__(/*! arch/Arch.js */ 8);
	
	var _Arch2 = _interopRequireDefault(_Arch);
	
	var _Utils = __webpack_require__(/*! utils/Utils.js */ 3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DebugUtils = function DebugUtils() {
		_classCallCheck(this, DebugUtils);
	};
	
	;
	
	DebugUtils.logGPUReg = function (reg) {
		var str = '';
		for (var i = 0; i < _Arch2.default.GPU_REG_HEIGHT; i++) {
			for (var i2 = 0; i2 < _Arch2.default.GPU_REG_WIDTH; i2++) {
				str += (reg[i2] >> i & 1).toString();
			}
			str += '\n';
		}
		console.log(str);
	};
	
	DebugUtils.logWord = function (word) {
		console.log(_Utils.Utils.padStr(word.toString(2), 29));
	};
	
	module.exports = DebugUtils;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
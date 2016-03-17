(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactKinetophone"] = factory(require("react"));
	else
		root["ReactKinetophone"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  ControlBar: __webpack_require__(1),
	  PlayPauseButton: __webpack_require__(3),
	  SeekBar: __webpack_require__(5),

	  TimeDisplay: __webpack_require__(6),
	  ImageOutput: __webpack_require__(7),
	  AudioOutput: __webpack_require__(10),
	  AudioClip: __webpack_require__(11),
	  TextOutput: __webpack_require__(12),

	  ChannelMixin: __webpack_require__(8),
	  EventMixin: __webpack_require__(4)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2),
	    el = React.createElement.bind(React);

	var PlayPauseButton = __webpack_require__(3),
	    SeekBar = __webpack_require__(5);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneControlBar",

	  render: function() {
	    return React.DOM.span(this.props,
	      el(PlayPauseButton, {kinetophone: this.props.kinetophone}),
	      el(SeekBar, {kinetophone: this.props.kinetophone})
	    );
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	var KinetophoneEventMixin = __webpack_require__(4);

	module.exports = React.createClass({
	  displayName: "ReactKinetophonePlayPauseButton",
	  mixins: [KinetophoneEventMixin],

	  getInitialState: function() {
	    return {
	      playing: this.props.kinetophone.playing()
	    };
	  },

	  render: function() {
	    var text = this.state.playing ? "Pause" : "Play",
	        props = React.__spread({onClick: this.togglePlaying}, this.props);
	    return React.DOM.button(props, text);
	  },

	  togglePlaying: function(e) {
	    e.preventDefault();
	    if (this.state.playing) {
	      this.pause();
	    } else {
	      this.play();
	    }
	  },

	  onKinetophonePlay: function() {
	    this.setState({playing: true});
	  },

	  onKinetophonePause: function() {
	    this.setState({playing: false});
	  },

	  onKinetophoneTimeUpdate: function(time) {
	    this.setState({currentTime: time});
	  },

	  play: function() {
	    this.props.kinetophone.play();
	  },

	  pause: function() {
	    this.props.kinetophone.pause();
	  },

	  updateTime: function(e) {
	    var time = ~~e.target.value;
	    this.props.kinetophone.currentTime(time);
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  componentDidMount: function() {
	    this._bindKinetophoneEvents(this.props.kinetophone);
	  },

	  componentWillUnmount: function() {
	    this._unbindKinetophoneEvents(this.props.kinetophone);
	  },

	  componentWillReceiveProps: function(props) {
	    if (props.kinetophone !== this.props.kinetophone) {
	      this._unbindKinetophoneEvents(this.props.kinetophone);
	      this._unbindKinetophoneEvents(props.kinetophone);
	    }
	  },

	  _bindKinetophoneEvents: function(kinetophone) {
	    this.onKinetophonePlay && kinetophone.on("play", this.onKinetophonePlay);
	    this.onKinetophonePause && kinetophone.on("pause", this.onKinetophonePause);
	    this.onKinetophoneTimeUpdate && kinetophone.on("timeupdate", this.onKinetophoneTimeUpdate);
	    this.onKinetophoneSeeking && kinetophone.on("seeking", this.onKinetophoneSeeking);
	    this.onKinetophoneSeek && kinetophone.on("seek", this.onKinetophoneSeek);
	    this.onKinetophoneEnd && kinetophone.on("end", this.onKinetophoneEnd);
	    this.onKinetophoneRateUpdate && kinetophone.on("rateupdate", this.onKinetophoneRateUpdate);
	  },

	  _unbindKinetophoneEvents: function(kinetophone) {
	    this.onKinetophonePlay && kinetophone.off("play", this.onKinetophonePlay);
	    this.onKinetophonePause && kinetophone.off("pause", this.onKinetophonePause);
	    this.onKinetophoneTimeUpdate && kinetophone.off("timeupdate", this.onKinetophoneTimeUpdate);
	    this.onKinetophoneSeeking && kinetophone.off("seeking", this.onKinetophoneSeeking);
	    this.onKinetophoneSeek && kinetophone.off("seek", this.onKinetophoneSeek);
	    this.onKinetophoneEnd && kinetophone.off("end", this.onKinetophoneEnd);
	    this.onKinetophoneRateUpdate && kinetophone.off("rateupdate", this.onKinetophoneRateUpdate);
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	var KinetophoneEventMixin = __webpack_require__(4);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneControlBar",
	  mixins: [KinetophoneEventMixin],

	  getInitialState: function() {
	    return {
	      currentTime: this.props.kinetophone.currentTime(),
	      totalDuration: this.props.kinetophone.totalDuration()
	    };
	  },

	  render: function() {
	    return React.DOM.input(React.__spread({
	      type: "range",
	      min: 0,
	      max: this.state.totalDuration,
	      value: this.state.currentTime,
	      onChange: this.updateTime
	    }, this.props));
	  },

	  onKinetophoneTimeUpdate: function(time) {
	    this.setState({currentTime: time});
	  },

	  updateTime: function(e) {
	    var time = ~~e.target.value;
	    this.props.kinetophone.currentTime(time);
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	var KinetophoneEventMixin = __webpack_require__(4);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneTimeDisplay",
	  mixins: [KinetophoneEventMixin],

	  getInitialState: function() {
	    return {
	      currentTime: this.props.kinetophone.currentTime()
	    };
	  },

	  render: function() {
	    return React.DOM.span(this.props, this.getTimeDisplay());
	  },

	  onKinetophoneTimeUpdate: function(time) {
	    this.setState({currentTime: time});
	  },

	  getTimeDisplay: function() {
	    var time = this.state.currentTime / 1000;
	    var minutes = Math.floor(time / 60),
	        seconds = "" + Math.floor(time % 60);
	    while (seconds.length < 2) seconds = "0" + seconds;
	    return minutes + ":" + seconds;
	  }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	var KinetophoneChannelMixin = __webpack_require__(8),
	    keyOrFn = __webpack_require__(9);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneImageOutput",
	  mixins: [KinetophoneChannelMixin],

	  propTypes: {
	    channel: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function() {
	    return {
	      getSrc: "src"
	    };
	  },

	  getInitialState: function() {
	    return {
	      currentSrc: null
	    };
	  },

	  render: function() {
	    return React.DOM.img(React.__spread({src: this.state.currentSrc}, this.props));
	  },

	  onKinetophoneTimingEnter: function(timing) {
	    this.setState({currentSrc: keyOrFn(this.props.getSrc, timing)});
	  }
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
	  componentDidMount: function() {
	    this._bindKinetophoneChannelEvents(this.props.kinetophone, this.props.channel);
	  },

	  componentWillUnmount: function() {
	    this._unbindKinetophoneChannelEvents(this.props.kinetophone, this.props.channel);
	  },

	  componentWillReceiveProps: function(props) {
	    if (props.kinetophone !== this.props.kinetophone || props.channel !== this.props.channel) {
	      this._unbindKinetophoneChannelEvents(this.props.kinetophone, this.props.channel);
	      this._unbindKinetophoneChannelEvents(props.kinetophone, props.channel);
	    }
	  },

	  _bindKinetophoneChannelEvents: function(kinetophone, channelName) {
	    this.onKinetophoneTimingEnter && kinetophone.on("enter:" + channelName, this.onKinetophoneTimingEnter);
	    this.onKinetophoneTimingExit && kinetophone.on("exit:" + channelName, this.onKinetophoneTimingExit);
	  },

	  _unbindKinetophoneChannelEvents: function(kinetophone, channelName) {
	    this.onKinetophoneTimingEnter && kinetophone.off("enter:" + channelName, this.onKinetophoneTimingEnter);
	    this.onKinetophoneTimingExit && kinetophone.off("exit:" + channelName, this.onKinetophoneTimingExit);
	  }
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(keyOrFn, timing) {
	  if (typeof keyOrFn === "function") {
	    return keyOrFn(timing);
	  } else {
	    return timing.data[keyOrFn];
	  }
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2),
	    el = React.createElement.bind(React);

	var AudioClip = __webpack_require__(11),
	    KinetophoneChannelMixin = __webpack_require__(8),
	    KinetophoneEventMixin = __webpack_require__(4),
	    keyOrFn = __webpack_require__(9);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneAudioOutput",
	  mixins: [KinetophoneChannelMixin, KinetophoneEventMixin],

	  propTypes: {
	    kinetophone: React.PropTypes.object.isRequired,
	    channel: React.PropTypes.string.isRequired,
	    getSrc: React.PropTypes.oneOfType([
	      React.PropTypes.string,
	      React.PropTypes.func
	    ]),
	    getKey: React.PropTypes.oneOfType([
	      React.PropTypes.string,
	      React.PropTypes.func
	    ])
	  },

	  getDefaultProps: function() {
	    return {
	      getSrc: "src",
	      getKey: "src"
	    };
	  },

	  getInitialState: function() {
	    return {
	      playing: this.props.kinetophone.playing(),
	      currentAudios: {},
	      lastSeekToggle: false,
	      currentTime: this.props.kinetophone.currentTime(),
	      playbackRate: 1
	    };
	  },

	  render: function() {
	    return React.DOM.div({},
	      Object.keys(this.state.currentAudios).map(function(key) {
	        var audio = this.state.currentAudios[key];
	        return el(AudioClip, {
	          key: keyOrFn(this.props.getKey, audio),
	          start: audio.start,
	          src: keyOrFn(this.props.getSrc, audio),
	          playing: this.state.playing,
	          lastSeek: this.state.lastSeekToggle,
	          currentTime: this.state.currentTime,
	          playbackRate: this.state.playbackRate
	        });
	      }.bind(this))
	    );
	  },

	  onKinetophoneTimingEnter: function(timing) {
	    var key = keyOrFn(this.props.getKey, timing);
	    this.state.currentAudios[key] = timing;
	    this.setState({currentAudios: this.state.currentAudios});
	  },

	  onKinetophoneTimingExit: function(timing) {
	    var key = keyOrFn(this.props.getKey, timing);
	    delete this.state.currentAudios[key];
	    this.setState({currentAudios: this.state.currentAudios});
	  },

	  onKinetophonePlay: function() {
	    this.setState({playing: true});
	  },

	  onKinetophonePause: function() {
	    this.setState({playing: false});
	  },

	  onKinetophoneSeek: function(time) {
	    this.setState({lastSeekToggle: !this.state.lastSeekToggle});
	  },

	  onKinetophoneTimeUpdate: function(time) {
	    this.setState({currentTime: time});
	  },

	  onKinetophoneRateUpdate: function(rate) {
	    this.setState({playbackRate: rate});
	  }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneAudioClip",

	  componentDidMount: function() {
	    this.audio = new Audio();
	    this.audio.src = this.props.src;

	    var start = this.props.start,
	        offset = this.props.currentTime - start;
	    this.audio.currentTime = offset / 1000;

	    if (this.props.playing) {
	      this.audio.play();
	    }
	  },

	  componentWillUnmount: function() {
	    this.audio.pause();
	    this.audio = null;
	  },

	  componentWillReceiveProps: function(props) {
	    if (this.props.playing !== props.playing) {
	      this.audio[props.playing ? "play" : "pause"]();
	    }
	    this.audio.playbackRate = this.props.playbackRate;

	    if (this.props.lastSeek !== props.lastSeek) {
	      var start = props.start,
	          offset = props.currentTime - start;
	      this.audio.currentTime = offset / 1000;
	    }
	  },

	  render: function() {
	    return null;
	  }
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2),
	    el = React.createElement.bind(React);

	var KinetophoneChannelMixin = __webpack_require__(8),
	    keyOrFn = __webpack_require__(9);

	module.exports = React.createClass({
	  displayName: "ReactKinetophoneTextOutput",
	  mixins: [KinetophoneChannelMixin],

	  propTypes: {
	    channel: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function() {
	    return {
	      getText: "text",
	      wrapper: "p"
	    }
	  },

	  getInitialState: function() {
	    return {
	      currentText: ""
	    };
	  },

	  render: function() {
	    return el(this.props.wrapper, {}, this.state.currentText);
	  },

	  onKinetophoneTimingEnter: function(timing) {
	    this.setState({currentText: keyOrFn(this.props.getText, timing)});
	  }
	});


/***/ }
/******/ ])
});
;
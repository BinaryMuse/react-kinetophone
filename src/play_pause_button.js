var React = require("react");

var KinetophoneEventMixin = require("./kinetophone_event_mixin");

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

  togglePlaying: function() {
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

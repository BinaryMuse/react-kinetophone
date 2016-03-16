var React = require("react");

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

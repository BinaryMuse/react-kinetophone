var React = require("react"),
    el = React.createElement.bind(React);

var AudioClip = require("./audio_clip"),
    KinetophoneChannelMixin = require("./kinetophone_channel_mixin"),
    KinetophoneEventMixin = require("./kinetophone_event_mixin"),
    keyOrFn = require("./key_or_fn");

module.exports = React.createClass({
  displayName: "ReactKinetophoneImageOutput",
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
      currentTime: this.props.kinetophone.currentTime()
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
          currentTime: this.state.currentTime
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
  }
});

var React = require("react");

var KinetophoneChannelMixin = require("./kinetophone_channel_mixin"),
    keyOrFn = require("./key_or_fn");

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

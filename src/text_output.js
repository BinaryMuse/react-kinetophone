var React = require("react"),
    el = React.createElement.bind(React);

var KinetophoneChannelMixin = require("./kinetophone_channel_mixin"),
    keyOrFn = require("./key_or_fn");

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

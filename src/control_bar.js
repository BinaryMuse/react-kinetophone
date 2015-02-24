var React = require("react"),
    el = React.createElement.bind(React);

var PlayPauseButton = require("./play_pause_button"),
    SeekBar = require("./seek_bar");

module.exports = React.createClass({
  displayName: "ReactKinetophoneControlBar",

  render: function() {
    return React.DOM.span(this.props,
      el(PlayPauseButton, {kinetophone: this.props.kinetophone}),
      el(SeekBar, {kinetophone: this.props.kinetophone})
    );
  }
});

var React = require("react");

var KinetophoneEventMixin = require("./kinetophone_event_mixin");

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

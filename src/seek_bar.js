var React = require("react");

var KinetophoneEventMixin = require("./kinetophone_event_mixin");

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

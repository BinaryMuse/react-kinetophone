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

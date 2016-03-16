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

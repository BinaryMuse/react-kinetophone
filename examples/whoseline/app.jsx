var FRAME_TIME = 33,
    SKIP_FRAMES = 2;

var imageSets = [
  { name: "ski", count: 176 },
  { name: "helicoptor", count: 153 },
  { name: "jetpack", count: 123 },
  { name: "horse", count: 105 },
  { name: "tail", count: 81 }
];

// Each image set starts when the last one ended.
imageSets.forEach(function(imageset, index) {
  if (index === 0) {
    imageset.start = 0;
  } else {
    imageset.start = imageSets[index - 1].start + imageSets[index - 1].count * FRAME_TIME;
  }
});

// The total duration of the Kinetophone's playback is the
// sum of each of the image set's playback.
var totalDuration = imageSets.reduce(function(acc, imageset) {
  return acc + imageset.count * FRAME_TIME;
}, 0);

// For the frames channel, we'll build an array of frame timings for
// each image set, then combine them into one big array at the end.
// We'll also cut out every other frame to make the demo run a bit
// better.
var framesChannel = {
  name: "frame",
  timings: imageSets.map(function(imageset) {
    return range(1, imageset.count).map(function(frame, frameIdx) {
      var img = "" + frame;
      while (img.length < 3) img = "0" + img;
      var src = "media/" + imageset.name + "/ffout" + img + ".jpg";

      return {
        start: imageset.start + frameIdx * FRAME_TIME,
        duration: FRAME_TIME * SKIP_FRAMES,
        data: { index: frameIdx, src: src }
      };
    });
  }).reduce(function(acc, curr) {
    return acc.concat(curr);
  }, []).filter(function(frame) {
    return frame.data.index % SKIP_FRAMES === 0;
  })
};

// We have one audio clip per image set; each starts when the
// image set starts, and lasts for the duration of the image set.
var audioChannel = {
  name: "audio",
  timings: imageSets.map(function(imageset, index) {
    // Rather than returning the source of the audio file to load
    // when the event starts, we'll create the audio file here so
    // it's already started loading by the time we want to play it.
    var audio = new Audio();
    audio.src = "media/" + imageset.name + "-audio.mp3";
    audio.preload = "auto";
    return {
      start: imageset.start,
      duration: imageset.count * FRAME_TIME,
      data: {
        src: "media/" + imageset.name + "-audio.mp3"
      }
    };
  })
};

var channels = [framesChannel, audioChannel];
kinetophone = new Kinetophone(channels, totalDuration, {tickImmediately: true});

var ControlBar = ReactKinetophone.ControlBar,
    PlayPauseButton = ReactKinetophone.PlayPauseButton,
    SeekBar = ReactKinetophone.SeekBar,
    TimeDisplay = ReactKinetophone.TimeDisplay,
    ImageOutput = ReactKinetophone.ImageOutput,
    AudioOutput = ReactKinetophone.AudioOutput,
    TextOutput = ReactKinetophone.TextOutput,
    EventMixin = ReactKinetophone.EventMixin;

var JsonTimingOutput = React.createClass({
  mixins: [EventMixin],

  getInitialState() {
    return {
      timings: []
    };
  },

  render() {
    return <pre>{JSON.stringify(this.state.timings, null, "  ")}</pre>;
  },

  onKinetophoneTimeUpdate(time) {
    this.setState({timings: this.props.kinetophone.getTimingsAt(time)});
  }
});

var Application = React.createClass({
  render() {
    return (
      <div>
        <PlayPauseButton className="pure-button pure-button-primary"
          style={{width: 75}}
          kinetophone={kinetophone} />
        <SeekBar style={{width: 425, margin: "0 10px"}} kinetophone={kinetophone} />
        <TimeDisplay kinetophone={kinetophone} />
        <div>
          <div style={{padding: "10px 0"}}>
            <ImageOutput kinetophone={kinetophone} channel="frame" />
          </div>
          <div>
            <select defaultValue={1} onChange={this.onChangeRate}>
              <option value={0.5}>50%</option>
              <option value={1}>100%</option>
              <option value={1.5}>150%</option>
              <option value={2}>200%</option>
            </select>
          </div>
          <AudioOutput kinetophone={kinetophone} channel="audio" />
        </div>
        <JsonTimingOutput kinetophone={kinetophone} />
      </div>
    );
  },

  getAudio: function(timing) {
    return timing.data.audio;
  },

  onChangeRate: function(evt) {
    var newRate = parseFloat(evt.target.value);
    kinetophone.playbackRate(newRate);
  }
});

React.render(
  <Application />,
  document.getElementById("app")
);

kinetophone.on("end", function() {
  kinetophone.play();
});

function range(startInclusive, endInclusive) {
  var result = [];
  for (var i = startInclusive; i <= endInclusive; i++) {
    result.push(i);
  }
  return result;
}

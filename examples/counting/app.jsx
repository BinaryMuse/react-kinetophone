var totalDuration = 7627;

var audioChannel = {
  name: "audio",
  timings: [
    { start: 0,    duration: 2000, data: { src: "media/counting-01.mp3" } },
    { start: 2000, duration: 2000, data: { src: "media/counting-02.mp3" } },
    { start: 4000, duration: 2000, data: { src: "media/counting-03.mp3" } },
    { start: 6000, duration: 1627, data: { src: "media/counting-04.mp3" } }
  ]
};

var numberTimings = [ 0, 829, 1652, 2330, 3049, 3792, 4828, 5561, 6131, 6889 ];
var numberWords = [ "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten" ];

var numberChannel = {
  name: "numbers",
  timings: numberTimings.map(function(start, index) {
    var text = numberWords[index],
        src = "" + (index + 1) + ".png";
    if (index < 9) src = "0" + src;
    src = "media/" + src;

    if (index === 9) {
      return { start: start, end: totalDuration + 1, data: { src: src, txt: text } };
    } else {
      return { start: start, end: numberTimings[index + 1], data: { src: src, txt: text } }
    }
  })
};

var kinetophone = new Kinetophone([numberChannel, audioChannel], totalDuration, {tickImmediately: true});

var ControlBar = ReactKinetophone.ControlBar,
    TimeDisplay = ReactKinetophone.TimeDisplay,
    ImageOutput = ReactKinetophone.ImageOutput,
    AudioOutput = ReactKinetophone.AudioOutput,
    TextOutput = ReactKinetophone.TextOutput;

var Application = React.createClass({
  render() {
    return (
      <div>
        <ControlBar kinetophone={kinetophone} />
        <TimeDisplay kinetophone={kinetophone} />
        <div>
          <ImageOutput kinetophone={kinetophone} channel="numbers" />
          <AudioOutput kinetophone={kinetophone} channel="audio" />
          <TextOutput kinetophone={kinetophone} channel="numbers" wrapper="div" getText="txt" />
        </div>
      </div>
    );
  },

  getText: function(timing) {
    console.log(timing);
    return timing.data.txt;
  }
});

React.render(
  <Application />,
  document.getElementById("app")
);

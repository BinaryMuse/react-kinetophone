React Kinetophone
=================

React Kinetophone is a React-based UI for [Kinetophone](https://github.com/BinaryMuse/kinetophone) instances that contain audio and images.

Installation
------------

React Kinetophone is available on npm:

    npm install [--save] react-kinetophone

You can then require it as normal:

    var ReactKinetophone = require("react-kinetophone");

React Kinetophone also works with browser module bundlers like Browserify and webpack.

React Kinetophone requires React and Kinetophone to be installed separately.

Example
-------

React Kinetophone works with Kinetophone channels that contain audio clips or images.

Audio timings must contain the following data in the timing's `data` key:

```javascript
{
  src: "/path/to/audio/file.mp3"
}
```

Image timings must contain the following data in the timing's `data` key:

```javascript
{
  src: "/path/to/image.jpg"
}
```

Here's a simple end-to-end example.

```javascript
// Create our simple Kinetophone
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var imageChannel = {
  name: "images",
  timings: numbers.map(function(number, index) {
    return {
      start: 1000 * index,
      duration: 1000,
      data: {
        src: "/media/image" + number + ".png"
      }
    };
  })
};

var audioChannel = {
  name: "audio",
  timings: numbers.map(function(number, index) {
    return {
      start: 1000 * index,
      duration: 1000,
      data: {
        src: "/media/audio" + number + ".mp3"
      }
    };
  })
};

var kinetophone = new Kinetophone([imageChannel, audioChannel], 10000);

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <ReactKinetophone.ControlBar kinetophone={this.props.kinetophone} />
          <ReactKinetophone.TimeDisplay kinetophone={this.props.kinetophone} />
        </div>
        <ReactKinetophone.ImageOutput kinetophone={this.props.kinetophone} channel="images"
                                      className="images-channel" />
        <ReactKinetophone.AudioOutput kinetophone={this.props.kinetophone} channel="audio" />
      </div>
    );
  }
});

React.render(<App kinetophone={kinetophone} />, document.getElementById("app"));
```

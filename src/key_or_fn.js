module.exports = function(keyOrFn, timing) {
  if (typeof keyOrFn === "function") {
    return keyOrFn(timing);
  } else {
    return timing.data[keyOrFn];
  }
};

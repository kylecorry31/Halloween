function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function toRange(value, oldMin, oldMax, min, max) {
  return normalize(value, oldMin, oldMax) * (max - min) + min;
}

function wrap(value, min, max) {
  if (value > max) {
    return min;
  } else if (value < min) {
    return max;
  }
  return value;
}

var ValueRange = function(min, max) {
  this.min = min;
  this.max = max;
};

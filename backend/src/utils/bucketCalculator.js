const calculateBucket = (timestamp = Date.now()) => {
  return Math.floor(timestamp / 604800000);
};

module.exports = {
  calculateBucket
};

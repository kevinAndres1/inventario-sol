/* este es el sleep de pausa */
const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = sleep;

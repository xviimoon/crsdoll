module.exports = {
  uniqueID: function() {
    return String(Date.now()).substr(-5) + String(Math.random()).substr(-7);
  }
}

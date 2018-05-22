var birds = require('../database/birds');

exports.getBirds = function(req, res) {
  res.send(birds);
  res.end();
}
var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  visits: Number,
  link: String,
  title: String,
  code: String,
  baseUrl: String,
  url: String
});

var Link = mongoose.model('Link', linkSchema);

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

Link.prototype.createShort = function() {
  var code = createSha(this.url);
  this.code = code;
};

module.exports = Link;
// encode-stream.js

exports.createEncodeStream = EncodeStream;

var util = require("util");
var Transform = require("stream").Transform;
var EncodeBuffer = require("./encode-buffer").EncodeBuffer;
var encode = require("./write-core").encode;

util.inherits(EncodeStream, Transform);

var DEFAULT_OPTIONS = {objectMode: true};

function EncodeStream(options) {
  if (!(this instanceof EncodeStream)) return new EncodeStream(options);
  if (options) {
    options.objectMode = true;
  } else {
    options = DEFAULT_OPTIONS;
  }
  Transform.call(this, options);

  var stream = this;
  var encoder = this.encoder = new EncodeBuffer(options);
  // encoder.push = function(chunk) {
  //   stream.push(chunk);
  // };
}

EncodeStream.prototype._transform = function(chunk, encoding, callback) {
  encode(this.encoder, chunk);
  callback(null, this.encoder.read());
};

// EncodeStream.prototype._flush = function(callback) {
//   this.encoder.flush();
//   if (callback) callback();
// };
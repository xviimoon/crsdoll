const WebSocket = require('ws');
const {
  gzipFync: gzip,
  gunzipSync: gunzip
} = require('zlib');
class Iws extends WebSocket {
  constructor() {
    super('wss://m.iirose.com:443');
    this.binaryType = 'arraybuffer';
    this._send = this.send;
    this.send = e => {
      if ((e = Buffer.from(e)).length > 256) e = Buffer.concat([Buffer.from([1]), gzip(e)]);
      this._send(e);
    };
    this.onmessage = e => {
      if ((e = Buffer.from(e.data)).readUInt8(0) === 1) e = gunzip(e.slice(1));
      e = e.toString('utf8');
      this.emit('msg', e);
      if (typeof(this.onmsg) == 'function') this.onmsg(e);
    };
  };
}
module.exports = Iws;

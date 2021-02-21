const Iws = require('./socket.js');
const msgproc = require('./msgproc.js');
const tools = require('./tools.js');
const EventEmitter = require('events');

class Doll {
  exts = [];
  constructor(arg) {
    this.login = {
      "r": arg.roomID,
      "n": arg.name,
      "p": arg.pwd,
      "st": arg.status,
      "mo": arg.motto,
      "mu": undefined
    };
    this.color = arg.color || "ffffff";
    this.isopen = arg.isopen || false;
    if (this.isopen === true) this.open();
  };
  open() {
    if (this.socket) {
      if (this.socket.readyState === this.socket.CLOSED) delete this.socket;
      else {
        return 0;
      }
    }
    this.socket = new Iws();
    this.socket.onopen = () => {
      this.socket.send('*' + JSON.stringify(this.login));
      this.emit('open');
    };
    this.socket.onclose = () => {
      if (this.isopen === true) this.open();
    };
    this.socket.once('msg', e => {
      //console.log(e);
      if(e=='%*"1'){
        //用户名错误
        this.isopen=false;
        this.close();
      }
    })
    this.socket.on('msg', e=>msgproc(e,this));
    return 1;
  };
  close() {
    if (this.socket) {
      if (this.socket.readyState !== this.socket.CLOSED) this.socket.terminate();
      delete this.socket;
    }
  };
  say = (m, g, st) => {
    const i = tools.uniqueID();
    this.socket.send(JSON.stringify({
      'g': g,
      'm': m,
      'mc': this.color,
      'st': (st == true || st == 'true') ? '@' : undefined,
      'i': i,
    }));
    return i;
  };
  emit=(e, ...c)=> {
    this.exts.forEach(i => i.emit(e, ...c));
  };
  addExt(e) {
    //运行扩展
    let ext = new EventEmitter();
    ext.name = this.login.n;
    ext.roomID = this.login.r;
    ext.extID = e.ID;
    ext.say = this.say;
    ext.on('open', e.entry);
    this.exts.push(ext);
  }
}

module.exports = Doll;

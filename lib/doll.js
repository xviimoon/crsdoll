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
    this.master = arg.master || [];
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
      if (e == '%*"1') {
        //用户名错误
        this.isopen = false;
        this.close();
      }
    })
    this.socket.on('msg', e => msgproc(e, this));
    return 1;
  };
  close() {
    if (this.socket) {
      if (this.socket.readyState !== this.socket.CLOSED) this.socket.terminate();
      delete this.socket;
    }
  };
  fx = {
    'say': (m, g, st) => {
      if (!m) return 0;
      const i = tools.uniqueID();
      this.socket.send(JSON.stringify({
        'g': g,
        'm': m,
        'mc': this.color,
        'st': (st == true || st == 'true') ? '@' : undefined,
        'i': i,
      }));
      return i;
    },
    'like': (id, m) => {
      if (id) this.socket.send('+*' + (m ? id + ' ' + m : id));
    },
    'pay': (g, c, m) => {
      if (g && c) this.socket.send('+$' + JSON.stringify({
        "g": g,
        "c": m,
        "m": s
      }));
    },
    'biu': (t) => {
      if (t) this.socket.send('~' + JSON.stringify({
        "t": t,
        "c": this.color
      }));
    }
  };
  emit = (e, ...c) => {
    this.exts.forEach(i => i.emit(e, ...c));
  };
  addExt(e) {
    //运行扩展
    let ext = new EventEmitter();
    ext.name = this.login.n;
    ext.roomID = this.login.r;
    ext.extID = e.ID;
    for (let i in this.fx) ext[i] = this.fx[i];
    ext.on('open', e.entry);
    this.exts.push(ext);
  }
}

module.exports = Doll;

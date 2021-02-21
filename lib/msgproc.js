const html = require('./entities.js');
module.exports = function(e,doll) {
  switch (e[0]) {
    case '%':
      doll.socket.send('');
      break;
    case '+':
      break;
    case '-':
      break;
    case '=':
      break;
    case '$':
      break;
    case '&':
      break;
    case '?':
      break;
    case '~':
      break;
    case '^':
      break;
    case ':':
      break;
    case '.':
      break;
    case ',':
      break;
    case ';':
      break;
    case '_':
      break;
    case '|':
      break;
    case '`':
      break;
    case '@':
      switch (e[1]) {
        case '*':
          //信箱
          e = e.substr(2).split('>');
          console.log(e);
          if (e.length == 7) {
            if (e[3][0] == "'") switch (e[3][1]) {
              case "'":
                this.emit('')
                break;
            }
          } else {}
          break;
      }
      break;
    case '#':
      break;
    case '*':
      break;
    case '>':
      break;
    case ']':
      break;
    case 's':
      break;
    case ')':
      break;
    case 't':
      break;
    case 'w':
      break;
    case 'u':
      break;
    case 'm':
      break;
    case 'h':
      break;
    case 'z':
      break;
    case 'c':
      break;
    case 'v':
      break;
    case 'p':
      break;
    case 'a':
      break;
    case 'q':
      break;
    case 'i':
      break;
    case 'g':
      break;
    case 'o':
      break;
    case 'r':
      break;
    default:
      //聊天消息
      e = e.split('"');
      if (e[0]) {
        e[0] = e[0].split('<').reverse();
        for (let i of e[0]) pubmsg(i.split('>'));
      }
      if (e[1]) {

      }
      //e[0] && msg_get(e[0]);
      //e[1] && msg_pri(e[1].split('>'));
  }

  function pubmsg(e) {
    let m = {};
    if (e[3][0] == "'") {
      let u = e[3].substr(1);
      switch (u[0]) {
        case '0':
          m.type = 'STAT';
          break;
        case '1':
          m.type = 'JOIN';
          break;
        case '2':
          m.type = 'MOVE';
          break;
        case '3':
          m.type = 'LEFT';
          break;
        case '5':
          //撤回
          break;
        default:
          //AI
      }
    }
    for (let i of e) i = html.decode(i);
    m.time = e[0]*1e3;
    m.avatar = e[1];
    m.name = e[2];
    m.text = e[3];
    m.color = e[4];
    m.ncolor = e[5];
    m.sex = e[6];
    m.icon = e[7];
    m.ID = e[8];
    m.title = e[9];
    m.i = e[10];
    doll.emit('pubmsg', m);
  }
}

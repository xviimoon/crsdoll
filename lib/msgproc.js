const html = require('./entities.js');
module.exports = function(e) {
  switch (e[0]) {
    case '%':
      this.send('');
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
        for (let i of e[0]) {
          i = i.split('>');
          if (i[3][0] == "'") {
            i[3] = i[3].substr(1);
            switch (i[3][0]) {
              case '0':
                break;
              case '1':
                break;
              case '2':
                break;
              case '3':
                break;
              case '5':
                break;
              default:
            }

          }
          i = i.map(r => {
            return html.decode(r)
          });

          console.log(i);
          //this.emit('pubmsg', e[0][i])
        }
      }
      if (e[1]) {

      }
      //e[0] && msg_get(e[0]);
      //e[1] && msg_pri(e[1].split('>'));
  }
}

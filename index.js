const process = require('process');
process.on('uncaughtException', e => {
  switch (e.code) {
    case 'EADDRINUSE':
      if (process.env.NODE_ENV != 'test') process.exit();
      console.log('错误：端口占用！');
      break;
    default:
      console.log('在全局捕获异常！');
      console.log(e);
  }
});


const extList = require('./lib/extlist.js');
const Doll = require('./lib/doll.js');
const fs = require('fs');

try{
  let test = fs.readFileSync('./test.js','utf8');
  eval(test);
}catch(e){
  //TODO handle the exception
}

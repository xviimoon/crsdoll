let path = require('path');
let fs = require('fs');
let env = {
  'req': function(pn) {
    const forbade = ['process'];
    if (forbade.indexOf(pn) !== -1) {
      let err = new Error('The module "' + pn + '" has been forbade!');
      err.code = 'MODFORBADE';
      throw err;
    } else {
      return require(pn);
    }
  },
  'load': function(s, __filename, __dirname) {
    let require = env.req;
    let module = {};
    let global, process, _, fn = path = fs = env = undefined;
    eval('delete s;'+s);
    return module.exports;
  }
};

module.exports = function(__filename) {
  env.dirname = path.dirname(__filename);
  let s = fs.readFileSync(__filename, 'utf8');
  let require = env.req;
  let __dirname = env.dirname;
  if ('namespace' || 1) {
    let global, process, module, _, fn = path = fs = env = undefined;
    return eval('delete s,function(){let doll = this\r\n' + s + '\r\n}');
  }
}

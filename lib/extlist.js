const fs = require('fs');
const path = require('path');
const process = require('process');
let extList = [];

let extd = fs.readdirSync('./ext', {
  'withFileTypes': true
});
for (let dir of extd) {
  if (dir.isDirectory()) {
    let pn = path.join(process.cwd(), 'ext', dir.name);
    try {
      let ce = require(path.join(pn, 'ext.json'));
      try {
        ce.entry = require('./extloader.js')(path.join(pn, ce.main));
      } catch (err) {
        ce.error = err;
      }
      extList.push(ce);
    } catch (err) {
      continue;
    }
  }
}
module.exports = extList;
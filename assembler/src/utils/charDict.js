const fs = require('fs');

const charDict = JSON.parse(fs.readFileSync('charDict.json', 'utf8'));

module.exports = charDict;

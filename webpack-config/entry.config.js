var path = require('path');
var dirVars = require('./base/dir-vars.config.js');
var pageArr = require('./base/page-entries.config.js'); // 一个数组，形如['index/index', 'index/login', 'alert/index']
var configEntry = {};

pageArr.forEach((page) => {
  configEntry[page] = path.resolve(dirVars.pagesDir, page + '/page');
});

module.exports = configEntry;

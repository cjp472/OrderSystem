/**
 * 开发模式下热部署
 */
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}

// 添加全局的别名
// 有点坑爹的是不能import解构
const path = require('path');
const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  // '@db'  : __dirname + '/db/mongodb',
  '@utils': path.join(__dirname, '../server/utils'),
  '@logs': path.join(__dirname, '../logs')
  // '@controllers': __dirname + '/controllers',
});

require('../server.babel');
require('../server');

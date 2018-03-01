import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (!config.isProduction) {
    return 'http://172.31.1.161:3000/api' + adjustedPath;
    // return 'http://localhost:3005' + adjustedPath;
  }
  return adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, head, form } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (form) {
          request.type('form');
        }

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (head) { // 设置头部
          Object.keys(head).map(key => {
            const value = head[key];
            request.set(key, value);
          });
        }

        if (form) {
          request.send(form);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res = {}) => {
          let { body } = res;
          try {
            body = JSON.parse(res.text);
          } catch (error) {
            console.log('解析老协议错误！');
          }
          // 继续处理
          return err ? reject(body || err) : resolve(body);
        });
      }));
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}

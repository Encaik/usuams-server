/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578792997450_5942';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      client: {
        // host
        host: 'localhost',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '123456',
        // database
        database: 'usuams',
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [ '*' ],
    },
    cors: {
      origin: 'http://localhost:8080',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

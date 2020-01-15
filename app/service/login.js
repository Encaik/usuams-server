'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async index(body) {
    const result = await this.app.mysql.select(
      'user_table',
      {
        columns: 'password',
        where: {
          username: body.username,
        },
      }
    );
    if (body.password !== result[0].password) {
      return '用户名或密码不正确';
    }
    return '登陆成功';
  }
}

module.exports = UserService;

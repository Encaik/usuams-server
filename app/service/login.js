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
    console.log(body.password, result);
    if (body.password === result[0].password) {
      return '登陆成功';
    }
    return '登陆失败';
  }
}

module.exports = UserService;

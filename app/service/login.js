'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async index(body) {
    if (!body.username) {
      return { code: 1001, msg: '请输入用户名' };
    }
    if (!body.password) {
      return { code: 1002, msg: '请输入密码' };
    }
    await this.app.mysql.update('time_table',
      { timestamp: Math.round(new Date() / 1000) },
      {
        where: {
          id: '1',
        },
      }
    );
    const sql = `
    SELECT user_table.department as depa,user_table.id as uid,user_table.password,user_type.id
    FROM user_table
    JOIN user_type
    ON user_table.user_type = user_type.id
    WHERE username = "${body.username}"`;
    const result = await this.app.mysql.query(sql);

    // token签名 有效期为1小时
    console.log(result);
    if (!result || result.length === 0 || body.password !== result[0].password) {
      return { code: 1000, msg: '用户名或密码不正确' };
    }
    const token = await this.app.jwt.sign(
      { username: this.ctx.request.body.username,
        type: result[0].type },
      this.app.config.jwt.secret,
      { expiresIn: '1h' }
    );
    return {
      code: 0,
      msg: '登陆成功',
      uid: result[0].uid,
      type: result[0].id,
      depa: result[0].depa,
      Authorization: token,
    };
  }

  async exit() {
    return { code: 0, msg: '退出成功' };
  }
}

module.exports = UserService;

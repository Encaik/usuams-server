'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = this.app.mysql.select('user_table');
  }
}

module.exports = LoginController;

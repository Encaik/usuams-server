'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const result = await this.ctx.service.login.index(this.ctx.request.body);
    console.log('index', result);
    this.ctx.body = {
      code: 0,
      msg: 'success',
      data: result,
    };
  }
}

module.exports = LoginController;

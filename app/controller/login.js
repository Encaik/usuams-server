'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const result = await this.ctx.service.login.index(this.ctx.request.body);

    console.log('index', result);
    this.ctx.body = result;
  }

  async exit() {
    const result = await this.ctx.service.login.exit();
    this.ctx.body = result;
  }
}

module.exports = LoginController;

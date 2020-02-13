'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.ctx.service.home.index();
    this.ctx.body = result;
  }
}

module.exports = HomeController;

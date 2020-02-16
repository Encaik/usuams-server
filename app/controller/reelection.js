'use strict';

const Controller = require('egg').Controller;

class ReelectionController extends Controller {
  async stay() {
    const result = await this.ctx.service.reelection.stay(this.ctx.params);
    this.ctx.body = result;
  }

  async leave() {
    const result = await this.ctx.service.reelection.leave(this.ctx.params);
    this.ctx.body = result;
  }
}

module.exports = ReelectionController;

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

  async agree() {
    const result = await this.ctx.service.reelection.agree(this.ctx.params, this.ctx.request.body);
    this.ctx.body = result;
  }

  async refuse() {
    const result = await this.ctx.service.reelection.refuse(this.ctx.params);
    this.ctx.body = result;
  }
}

module.exports = ReelectionController;

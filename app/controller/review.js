'use strict';

const Controller = require('egg').Controller;

class ReviewController extends Controller {
  async review() {
    const result = await this.ctx.service.review.review(this.ctx.params);
    this.ctx.body = result;
  }
}

module.exports = ReviewController;

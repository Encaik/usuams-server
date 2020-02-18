'use strict';

const Service = require('egg').Service;

class ReviewService extends Service {
  async review(params) {
    console.log(params);
    const result = await this.app.mysql.update(
      'affair_table',
      {
        state: '已审核',
      },
      {
        where: {
          id: params.id,
        },
      }
    );
    return {
      code: 0,
      msg: 'success',
      data: result,
    };
  }
}

module.exports = ReviewService;

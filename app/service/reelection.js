'use strict';

const Service = require('egg').Service;

class ReelectionService extends Service {
  async stay(params) {
    console.log(params);
    const result = await this.app.mysql.select('user_table');
    return {
      code: 0,
      msg: 'success',
      data: result,
    };
  }

  async leave(params) {
    const result = await this.app.mysql.update(
      'user_table',
      {
        user_type: 7,
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

module.exports = ReelectionService;

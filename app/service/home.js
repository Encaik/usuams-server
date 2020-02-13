'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    const result = await this.app.mysql.select('user_table');
    return {
      code: 0,
      msg: 'success',
      data: result,
    };
  }
}

module.exports = HomeService;

'use strict';

const Service = require('egg').Service;

class AffairService extends Service {

  // 查询全部数据
  async index() {
    const result = await this.app.mysql.select('affair_table');
    return result;
  }

  // 按id查询数据
  async show(params) {
    const result = await this.app.mysql.select('affair_table', { id: params.id });
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'affair_table',
      {
        name: body.name,
        number: body.number,
      }
    );
    return result;
  }

  async update(params, body) {
    const result = await this.app.mysql.update(
      'affair_table',
      {
        name: body.name,
        number: body.number,
      },
      {
        where: {
          id: params.id,
        },
      }
    );
    return result;
  }

  // 按id删除数据
  async destroy(params) {
    const result = await this.app.mysql.delete(
      'affair_table',
      {
        id: params.id,
      }
    );
    return result;
  }

}

module.exports = AffairService;
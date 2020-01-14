'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 查询全部数据
  async index() {
    const result = await this.app.mysql.select('user_table');
    return result;
  }

  // 按id查询数据
  async show(params) {
    const result = await this.app.mysql.select('user_table', { id: params.id });
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'user',
      {
        name: body.name,
        number: body.number,
      }
    );
    return result;
  }

  async update(params, body) {
    const result = await this.app.mysql.update(
      'user',
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
      'user',
      {
        id: params.id,
      }
    );
    return result;
  }

}

module.exports = UserService;

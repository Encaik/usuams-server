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
    const result = await this.app.mysql.select(
      'user_table',
      {
        id: params.id,
      }
    );
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'user_table',
      {
        name: body.name,
        number: body.number,
        username: body.username,
        password: body.password,
        sex: body.sex,
        collage: body.collage,
        major: body.major,
        grade: body.grade,
        class: body.class,
        user_type: body.user_type,
        department: body.department,
        join_date: body.join_date,
        exit_date: null,
      }
    );
    return result;
  }

  async update(params, body) {
    const result = await this.app.mysql.update(
      'user_table',
      {
        name: body.name,
        number: body.number,
        username: body.username,
        password: body.password,
        sex: body.sex,
        collage: body.collage,
        major: body.major,
        grade: body.grade,
        class: body.class,
        user_type: body.user_type,
        department: body.department,
        join_date: body.join_date,
        exit_date: null,
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
      'user_table',
      {
        id: params.id,
      }
    );
    return result;
  }

}

module.exports = UserService;

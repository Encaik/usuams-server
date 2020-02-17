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

  async agree(params, body) {
    const info = await this.app.mysql.select(
      'guest_table',
      {
        where: {
          id: params.id,
        },
      }
    );
    const result = await this.app.mysql.insert(
      'user_table',
      {
        name: info[0].name,
        number: info[0].number,
        username: info[0].number,
        password: 123456,
        sex: info[0].sex,
        collage: info[0].collage,
        major: info[0].major,
        grade: info[0].grade,
        class: info[0].class,
        user_type: 5,
        department: body.depa,
        join_date: Math.round(new Date() / 1000),
        exit_date: null,
      }
    );
    await this.app.mysql.delete(
      'guest_table',
      {
        id: params.id,
      }
    );
    return {
      code: 0,
      msg: 'success',
      data: result,
    };
  }

  async refuse(params) {
    const info = await this.app.mysql.select(
      'guest_table',
      {
        where: {
          id: params.id,
        },
      }
    );
    const result = await this.app.mysql.update(
      'guest_table',
      {
        status: info[0].status + 1,
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

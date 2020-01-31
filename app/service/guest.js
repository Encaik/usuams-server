'use strict';

const Service = require('egg').Service;

class GuestService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.current) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    const result = await this.app.mysql.select('guest_table', {
      where: { user_type: '6' },
      limit: Number(query.pageSize), // 返回数据量
      offset: (query.current - 1) * query.pageSize, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('guest_table', { user_type: '6' });
    return {
      code: 0,
      msg: 'success',
      data: result,
      current: Number(query.current),
      total: totalCount,
    };
  }

  // 按id查询数据
  async show(params) {
    const result = await this.app.mysql.select(
      'guest_table',
      {
        id: params.id,
      }
    );
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'guest_table',
      {
        name: body.name,
        number: body.number,
        sex: body.sex,
        collage: body.collage,
        major: body.major,
        grade: body.grade,
        class: body.class,
        user_type: 6,
        create_date: Math.round(new Date() / 1000),
        depa1: body.depa1,
        depa2: body.depa2,
        depa3: body.depa3,
      }
    );
    return {
      code: 0,
      msg: 'success',
      data: result,
    };
  }

  async update(params, body) {
    const data = {};
    if (body.name) {
      data.name = body.name;
    }
    if (body.number) {
      data.number = body.number;
    }
    if (body.username) {
      data.username = body.username;
    }
    if (body.password) {
      data.password = body.password;
    }
    if (body.sex) {
      data.sex = body.sex;
    }
    if (body.collage) {
      data.collage = body.collage;
    }
    if (body.major) {
      data.major = body.major;
    }
    if (body.grade) {
      data.grade = body.grade;
    }
    if (body.class) {
      data.class = body.class;
    }
    if (body.user_type) {
      data.user_type = body.user_type;
    }
    if (body.department) {
      data.department = body.department;
    }
    const result = await this.app.mysql.update(
      'guest_table',
      data,
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
      'guest_table',
      {
        id: params.id,
      }
    );
    return result;
  }

}

module.exports = GuestService;

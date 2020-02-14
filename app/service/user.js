'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.current) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    if (!query.type || query.type.length === 0) {
      query.type = [ '1', '2', '3', '4', '5' ];
    }
    await this.app.mysql.update('time_table',
      { timestamp: Math.round(new Date() / 1000) },
      {
        where: {
          id: '1',
        },
      }
    );
    let result = [];
    let totalCount = 0;
    if (!query.depa) {
      result = await this.app.mysql.select('user_table', {
        where: { user_type: query.type },
        limit: Number(query.pageSize), // 返回数据量
        offset: (query.current - 1) * query.pageSize, // 数据偏移量
      });
      totalCount = await this.app.mysql.count('user_table', {
        user_type: query.type,
      });
    } else {
      result = await this.app.mysql.select('user_table', {
        where: { user_type: query.type, department: query.depa },
        limit: Number(query.pageSize), // 返回数据量
        offset: (query.current - 1) * query.pageSize, // 数据偏移量
      });
      totalCount = await this.app.mysql.count('user_table', {
        user_type: query.type,
        department: query.depa,
      });
    }

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
        username: body.number,
        password: 123456,
        sex: body.sex,
        collage: body.collage,
        major: body.major,
        grade: body.grade,
        class: body.class,
        user_type: body.user_type,
        department: body.department,
        join_date: Math.round(new Date() / 1000),
        exit_date: null,
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
    if (body.join_date) {
      data.join_date = body.join_date;
    }
    if (body.exit_date) {
      data.exit_date = body.exit_date;
    }
    const result = await this.app.mysql.update(
      'user_table',
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
      'user_table',
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

}

module.exports = UserService;

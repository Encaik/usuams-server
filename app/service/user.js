'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.pageNumber) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    const result = await this.app.mysql.select('user_table', {
      limit: Number(query.pageSize), // 返回数据量
      offset: (query.pageNumber - 1) * query.pageSize, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('user_table');
    return {
      code: 0,
      msg: 'success',
      data: result,
      currentPage: Number(query.pageNumber),
      pages: Math.ceil(result.length / query.pageSize),
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
    return result;
  }

}

module.exports = UserService;

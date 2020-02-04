'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.current) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    const result = await this.app.mysql.select('department_table', {
      limit: Number(query.pageSize), // 返回数据量
      offset: (query.current - 1) * query.pageSize, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('department_table');
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
      'department_table',
      {
        id: params.id,
      }
    );
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'department_table',
      {
        name: body.name,
        people: body.people,
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
    if (body.people) {
      data.people = body.people;
    }
    const result = await this.app.mysql.update(
      'department_table',
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
      'department_table',
      {
        id: params.id,
      }
    );
    return result;
  }

}

module.exports = DepartmentService;

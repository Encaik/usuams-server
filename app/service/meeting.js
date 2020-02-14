'use strict';

const Service = require('egg').Service;

class MeetingService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.current) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    await this.app.mysql.update('time_table',
      { timestamp: Math.round(new Date() / 1000) },
      {
        where: {
          id: '1',
        },
      }
    );
    const result = await this.app.mysql.select('meeting_table', {
      limit: Number(query.pageSize), // 返回数据量
      offset: (query.current - 1) * query.pageSize, // 数据偏移量
    });
    const totalCount = await this.app.mysql.count('meeting_table');
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
      'meeting_table',
      {
        id: params.id,
      }
    );
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'meeting_table',
      {
        name: body.name,
        meeting_date: body.meeting_date,
        upload_date: body.upload_date,
        department: body.department,
        participant: body.participant,
        recorder: body.recorder,
        context: body.context,
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
    if (body.create_date) {
      data.create_date = body.create_date;
    }
    if (body.start_date) {
      data.start_date = body.start_date;
    }
    if (body.end_date) {
      data.end_date = body.end_date;
    }
    if (body.leader) {
      data.leader = body.leader;
    }
    if (body.level) {
      data.level = body.level;
    }
    if (body.state) {
      data.state = body.state;
    }
    if (body.context) {
      data.context = body.context;
    }
    const result = await this.app.mysql.update(
      'meeting_table',
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
      'meeting_table',
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

module.exports = MeetingService;

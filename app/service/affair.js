'use strict';

const Service = require('egg').Service;

class AffairService extends Service {

  // 查询全部数据
  async index(query) {
    if (!query.pageSize) {
      return { code: 2001, msg: '分页数据条数缺失' };
    }
    if (!query.current) {
      return { code: 2002, msg: '分页数据页数缺失' };
    }
    if (!query.state || query.state.length === 0) {
      query.state = [ '待审核', '已创建', '已开始', '已结束' ];
    }
    let sql = '';
    let totalSql = '';
    if (!query.uid || parseInt(query.uid) === 2) {
      sql = `SELECT a.*,b.name AS reviewer_name,c.name AS leader_name
      FROM affair_table AS a
      INNER JOIN user_table b ON b.id = a.reviewer
      INNER JOIN user_table c ON c.id = a.leader
      WHERE FIND_IN_SET(state,'${query.state.join(',')}')
      LIMIT ${Number(query.pageSize)}
      OFFSET ${(query.current - 1) * query.pageSize}`;
      totalSql = `SELECT a.*,b.name AS reviewer_name,c.name AS leader_name
      FROM affair_table AS a
      INNER JOIN user_table b ON b.id = a.reviewer
      INNER JOIN user_table c ON c.id = a.leader
      WHERE FIND_IN_SET(state,'${query.state.join(',')}')
      LIMIT ${Number(query.pageSize)}
      OFFSET ${(query.current - 1) * query.pageSize}`;
    } else {
      sql = `SELECT a.*,b.name AS reviewer_name,c.name AS leader_name
      FROM affair_table AS a
      INNER JOIN user_table b ON b.id = a.reviewer
      INNER JOIN user_table c ON c.id = a.leader
      INNER JOIN worker_table d ON d.affair_id = a.id
      WHERE FIND_IN_SET(state,'${query.state.join(',')}')
      AND a.reviewer = '${query.uid}'
      OR a.leader = '${query.uid}'
      OR d.worker_id = '${query.uid}'
      GROUP BY a.id
      LIMIT ${Number(query.pageSize)}
      OFFSET ${(query.current - 1) * query.pageSize}`;
      totalSql = `SELECT a.*,b.name AS reviewer_name,c.name AS leader_name
      FROM affair_table AS a
      INNER JOIN user_table b ON b.id = a.reviewer
      INNER JOIN user_table c ON c.id = a.leader
      INNER JOIN worker_table d ON d.affair_id = a.id
      WHERE FIND_IN_SET(state,'${query.state.join(',')}')
      AND a.reviewer = '${query.uid}'
      OR a.leader = '${query.uid}'
      OR d.worker_id = '${query.uid}'
      GROUP BY a.id
      LIMIT ${Number(query.pageSize)}
      OFFSET ${(query.current - 1) * query.pageSize}`;
    }
    // const result = await this.app.mysql.select('affair_table', {
    //   where: { state: query.state },
    //   limit: Number(query.pageSize), // 返回数据量
    //   offset: (query.current - 1) * query.pageSize, // 数据偏移量
    // });
    // const totalCount = await this.app.mysql.count('affair_table', { state: query.state });
    const result = await this.app.mysql.query(sql);
    const totalResult = await this.app.mysql.query(totalSql);
    const totalCount = totalResult.length;
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
      'affair_table',
      {
        id: params.id,
      }
    );
    return result;
  }

  // 新增数据
  async create(body) {
    const result = await this.app.mysql.insert(
      'affair_table',
      {
        name: body.name,
        create_date: Math.round(new Date() / 1000),
        start_date: body.start_date,
        end_date: body.end_date,
        leader: body.leader,
        reviewer: body.reviewer,
        level: body.level,
        state: body.state,
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
    if (body.reviewer) {
      data.reviewer = body.reviewer;
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
      'affair_table',
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
      'affair_table',
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

module.exports = AffairService;

'use strict';

const Controller = require('egg').Controller;

/**
 *  Method	Path	          Route Name	Controller.Action
 *  GET	    /posts	        posts	      app.controllers.posts.index
 *  GET	    /posts/new	    new_post	  app.controllers.posts.new
 *  GET	    /posts/:id	    post	      app.controllers.posts.show
 *  GET	    /posts/:id/edit	edit_post	  app.controllers.posts.edit
 *  POST	  /posts	        posts	      app.controllers.posts.create
 *  PUT	    /posts/:id	    post	      app.controllers.posts.update
 *  DELETE	/posts/:id	    post	      app.controllers.posts.destroy
 */

class UserController extends Controller {

  // 查询全部数据
  async index() {
    const result = await this.ctx.service.user.index(this.ctx.queries);
    console.log('index', result);
    this.ctx.body = result;
  }

  // 按id查询数据
  async show() {
    const result = await this.ctx.service.user.show(this.ctx.params);
    console.log('show', result);
    this.ctx.body = {
      code: 0,
      msg: 'success',
      data: result,
    };
  }

  // 新增数据
  async create() {
    const result = await this.ctx.service.user.create(this.ctx.request.body);
    console.log(result);
    this.ctx.body = result;
  }

  async update() {
    const result = await this.ctx.service.user.update(this.ctx.params, this.ctx.request.body);
    console.log(result);
    this.ctx.body = {
      code: 0,
      msg: 'success',
      data: result,
    };
  }

  // 按id删除数据
  async destroy() {
    const result = await this.ctx.service.user.destroy(this.ctx.params);
    console.log(result);
    this.ctx.body = result;
  }
}

module.exports = UserController;

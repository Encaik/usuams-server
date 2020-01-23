'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录功能
  router.post('/login', controller.login.index);
  // 修改用户名及密码
  // 退出功能
  router.post('/exit', controller.login.exit);
  // 首页 crud api
  router.resources('home', '/home', controller.home);
  // 用户 crud api
  router.resources('user', '/user', controller.user);
  // 游客 crud api
  router.resources('guest', '/guest', controller.guest);
  // 事务 crud api
  router.resources('affair', '/affair', controller.affair);
  // 例会记录 crud api
};

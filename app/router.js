'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 登录功能
  router.post('/login', controller.login.index);
  // 注册功能
  router.post('/sign', controller.guest.create);
  // 修改用户名及密码
  // 退出功能
  router.post('/exit', jwt, controller.login.exit);
  // 首页 crud api
  router.resources('home', '/home', jwt, controller.home);
  // 用户 crud api
  router.resources('user', '/user', jwt, controller.user);
  // 游客 crud api
  router.resources('guest', '/guest', jwt, controller.guest);
  // 事务 crud api
  router.resources('affair', '/affair', jwt, controller.affair);
  // 部门 crud api
  router.resources('department', '/department', jwt, controller.department);
  // 例会记录 crud api
};

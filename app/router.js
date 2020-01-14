'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.login.index);
  router.resources('home', '/home', controller.home);
  router.resources('user', '/user', controller.user);
  router.resources('affair', '/affair', controller.affair);
};

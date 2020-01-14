'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/login', controller.login.index);
  router.resources('home', '/', controller.home);
  router.resources('user', '/', controller.user);
  router.resources('affair', '/', controller.affair);
};

import * as express from 'express';
import {Application, Router} from 'express';
import {Container} from 'typedi/Container';
import {HomeController} from './home';
import {UserController} from './user';
// export function getRouter(): Router {
//   const router: Router = Router();
//   router.use('/', homeController.getConfiguredRouter());
//   router.use('/users', userController.getConfiguredRouter());
//   return router;
// }

export function configure(app: Application, version): void {
  const homeController = Container.get(HomeController);
  const userController = Container.get(UserController);
  const router: Router = Router();
  router.use('/', homeController.getConfiguredRouter());
  router.use('/users', userController.getConfiguredRouter());
  app.use(version, router);
}
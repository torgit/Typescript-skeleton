import {NextFunction, Request, Response, Router} from 'express';
import {Service} from 'typedi';

import {BaseController} from '../base';

@Service()
export class HomeController extends BaseController {
  private get = (_req: Request, res: Response, _next: NextFunction): void => {
    const data = 'Super Scores TS Application';
    this.setCacheControl(res, 5 * 60);
    res.json({data});
  };

  getConfiguredRouter(): Router {
    const router: Router = Router();

    router.route('/').get(this.getParams, this.get);

    return router;
  }
}
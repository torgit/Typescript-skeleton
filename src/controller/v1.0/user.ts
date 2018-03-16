import {NextFunction, Request, Response, Router} from 'express';
import {Service} from 'typedi';
import {BaseController} from '../base';
import {UserService} from './../../service/user';

@Service()
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }
  private getAll = async(
      _req: Request, res: Response, _next: NextFunction): Promise<void> => {
    // const userRepository =
    // getConnection().getCustomRepository(UserRepository);
    const data = await this.userService.getAll();
    this.setCacheControl(res, 5 * 60);
    res.json({data});
  };

  getConfiguredRouter(): Router {
    const router: Router = Router();
    router.route('/').get(this.getParams, this.getAll);
    return router;
  }
}
import {NextFunction, Request, Response, Router} from 'express';
import * as _ from 'lodash';

import {DateHelper} from '../helper';
import {CustomError, errorInfo, INVALID_TOKEN} from '../helper/error';

// import { User } from "../database/entity/v1/user";

export abstract class BaseController {
  private static readonly AUTHORIZATION_HEADER: string = 'authorization';
  private static readonly BEARER: string = 'bearer';

  protected get serverTimestamp(): number {
    return DateHelper.getTimestamp();
  }

  private splitAuthorizationHeader(value: string): string[] {
    return value.trim().split(' ');
  }

  private validateAuthorizationHeader(value: string): boolean {
    if (!value) {
      return false;
    }
    const params = this.splitAuthorizationHeader(value);
    return params.length === 2 &&
        params[0].toLowerCase() === BaseController.BEARER;
  }

  protected getContentLang(req: Request): string {
    return req.query.contentLang || 'en';
  }

  protected setCacheControl(res: Response, seconds: number): void {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }

  protected getParams(req: Request, res: Response, next: NextFunction): void {
    const routeParameter =
        req.params && _.keys(req.params).length > 0 ? req.params : null;
    const queryString =
        req.query && _.keys(req.query).length > 0 ? req.query : null;
    res.locals.params = {routeParameter, queryString};
    next();
  }
  protected getAuthorizationHeader(req: Request): string {
    const authorization = req.headers[BaseController.AUTHORIZATION_HEADER];
    if (!authorization || authorization instanceof Array) {
      return '';
    } else {
      return authorization;
    }
  }
  // protected authenticate = async (req: Request, res: Response, next:
  // NextFunction): Promise<void> => {
  //     const authorization = this.getAuthorizationHeader(req)
  //     if (!this.validateAuthorizationHeader(authorization)) {
  //         return next(new CustomError(errorInfo[INVALID_TOKEN]));
  //     }
  //     const token = this.splitAuthorizationHeader(authorization)[1];
  //     const entry = await accountService.getUserByToken(token);
  //     if (!entry) {
  //         return next(new CustomError(errorInfo[INVALID_TOKEN]));
  //     }
  //     res.locals.user = entry;
  //     next();
  // };

  // protected tryGetUser = async (req: Request, res: Response, next:
  // NextFunction): Promise<void> => {
  //     const authorization = this.getAuthorizationHeader(req)
  //     if (this.validateAuthorizationHeader(authorization)) {
  //         const token = this.splitAuthorizationHeader(authorization)[1];
  //         const entry = await accountService.getUserByToken(token);
  //         if (entry) {
  //             res.locals.user = entry;
  //         }
  //     }
  //     next();
  // };

  // protected validateUserIdRouteParams(userId: string, user: User): void {
  //     if (userId !== 'me' && Number(userId) !== user.userId) {
  //         throw new CustomError(errorInfo[INVALID_TOKEN]);
  //     }
  // }

  abstract getConfiguredRouter(): Router;
}
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import {Application} from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

export {configureError} from './error';
export {configureNotFound} from './not-found';

export const configure = (app: Application): void => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '2000kb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '2000kb'}));
  app.use(compression());
};
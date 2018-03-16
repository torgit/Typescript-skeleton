import {Application} from 'express';
import {configure as configureV1} from './v1.0';

export const configure = (app: Application): void => {
  configureV1(app, '/v1.0');
  // Default
  configureV1(app, '/');
};
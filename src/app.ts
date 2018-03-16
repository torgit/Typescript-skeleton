import 'reflect-metadata';
import 'es6-shim';

import * as express from 'express';
import {Application} from 'express';
import * as http from 'http';
import {Container} from 'typedi';
import {ConnectionOptions, createConnection, useContainer} from 'typeorm';
import {Connection} from 'typeorm/connection/Connection';

import {CONFIG} from './configuration';
import * as controller from './controller';
import * as middleware from './middleware';

export class App {
  constructor(private readonly connection: Connection) {}
  getApp(): Application {
    const app: Application = express();
    const {apiPort, environment, application} = CONFIG;
    http.globalAgent.maxSockets = Infinity;
    middleware.configure(app);
    controller.configure(app);
    app.use(middleware.configureNotFound);
    app.use(middleware.configureError);
    return app;
  }

  async start() {
    const {apiPort, environment, application} = CONFIG;
    const app = this.getApp();
    await app
        .listen(
            apiPort,
            async () => {
              console.log(
                  '********************************************************');
              console.log(`* [${application}] application [${
                  environment}] started at port ${apiPort} *`);
              console.log(
                  '********************************************************');
            })
        // tslint:disable-next-line:no-any
        .on('error', (error: any, port: number) => {
          if (error.syscall !== 'listen') {
            throw error;
          }
          switch (error.code) {
            case 'EACCESS':
              if (process.env.NODE_ENV !== 'test') {
                console.log(`${port} requires elevated privileges`);
              }
              process.exit(1);
            case 'EADDRINUSE':
              if (process.env.NODE_ENV !== 'test') {
                console.log(`${port} is already in use`);
              }
              process.exit(1);
            default:
              throw error;
          }
        });
  }
}
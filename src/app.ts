import 'reflect-metadata';
import 'es6-shim';
import { Container } from 'typedi';
import { useContainer, createConnection, ConnectionOptions } from 'typeorm';
import * as express from 'express';
import {Application} from 'express';
import * as http from 'http';
import {CONFIG} from './configuration';
import * as controller from './controller';
import * as middleware from './middleware';
import { ConnectionOptionsReader } from 'typeorm/connection/ConnectionOptionsReader';
import * as path from 'path';

const databaseConfig = CONFIG.database;
const entitiesPath = path.resolve(__dirname, 'database/entity/**/*');
const options: ConnectionOptions = {
  type: "mysql",
  host: databaseConfig.host,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [entitiesPath]
};
useContainer(Container);
const app = createConnection(options)
.then(async connection => {
    console.log("Connection created!!!!!!!!!!");
    const app: Application = express();
    const {apiPort, environment, application} = CONFIG;
    http.globalAgent.maxSockets = Infinity;
    middleware.configure(app);
    controller.configure(app);
    app.use(middleware.configureNotFound);
    app.use(middleware.configureError);
    return app;
    // const server: http.Server = app.listen(apiPort, async () => {
    //     console.log('********************************************************');
    //     console.log(`* [${application}] application [${
    //         environment}] started at port ${apiPort} *`);
    //     console.log('********************************************************');
    //   // tslint:disable-next-line:no-any
    //   }).on('error', (error: any, port: number) => {
    //     if (error.syscall !== "listen") {
    //       throw error;
    //     }
    //     switch (error.code) {
    //       case "EACCESS":
    //         if (process.env.NODE_ENV !== "test") {
    //           console.log(`${port} requires elevated privileges`);
    //         }
    //         process.exit(1);
    //       case "EADDRINUSE":
    //         if (process.env.NODE_ENV !== 'test') {
    //           console.log(`${port} is already in use`);
    //         }
    //         process.exit(1);
    //       default:
    //         throw error;
    //     }
    //   });
      
    //   server.timeout = 10000;
    //   return server;
}).catch(error => console.error('Application is crashed: ' + error));
// module.exports = app;

// tslint:disable-next-line:no-default-export
export default app;
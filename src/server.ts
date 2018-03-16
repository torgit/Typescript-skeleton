import * as cluster from 'cluster';
import {Worker} from 'cluster';
import * as os from 'os';
import * as path from 'path';
import {Container} from 'typedi/Container';
import {ConnectionOptions, createConnection, useContainer} from 'typeorm';

import {App} from './app';
import {CONFIG} from './configuration';
import {DEVELOPMENT} from './configuration/environment';

const {apiPort, environment, application} = CONFIG;
const databaseConfig = CONFIG.database;
const entitiesPath = path.resolve(__dirname, 'database/entity/**/*');
const options: ConnectionOptions = {
  type: 'mysql',
  host: databaseConfig.host,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [entitiesPath]
};

const start = async () => {
  useContainer(Container);
  const connection = await createConnection(options);
  return await new App(connection).start();
};

if (environment === DEVELOPMENT) {
  start();
} else {
  if (cluster.isMaster) {
    const CPU: number = os.cpus().length;
    for (let i = 0; i < CPU; i++) {
      cluster.fork();
    }
  } else {
    start();
  }
}

// Cluster events
cluster.on('online', (worker: Worker) => {
  console.log('**************************');
  console.log(`* Worker ${worker.process.pid} is online *`);
  console.log('**************************');
});

cluster.on('exit', (worker: Worker, code: number, signal: string) => {
  console.log('**************************************');
  console.log(
      `Worker ${worker.process.pid} died (${signal || code}). restarting...`);
  console.log('**************************************');
  cluster.fork();
});

// Process events
// tslint:disable-next-line:no-any
process.on('unhandledRejection', (reason: any) => {
  console.log('********** Unhandled Rejection **********');
  console.log(reason);
  console.log('*****************************************');
});

process.on('uncaughtException', (err: Error) => {
  console.log('********** Uncaught Exception **********');
  console.log(err);
  console.log('****************************************');
});

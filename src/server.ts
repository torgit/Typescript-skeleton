import * as cluster from 'cluster';
import {Worker} from 'cluster';
import * as os from 'os';
import app from './app';
import {CONFIG} from './configuration';
import {DEVELOPMENT} from './configuration/environment';

const {apiPort, environment, application} = CONFIG;

const start = async () => {
  await app.then(app => app.listen(
    apiPort,
    async () => {
      console.log(
          '********************************************************');
      console.log(`* [${application}] application [${
          environment}] started at port ${apiPort} *`);
      console.log(
          '********************************************************');
    }).on('error',
    // tslint:disable-next-line:no-any
    (error: any, port: number) => {
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
    }).timeout = 10000
  );
};

// const start = () => require('./app');

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

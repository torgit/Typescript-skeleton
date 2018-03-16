import {Configuration} from './interface';

const CONFIGURATION: Configuration = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'soccerss'
  }
};

export const config = CONFIGURATION;
import {config as CONFIG_BETA} from './configuration-beta';
import {config as CONFIG_COMMON} from './configuration-common';
import {config as CONFIG_LOCAL} from './configuration-local';
import {config as CONFIG_PRODUCTION} from './configuration-production';
import {API, BETA, DEVELOPMENT, PRODUCTION} from './environment';
import {Configuration} from './interface';

const environment = process.env.NODE_ENV || DEVELOPMENT;
const application = process.env.NODE_APPLICATION || API;

let config: Configuration;

switch (environment) {
  case PRODUCTION:
    config = CONFIG_PRODUCTION;
    break;
  case BETA:
    config = CONFIG_BETA;
    break;
  default:
    config = CONFIG_LOCAL;
}

export const CONFIG = {
  ...CONFIG_COMMON,
  ...config,
  environment,
  application,
};

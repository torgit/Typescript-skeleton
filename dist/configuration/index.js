"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_beta_1 = require("./configuration-beta");
var configuration_common_1 = require("./configuration-common");
var configuration_local_1 = require("./configuration-local");
var configuration_production_1 = require("./configuration-production");
var environment_1 = require("./environment");
var environment = process.env.NODE_ENV || environment_1.DEVELOPMENT;
var application = process.env.NODE_APPLICATION || environment_1.API;
var config;
switch (environment) {
    case environment_1.PRODUCTION:
        config = configuration_production_1.config;
        break;
    case environment_1.BETA:
        config = configuration_beta_1.config;
        break;
    default:
        config = configuration_local_1.config;
}
exports.CONFIG = __assign({}, configuration_common_1.config, config, { environment: environment,
    application: application });
//# sourceMappingURL=index.js.map
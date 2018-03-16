"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var morgan = require("morgan");
var error_1 = require("./error");
exports.configureError = error_1.configureError;
var not_found_1 = require("./not-found");
exports.configureNotFound = not_found_1.configureNotFound;
exports.configure = function (app) {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.json({ limit: '2000kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '2000kb' }));
    app.use(compression());
};
//# sourceMappingURL=index.js.map
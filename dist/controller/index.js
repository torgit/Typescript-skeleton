"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v1_0_1 = require("./v1.0");
exports.configure = function (app) {
    v1_0_1.configure(app, '/v1.0');
    // Default
    v1_0_1.configure(app, '/');
};
//# sourceMappingURL=index.js.map
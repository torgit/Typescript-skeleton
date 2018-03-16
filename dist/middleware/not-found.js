"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../helper/error");
exports.configureNotFound = function (_req, res, _next) {
    var _a = error_1.errorInfo[error_1.API_NOT_FOUND], httpStatus = _a.httpStatus, errorBody = _a.errorBody;
    res.status(httpStatus).json(errorBody);
};
//# sourceMappingURL=not-found.js.map
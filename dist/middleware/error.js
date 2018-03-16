"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../helper/error");
exports.configureError = function (error, _req, res, _next) {
    if (error instanceof error_1.CustomError) {
        var _a = error.getError(), httpStatus = _a.httpStatus, errorBody = _a.errorBody;
        res.status(httpStatus).json(errorBody);
    }
    else {
        console.log('*********** UNHANDLED ERROR **********');
        console.log(error);
        console.log('**************************************');
        var _b = error_1.errorInfo[error_1.INTERNAL_ERROR], httpStatus = _b.httpStatus, errorBody = _b.errorBody;
        res.status(httpStatus).json(errorBody);
    }
};
//# sourceMappingURL=error.js.map
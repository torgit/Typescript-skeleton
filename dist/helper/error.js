"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERNAL_ERROR = 'INTERNAL_ERROR';
exports.API_NOT_FOUND = 'API_NOT_FOUND';
exports.NOT_FOUND = 'NOT_FOUND';
exports.INVALID_TOKEN = 'INVALID_TOKEN';
exports.errorInfo = (_a = {},
    _a[exports.INTERNAL_ERROR] = {
        httpStatus: 500,
        errorBody: { errorCode: 1001, errorMessage: 'Internal server error' }
    },
    _a[exports.API_NOT_FOUND] = {
        httpStatus: 404,
        errorBody: { errorCode: 1002, errorMessage: 'API does not exist' }
    },
    _a[exports.NOT_FOUND] = {
        httpStatus: 404,
        errorBody: { errorCode: 1003, errorMessage: 'Content not found' }
    },
    _a[exports.INVALID_TOKEN] = {
        httpStatus: 401,
        errorBody: { errorCode: 1004, errorMessage: 'Invalid token' }
    },
    _a);
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(error) {
        var _this = _super.call(this, error.errorBody.errorMessage) || this;
        _this.error = error;
        Object.setPrototypeOf(_this, CustomError.prototype);
        return _this;
    }
    CustomError.prototype.getError = function () {
        return this.error;
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var _a;
//# sourceMappingURL=error.js.map
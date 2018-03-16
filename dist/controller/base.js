"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var helper_1 = require("../helper");
// import { User } from "../database/entity/v1/user";
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    Object.defineProperty(BaseController.prototype, "serverTimestamp", {
        get: function () {
            return helper_1.DateHelper.getTimestamp();
        },
        enumerable: true,
        configurable: true
    });
    BaseController.prototype.splitAuthorizationHeader = function (value) {
        return value.trim().split(' ');
    };
    BaseController.prototype.validateAuthorizationHeader = function (value) {
        if (!value) {
            return false;
        }
        var params = this.splitAuthorizationHeader(value);
        return params.length === 2 &&
            params[0].toLowerCase() === BaseController.BEARER;
    };
    BaseController.prototype.getContentLang = function (req) {
        return req.query.contentLang || 'en';
    };
    BaseController.prototype.setCacheControl = function (res, seconds) {
        res.set('Cache-Control', "public, max-age=" + seconds);
    };
    BaseController.prototype.getParams = function (req, res, next) {
        var routeParameter = req.params && _.keys(req.params).length > 0 ? req.params : null;
        var queryString = req.query && _.keys(req.query).length > 0 ? req.query : null;
        res.locals.params = { routeParameter: routeParameter, queryString: queryString };
        next();
    };
    BaseController.prototype.getAuthorizationHeader = function (req) {
        var authorization = req.headers[BaseController.AUTHORIZATION_HEADER];
        if (!authorization || authorization instanceof Array) {
            return '';
        }
        else {
            return authorization;
        }
    };
    BaseController.AUTHORIZATION_HEADER = 'authorization';
    BaseController.BEARER = 'bearer';
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=base.js.map
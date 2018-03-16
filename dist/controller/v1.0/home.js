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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var typedi_1 = require("typedi");
var base_1 = require("../base");
var HomeController = /** @class */ (function (_super) {
    __extends(HomeController, _super);
    function HomeController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get = function (_req, res, _next) {
            var data = 'Super Scores TS Application';
            _this.setCacheControl(res, 5 * 60);
            res.json({ data: data });
        };
        return _this;
    }
    HomeController.prototype.getConfiguredRouter = function () {
        var router = express_1.Router();
        router.route('/').get(this.getParams, this.get);
        return router;
    };
    HomeController = __decorate([
        typedi_1.Service()
    ], HomeController);
    return HomeController;
}(base_1.BaseController));
exports.HomeController = HomeController;
//# sourceMappingURL=home.js.map
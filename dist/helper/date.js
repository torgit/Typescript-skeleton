"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.getCurrentUtcDateTime = function () {
        return moment().utc().toDate();
    };
    DateHelper.isValidTokenExpireAt = function (date) {
        var tokenExpireAt = moment.utc(date);
        return !moment.utc().isAfter(tokenExpireAt);
    };
    DateHelper.getNewTokenExpireAt = function () {
        return moment.utc().add(6, 'months').toDate();
    };
    DateHelper.getTimestamp = function (date) {
        return date ? moment.utc(date).unix() : moment().unix();
    };
    return DateHelper;
}());
exports.DateHelper = DateHelper;
//# sourceMappingURL=date.js.map
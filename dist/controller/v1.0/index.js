"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Container_1 = require("typedi/Container");
var home_1 = require("./home");
var user_1 = require("./user");
// export function getRouter(): Router {
//   const router: Router = Router();
//   router.use('/', homeController.getConfiguredRouter());
//   router.use('/users', userController.getConfiguredRouter());
//   return router;
// }
function configure(app, version) {
    var homeController = Container_1.Container.get(home_1.HomeController);
    var userController = Container_1.Container.get(user_1.UserController);
    var router = express_1.Router();
    router.use('/', homeController.getConfiguredRouter());
    router.use('/users', userController.getConfiguredRouter());
    app.use(version, router);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map
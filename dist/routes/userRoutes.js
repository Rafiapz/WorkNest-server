"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = (0, express_1.Router)();
router.route('/fetch-managers').get(userController_1.fetchManagersController);
router.route('/signup').post(userController_1.signupController);
router.route('/login').post(userController_1.loginController);
router.use(userMiddleware_1.authMiddleware);
router.route('/fetch-user').get(userController_1.fetchUserController);
router.route('/fetch-employees/:id').get(userController_1.fetchEmployeesController);
exports.default = router;

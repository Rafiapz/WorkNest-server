"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmployeesController = exports.fetchManagersController = exports.fetchUserController = exports.loginController = exports.signupController = void 0;
const signupValidation_1 = require("../validation/signupValidation");
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = require("../service/bcrypt");
const jwt_1 = require("../service/jwt");
const loginValidation_1 = require("../validation/loginValidation");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = signupValidation_1.signupValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        value.password = yield (0, bcrypt_1.hashPassword)(value.password);
        console.log(value);
        const data = yield userModel_1.default.create(value);
        if (!data) {
            throw Error('Failed to signup');
        }
        const token = (0, jwt_1.generateToken)({ email: data === null || data === void 0 ? void 0 : data.email, _id: data === null || data === void 0 ? void 0 : data._id });
        res.status(200).json({ status: 'success', data, token });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            res.status(500).json({ status: 'error', message: 'The user is already exists' });
            return;
        }
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.signupController = signupController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = loginValidation_1.loginValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        const data = yield userModel_1.default.findOne({ email: value === null || value === void 0 ? void 0 : value.email });
        if (!data) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            return;
        }
        const match = yield (0, bcrypt_1.validatePassword)(value === null || value === void 0 ? void 0 : value.password, data === null || data === void 0 ? void 0 : data.password);
        if (!match) {
            res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            return;
        }
        const token = (0, jwt_1.generateToken)({ email: data === null || data === void 0 ? void 0 : data.email, _id: data === null || data === void 0 ? void 0 : data._id });
        res.status(200).json({ status: 'success', token, data });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.loginController = loginController;
const fetchUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
        const data = yield userModel_1.default.findOne({ email });
        res.status(200).json({ status: 'success', data, isAuthenticated: true });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.fetchUserController = fetchUserController;
const fetchManagersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userModel_1.default.find({ role: 'manager' }, { fullName: 1, _id: 1 });
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.fetchManagersController = fetchManagersController;
const fetchEmployeesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const data = yield userModel_1.default.find({ managerId: id });
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.fetchEmployeesController = fetchEmployeesController;

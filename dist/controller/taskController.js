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
exports.deleteTaskController = exports.editTaskController = exports.fetchMyTasksController = exports.addTaskController = void 0;
const taskValidation_1 = require("../validation/taskValidation");
const taskModel_1 = __importDefault(require("../model/taskModel"));
const addTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        req.body.assignedTo = JSON.parse(req.body.assignedTo);
        req.body.start = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.start);
        req.body.end = JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.end);
        req.body.date = JSON.parse((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.date);
        const { value, error } = taskValidation_1.taskValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        const data = yield taskModel_1.default.create(value);
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.addTaskController = addTaskController;
const fetchMyTasksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req === null || req === void 0 ? void 0 : req.user._id;
        const data = yield taskModel_1.default.find({
            $or: [
                { assignedTo: { $in: [id] } },
                { userId: id }
            ]
        }).populate({
            path: 'assignedTo',
        });
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.fetchMyTasksController = fetchMyTasksController;
const editTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        req.body.assignedTo = JSON.parse(req.body.assignedTo);
        req.body.start = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.start);
        req.body.end = JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.end);
        req.body.date = JSON.parse((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.date);
        const { value, error } = taskValidation_1.taskValidation.validate(req === null || req === void 0 ? void 0 : req.body);
        if (error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
        const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
        const data = yield taskModel_1.default.updateOne({ _id: id }, { $set: value });
        res.status(200).json({ status: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.editTaskController = editTaskController;
const deleteTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        yield taskModel_1.default.deleteOne({ _id: id });
        res.status(200).json({ status: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: (error === null || error === void 0 ? void 0 : error.message) || 'internal server error' });
    }
});
exports.deleteTaskController = deleteTaskController;

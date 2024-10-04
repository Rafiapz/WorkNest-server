"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.taskValidation = joi_1.default.object({
    title: joi_1.default
        .string()
        .min(3)
        .required(),
    description: joi_1.default
        .string()
        .min(6)
        .required(),
    assignedTo: joi_1.default
        .array()
        .min(1)
        .required(),
    userId: joi_1.default
        .required(),
    start: joi_1.default
        .required(),
    end: joi_1.default
        .required(),
    date: joi_1.default
        .required()
});

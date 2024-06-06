"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Medium = exports.Left = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TimeSchema = new Schema({
    val: { type: String },
    name: { type: String },
    dynamic: { type: Boolean, default: false },
    zman: { type: String },
    nimus: { type: String },
    rond5minet: { type: Boolean, default: false }
}, { _id: false });
const ItemSchema = new Schema({
    _id: { type: Number },
    title: { type: String, required: true },
    description: { type: String },
    times: [TimeSchema]
});
const Left = mongoose_1.default.model('Left', ItemSchema);
exports.Left = Left;
const Medium = mongoose_1.default.model('Medium', ItemSchema);
exports.Medium = Medium;
const Right = mongoose_1.default.model('Right', ItemSchema);
exports.Right = Right;

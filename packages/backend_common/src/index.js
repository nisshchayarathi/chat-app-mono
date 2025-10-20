"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
require("dotenv/config");
exports.JWT_SECRET = process.env.JWT_SECRET || "123123";

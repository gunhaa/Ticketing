"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
console.log(path_1.default);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((req, res, next) => {
    console.log('첫 번째 미들웨어');
    next();
});
app.use((req, res, next) => {
    console.log('현재 시간:', new Date().toISOString());
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(port, () => {
    console.log("listen 실행..");
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});

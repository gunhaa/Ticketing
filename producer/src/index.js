"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ticket_1 = __importDefault(require("./routes/ticket"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/ticket', ticket_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});

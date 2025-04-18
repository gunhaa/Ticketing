"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const redis_1 = __importDefault(require("../config/redis"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const MAX_REQUEST_LIMIT = 5;
const QUEUE_KEY = 'ticketQueue';
const ONE_HOUR = 1000 * 60 * 60;
const setCookie = (res, userUuid) => {
    res.cookie('userUuid', userUuid, {
        httpOnly: true,
        maxAge: ONE_HOUR,
    });
};
router.get('/', async (req, res, next) => {
    try {
        const userUuid = (0, uuid_1.v4)();
        await redis_1.default.rPush(QUEUE_KEY, userUuid);
        const listLength = await redis_1.default.lLen(QUEUE_KEY);
        if (listLength > MAX_REQUEST_LIMIT) {
            setCookie(res, userUuid);
            return res.redirect(`/ticket/waiting`);
        }
        await redis_1.default.lRem(QUEUE_KEY, 1, userUuid);
        res.sendFile(path_1.default.join(__dirname, '..', 'public', 'ticket.html'));
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.default = router;

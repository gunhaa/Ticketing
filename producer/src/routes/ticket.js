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
const maxRequestLimit = 5;
const queueKey = 'ticketQueue';
router.get('/', async (req, res, next) => {
    try {
        const userUuid = (0, uuid_1.v4)();
        console.log(`this uuid ${userUuid}`);
        await redis_1.default.rPush(queueKey, userUuid);
        res.cookie('userUuid', userUuid, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        const listLength = await redis_1.default.lLen(queueKey);
        if (listLength > maxRequestLimit) {
            return res.redirect(`/ticket/waiting`);
        }
        res.sendFile(path_1.default.join(__dirname, '..', 'public', 'ticket.html'));
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.default = router;

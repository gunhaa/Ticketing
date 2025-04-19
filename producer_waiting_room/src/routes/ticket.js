"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const redis_1 = __importDefault(require("../config/redis"));
const uuid_1 = require("uuid");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constants_1 = require("../constants/constants");
const router = (0, express_1.Router)();
router.use((0, cookie_parser_1.default)());
const setCookie = (res, userUuid, queueLength) => {
    res.cookie('userUuid', userUuid, {
        httpOnly: true,
        maxAge: constants_1.ONE_HOUR,
    });
    res.cookie('queueLength', queueLength, {
        maxAge: constants_1.ONE_MINUTE,
    });
};
router.get('/', async (req, res, next) => {
    try {
        const queueLength = await redis_1.default.lLen(constants_1.QUEUE_KEY);
        if (queueLength > constants_1.MAX_REQUEST_LIMIT_TEST) {
            const userUuid = (0, uuid_1.v4)();
            await redis_1.default.rPush(constants_1.QUEUE_KEY, userUuid);
            // const [shouldProceed, queueLen] : [boolean, number] = await redisClient.eval(
            //     RPUSH_KEY_AND_GET_QUEUE_LEN,
            //     {
            //         keys: [QUEUE_KEY],
            //         arguments: [MAX_REQUEST_LIMIT_TEST.toString(), userUuid]
            //     }
            // ) as [boolean, number];
            setCookie(res, userUuid, queueLength);
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

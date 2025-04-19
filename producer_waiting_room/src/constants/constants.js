"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPUSH_KEY_AND_GET_QUEUE_LEN = exports.ONE_HOUR = exports.ONE_MINUTE = exports.QUEUE_KEY = exports.MAX_REQUEST_LIMIT_TEST = exports.MAX_REQUEST_LIMIT = void 0;
exports.MAX_REQUEST_LIMIT = 100;
exports.MAX_REQUEST_LIMIT_TEST = 3;
exports.QUEUE_KEY = 'ticketQueue';
exports.ONE_MINUTE = 1000 * 60;
exports.ONE_HOUR = 1000 * 60 * 60;
exports.RPUSH_KEY_AND_GET_QUEUE_LEN = `
redis.call("RPUSH", KEYS[1], ARGV[2])
local len = redis.call("LLEN", KEYS[1])
if tonumber(len) > tonumber(ARGV[1]) then
    return {false, len}
end
return {true, len}
`;

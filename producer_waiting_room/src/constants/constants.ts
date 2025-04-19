export const MAX_REQUEST_LIMIT = 100; 
export const MAX_REQUEST_LIMIT_TEST = 3;
export const QUEUE_KEY  = 'ticketQueue';
export const ONE_HOUR = 1000*60*60;
export const RPUSH_KEY_AND_GET_QUEUE_LEN = `
redis.call("RPUSH", KEYS[1], ARGV[2])
local len = redis.call("LLEN", KEYS[1])
if tonumber(len) > tonumber(ARGV[1]) then
    return {false, len}
end
return {true, len}
`;
const IDLE = Symbol("IDLE");
const PENDING = Symbol("PENDING");
const SUCCESS = Symbol("SUCCESS");
const ERROR = Symbol("ERROR");

export const apiStatus = {
    Idle: IDLE,
    Pending: PENDING,
    Success: SUCCESS,
    Error: ERROR,
}

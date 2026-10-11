export const logger = {
    info: (_msg, ..._args) => { },
    warn: (_msg, ..._args) => { },
    error: (msg, ...args) => console.error(`[ERROR] ${msg}`, ...args),
    debug: (_msg, ..._args) => { },
};


function createErrorPayload(e) {
    return {
        error: {
            ...e,
            message: e.message,
        },
    };
}

function createException(message, code) {
    const e = new Error(message);
    e.code = code;
    e.message = message
    return e;
}

// General function for response payload creation
function createErrorPayload(e) {
    return {
        error: {
            ...e,
            message: e.message,
        },
    };
}

// general function for exception creation
function createException(message, code) {
    console.error(message)
    const e = new Error(message);
    e.code = code;
    e.message = message
    return e;
}
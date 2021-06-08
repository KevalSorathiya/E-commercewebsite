function res(status, message, data) {
    return { status: status, message: message, data: data }
}

module.exports = {
    sucRes: (msg, data) => {
        return res('success', msg, data)
    },
    errRes: (msg, data) => {
        return res('fail', msg, data)
    }
}
function responseHelper(success, data, errorMsg) {
    return {
        success,
        data,
        error: {
            message: errorMsg
        }
    }
}

export default responseHelper
import { ResponseData } from "../types/wish"

const responseHelper = (success: boolean, data?: ResponseData, errorMsg?: string) => {
    return {
        success,
        data,
        error: {
            message: errorMsg
        }
    }
}

export default responseHelper
import { WishResponseData } from "../types/wish"

// Response Data Structure
const responseHelper = (
    success: boolean,
    data?: WishResponseData,
    errorMsg?: string) => {
    return {
        success,
        data,
        error: {
            message: errorMsg
        }
    }
}

export default responseHelper
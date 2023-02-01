import { WishResponseData } from "../types/wish"

const responseHelper = (success: boolean, data?: WishResponseData, errorMsg?: string) => {
    return {
        success,
        data,
        error: {
            message: errorMsg
        }
    }
}

export default responseHelper
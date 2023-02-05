import { TWishResponse } from "../validation/wish.validator"


// Response Data Structure
const responseHelper = (
    success: boolean,
    data?: TWishResponse,
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
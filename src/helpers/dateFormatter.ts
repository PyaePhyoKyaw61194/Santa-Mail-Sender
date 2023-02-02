import isValidDate from "./isAValidDate"
import isNumber from "./isNumber"

// Changing Date Format from YYYY/DD/MM to YYYY-MM-DD
const dateFormatter = (date: string): string | null => {
    const dateArr = date.split('/')
    if (dateArr.length !== 3) {
        return null
    }

    if (!isNumber(dateArr[0]) ||
        !isNumber(dateArr[1]) ||
        !isNumber(dateArr[2])) {
        return null
    }
    const returnDate = dateArr[0] + "-" + dateArr[2] + "-" + dateArr[1]
    if (!isValidDate(returnDate)) {

        return null
    }
    return returnDate
}
export default dateFormatter
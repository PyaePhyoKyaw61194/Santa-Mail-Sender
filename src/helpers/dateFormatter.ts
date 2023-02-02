// Changing Date Format from YYYY/DD/MM to YYYY-MM-DD
const dateFormatter = (date: string): string | null => {
    const dateArr = date.split('/')
    if (dateArr.length !== 3) {
        return null
    }
    return dateArr[0] + "-" + dateArr[2] + "-" + dateArr[1]
}
export default dateFormatter
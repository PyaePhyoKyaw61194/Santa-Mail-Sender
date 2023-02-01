function dateFormatter(date) {
    const dateArr = date.split('/')
    return dateArr[0] + "-" + dateArr[2] + "-" + dateArr[1]
}
export default dateFormatter
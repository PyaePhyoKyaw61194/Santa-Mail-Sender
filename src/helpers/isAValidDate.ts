const isValidDate = (date: string) => {
    let d = new Date(date);
    return !isNaN(d.getTime());
}

export default isValidDate

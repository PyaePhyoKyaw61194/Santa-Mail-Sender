const isNumber = (input) => {
    return !isNaN(parseFloat(input)) && isFinite(input);
}

export default isNumber
import isNumber from "../../src/helpers/isNumber"
describe("is a Number Test", () => {
    test("empty string", () => {
        expect(isNumber("")).toBe(false)
    })

    test("a string", () => {
        expect(isNumber("xx")).toBe(false)
    })

    test("string and number mix", () => {
        expect(isNumber("xx11")).toBe(false)
    })

    test("a float string", () => {
        expect(isNumber("10.11")).toBe(true)
    })

    test("a zero string", () => {
        expect(isNumber("0")).toBe(true)
    })

    test("a number string", () => {
        expect(isNumber("1994")).toBe(true)
    })
})
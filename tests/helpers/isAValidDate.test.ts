import isAValidDate from "../../src/helpers/isAValidDate"

describe("validate JS Date Object", () => {
    test("empty string", () => {
        expect(isAValidDate("")).toBe(false)
    })

    test("invalid format 1 (YYYY-DD-MM)", () => {
        expect(isAValidDate("1995-22-01")).toBe(false)
    })

    test("invalid format 2 (YYYY/DD/MM)", () => {
        expect(isAValidDate("1995/22/01")).toBe(false)
    })

    test("invalid format 3 ", () => {
        expect(isAValidDate("19")).toBe(false)
    })

    test("broken string", () => {
        expect(isAValidDate("asdada")).toBe(false)
    })

    test("broken string", () => {
        expect(isAValidDate("1994 1212")).toBe(false)
    })

    test("valid format (YYYY-MM-DD)", () => {
        expect(isAValidDate("1994-12-12")).toBe(true)
    })
})
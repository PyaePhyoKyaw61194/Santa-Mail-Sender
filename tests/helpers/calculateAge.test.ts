import calculateAge from '../../src/helpers/calculateAge'

describe('Age Calculator', () => {
    test('empty string', () => {
        expect(calculateAge("")).toBe(-1)
    })
    test('broken string test 1', () => {
        expect(calculateAge("1222-22")).toBe(-1)
    })
    test('broken string test 2', () => {
        expect(calculateAge("1222-22-ss")).toBe(-1)
    })
    test('broken string test 3', () => {
        expect(calculateAge("1994/11/22")).toBe(-1)
    })
    test('Invalid date format (YYYY-DD-MM)', () => {
        expect(calculateAge("1994-22-11")).toBe(-1)
    })
    test('Well formatted date 1', () => {
        expect(calculateAge("2017-05-12")).toBe(5)
    })
    test('Well formatted date 2', () => {
        expect(calculateAge("1987-01-01")).toBe(36)
    })
    test('Well formatted date 3', () => {
        expect(calculateAge("2010-01-23")).toBe(13)
    })
})
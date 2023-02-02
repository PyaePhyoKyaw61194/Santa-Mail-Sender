import dateFormatter from '../../src/helpers/dateFormatter'
describe('date Formatter', () => {
    test('empty string', () => {
        expect(dateFormatter("")).toBe(null);
    });
    test('broken string(two arg)', () => {
        expect(dateFormatter("12/22")).toBe(null);
    });
    test('broken string(three arg)', () => {
        expect(dateFormatter("12/22/22/22")).toBe(null);
    });
    test('not a number string', () => {
        expect(dateFormatter("YYYY/MM/DD")).toBe(null);
    });
    test('YYYY/MM/DD string', () => {
        const dateInYDM = "2018/11/23";
        expect(dateFormatter(dateInYDM)).toBe(null);
    });
    test('DD/MM/YYYY string', () => {
        const dateInYDM = "12/12/1995";
        expect(dateFormatter(dateInYDM)).toBe(null);
    });
    test('Well formatted YYYY/DD/MM string', () => {
        const dateInYDM = "2015/23/12";
        const dateSplit = dateInYDM.split("/");
        const desiredFormat = dateSplit[0] + "-" + dateSplit[2] + "-" + dateSplit[1]
        expect(dateFormatter(dateInYDM)).toBe(desiredFormat);
    });
});
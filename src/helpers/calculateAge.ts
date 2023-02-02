// Age calculation (bithdate must be YYYY-MM-DD format)
const calculateAge = (birthdate: string): number => {

    if (!birthdate ||
        /^\d{4}-\d{2}-\d{2}$/.test(birthdate) === false) {
        return -1
    }
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default calculateAge

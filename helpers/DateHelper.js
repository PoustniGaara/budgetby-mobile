export function getCurrentYearMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = (currentDate.getMonth() + 1).toString();
    return `${year}-${month}`;
}
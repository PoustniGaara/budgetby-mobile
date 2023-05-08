export function createSheet(id, date, userId, categories = [], total = 0,) {
    return {
        id,
        date,
        userId,
        categories,
        total
    };
}

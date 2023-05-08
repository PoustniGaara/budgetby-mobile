export function createCategory(id, name, color, sheetId, items = [], total = 0) {
    return {
        id,
        name,
        color,
        items,
        sheetId,
        total
    };
}

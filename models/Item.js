export function createItem(id, name, categoryId, purchases = [], total = 0) {
    return {
        id,
        name,
        purchases,
        categoryId,
        total,
    };
}

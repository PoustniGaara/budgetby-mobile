export function createPurchase(id, productName, amount, total, date, itemId, supplierId) {
    return {
        id,
        productName,
        amount,
        total,
        date,
        itemId,
        supplierId
    };
}

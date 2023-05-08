export async function transformDataFromNormalizedToObject(sheets, categories, items, purchases) {
    const transformedSheets = sheets.map(sheet => {
        const sheetCategories = categories.filter(category => category.sheetId === sheet.id);

        const transformedCategories = sheetCategories.map(category => {
            const categoryItems = items.filter(item => item.categoryId === category.id);

            const transformedItems = categoryItems.map(item => {
                const itemPurchases = purchases.filter(purchase => purchase.itemId === item.id);
                const itemTotal = itemPurchases.reduce((sum, purchase) => sum + purchase.total, 0);

                return {
                    ...item,
                    purchases: itemPurchases,
                    total: itemTotal,
                };
            });

            const categoryTotal = transformedItems.reduce((sum, item) => sum + item.total, 0);

            return {
                ...category,
                items: transformedItems,
                total: categoryTotal,
            };
        });

        const sheetTotal = transformedCategories.reduce((sum, category) => sum + category.total, 0);

        return {
            ...sheet,
            categories: transformedCategories,
            total: sheetTotal,
        };
    });

    return transformedSheets;
}
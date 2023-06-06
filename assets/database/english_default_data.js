import { createSheet } from "../../models/Sheet"
import { createCategory } from "../../models/Category";
import { createItem } from "../../models/Item";

export const getEnglishDefaultSheetData = async () => {
    //Format: Fri May 06 2023
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    return createSheet(null, dateString, 1);
};

export const getEnglishDefaultCategoriesData = async (sheetId) => {
    return categories = [
        {
            id: null,
            name: 'Food',
            color: '#2F7018',
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Household',
            color: '#0097CC',
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Other',
            color: '#DF9E55',
            sheetId: sheetId
        }
    ]
};

export const getEnglishDefaultItemsData = (categoryIds) => {
    let items = [];
    let foodId = categoryIds[0];
    let householdId = categoryIds[1];
    let otherId = categoryIds[2];

    items = [
        {
            id: null,
            name: 'Meat, Seafood',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Fruits, Vegetables',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Dairy, Eggs',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Bakery',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Ready Meals',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Beverages',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Alhcohol',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Condiments',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Snacks, Sweets',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Grains, Side Dishes',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Supplements',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Deli, Prepared Foods',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Cleaning Supplies',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Paper',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Home Decor',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Laundry Supplies',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Kitchen Supplies',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Home Maintenance',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Pet Supplies',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Gardening, Outdoor',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Personal Care',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Electronics',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Clothing',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Office, School Supplies',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Toys, Games',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Books, Magazines',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Automotive Products',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Sport, Leisure',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Medicine',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Tobacco, Nicotine',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Unclassified',
            categoryId: otherId
        },
    ]

    return items;
};
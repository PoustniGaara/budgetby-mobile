import { createSheet } from "../../models/Sheet"
import { createCategory } from "../../models/Category";
import { createItem } from "../../models/Item";

export const getSlovakDefaultSheetData = () => {
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    return createSheet(null, dateString, 1);
};

export const getSlovakDefaultCategoriesData = (sheetId) => {
    return categories = [
        {
            id: null,
            name: 'Potraviny',
            items: null,
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Domácnosť',
            items: null,
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Iné',
            items: null,
            sheetId: sheetId
        }
    ]
};

export const getSlovakDefaultItemsData = () => {
    createItem()
};
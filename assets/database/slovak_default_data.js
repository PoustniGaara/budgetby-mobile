import { createSheet } from "../../models/Sheet"
import { createCategory } from "../../models/Category";
import { createItem } from "../../models/Item";

export const getSlovakDefaultSheetData = async () => {
    //Format: Fri May 06 2023
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    return createSheet(null, dateString, 1);
};

export const getSlovakDefaultCategoriesData = async (sheetId) => {
    return categories = [
        {
            id: null,
            name: 'Potraviny',
            color: '#2F7018',
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Domácnosť',
            color: '#0097CC',
            sheetId: sheetId
        },
        {
            id: null,
            name: 'Ďalšie',
            color: '#DF9E55',
            sheetId: sheetId
        }
    ]
};

export const getSlovakDefaultItemsData = (categoryIds) => {
    let items = [];
    let foodId = categoryIds[0];
    let householdId = categoryIds[1];
    let otherId = categoryIds[2];

    items = [
        {
            id: null,
            name: 'Mäso, ryby ',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Ovocie, zelenina',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Mlieko, vajcia',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Pečivo',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Hotové jedlá',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Nápoje',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Alkohol',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Dochucovadlá',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Snacky, sladkosti',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Prílohy',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Doplnky stravy',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Ostatné',
            categoryId: foodId
        },
        {
            id: null,
            name: 'Čistiace potreby',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Papier',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Pracie potreby',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Kuchynské potreby',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Domáca údržba',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Zvieratá',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Záhrada, dvor',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Osobná hygiena',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Ostatné',
            categoryId: householdId
        },
        {
            id: null,
            name: 'Elektronika',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Oblečenie',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Pracovné, školské potreby',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Hry, hračky',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Knihy, časopisy',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Auto',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Šport, fitness',
            categoryId: otherId
        },
        {
            id: null,
            name: 'Ostatné',
            categoryId: otherId
        },
    ]

    return items;
};
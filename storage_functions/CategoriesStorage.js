import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'categories';

const defaultCategories = [
    {
        id: '1',
        name: 'Potraviny',
        color: '#2F7018',
        total: 0,
        subCategories: [
            {
                id: '1.1',
                name: 'Sub-category 1.1',
                color: 'orange',
                items: [],
            },
            {
                id: '1.2',
                name: 'Sub-category 1.2',
                color: 'yellow',
                items: [],
            },
        ],
    },
    {
        id: '2',
        name: 'Domácnosť',
        color: '#0097CC',
        total: 0,
    },
    {
        id: '3',
        name: 'Ďalšie',
        color: '#DF9E55',
        total: 0,
    }
    // Add more default categories if needed
];

export const getCategories = async () => {
    try {
        // Always store the default categories in AsyncStorage.
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
        const categories = await AsyncStorage.getItem(STORAGE_KEY);
        if (categories) {
            return JSON.parse(categories);
        } else {
            return defaultCategories;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return defaultCategories;
    }
};

// this is production version
// export const getCategories = async () => {
//     try {
//         const categories = await AsyncStorage.getItem(STORAGE_KEY);
//         if (categories) {
//             return JSON.parse(categories);
//         } else {
//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
//             return defaultCategories;
//         }
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return defaultCategories;
//     }
// };

export const addCategory = async (newCategory) => {
    try {
        const categories = await getCategories();
        categories.push(newCategory);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
        console.error('Error adding category:', error);
    }
};

export const updateCategory = async (updatedCategory) => {
    try {
        const categories = await getCategories();
        const index = categories.findIndex((category) => category.id === updatedCategory.id);
        if (index !== -1) {
            categories[index] = updatedCategory;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
        }
    } catch (error) {
        console.error('Error updating category:', error);
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const categories = await getCategories();
        const filteredCategories = categories.filter((category) => category.id !== categoryId);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCategories));
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

import * as SQLite from "expo-sqlite";
import { createCategory } from "../../models/Category";
import getDatabase from "./Database.js";

export function findAllCategoriesAsync() {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "SELECT * FROM Categories;",
                        [],
                        (_, result) => {
                            const categories = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                const row = result.rows.item(i);
                                const category = createCategory(row.category_id, row.category_name, row.category_color, row.category_sheet);
                                categories.push(category);
                            }
                            resolve(categories);
                        },
                        (_, error) => {
                            reject(error);
                        }
                    );
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}

export async function saveCategoriesAndGetIdsAsync(categories) {
    try {
        const db = await getDatabase();
        const savedCategoryIds = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const result = await new Promise((resolve, reject) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "INSERT INTO Categories (category_name, category_color, category_sheet) VALUES (?, ?, ?);",
                            [category.name, category.color, category.sheetId],
                            (_, result) => {
                                resolve(result);
                            },
                            (_, error) => {
                                reject(error);
                            }
                        );
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });

            savedCategoryIds.push(result.insertId);
        }

        return savedCategoryIds;
    } catch (error) {
        console.error("Error saving categories:", error);
        throw error;
    }
}

export const deleteAllCategoriesAsync = async () => {
    const deleteQuery = `DELETE FROM Categories`;

    return new Promise((resolve, reject) => {
        getDatabase()
            .then((db) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            deleteQuery,
                            [],
                            (_, results) => {
                                console.log('Deleted all categories from database');
                                resolve();
                            },
                            (_, error) => {
                                console.error('Error deleting categories:', error);
                                reject(error);
                            },
                        );
                    },
                    (error) => {
                        console.error('Error creating delete transaction:', error);
                        reject(error);
                    },
                );
            })
            .catch((error) => {
                console.error('Error getting database instance:', error);
                reject(error);
            });
    });
};



export function createCategoryTableAsync() {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Categories (category_id INTEGER NOT NULL UNIQUE, category_name TEXT NOT NULL, category_sheet INTEGER NOT NULL, FOREIGN KEY(category_sheet) REFERENCES Sheets(sheet_id), PRIMARY KEY(category_id AUTOINCREMENT));",
                    [],
                    () => {
                        resolve();
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export function isCategoryTableCreatedAsync() {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='Categories'",
                    [],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        }).catch((error) => {
            reject(error);
        });
    });
}






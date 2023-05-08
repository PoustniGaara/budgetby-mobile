import * as SQLite from "expo-sqlite";
import { createItem } from "../../models/Item";
import getDatabase from "./Database.js";

export const findAllItemsAsync = () => {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "SELECT * FROM Items;",
                        [],
                        (_, result) => {
                            const items = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                const row = result.rows.item(i);
                                const item = createItem(row.item_id, row.item_name, row.item_category);
                                items.push(item);
                            }
                            console.log(`Retrieved ${items.length} items from database`);
                            resolve(items);
                        },
                        (_, error) => {
                            console.error('Error selecting items:', error);
                            reject(error);
                        }
                    );
                },
                (error) => {
                    console.error('Error creating transaction for selecting items:', error);
                    reject(error);
                }
            );
        }).catch((error) => {
            console.error('Error getting database instance:', error);
            reject(error);
        });
    });
};


export async function saveItemsAndGetIdsAsync(items) {
    try {
        const db = await getDatabase();
        const savedItemIds = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const result = await new Promise((resolve, reject) => {
                db.transaction(
                    (tx) => {
                        tx.executeSql(
                            "INSERT INTO Items (item_name, item_category) VALUES (?, ?);",
                            [item.name, item.categoryId],
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

            savedItemIds.push(result.insertId);
        }

        return savedItemIds;
    } catch (error) {
        console.error("Error saving items:", error);
        throw error;
    }
}

export const deleteAllItemsAsync = async () => {
    const deleteQuery = `DELETE FROM Items`;

    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        deleteQuery,
                        [],
                        (_, results) => {
                            console.log('Deleted all items from database');
                            resolve();
                        },
                        (_, error) => {
                            console.error('Error deleting items:', error);
                            reject(error);
                        },
                    );
                },
                (error) => {
                    console.error('Error creating delete transaction:', error);
                    reject(error);
                },
            );
        }).catch((error) => {
            console.error('Error getting database instance:', error);
            reject(error);
        });
    });
};

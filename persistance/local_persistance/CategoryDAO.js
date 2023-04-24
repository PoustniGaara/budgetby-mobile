import * as SQLite from "expo-sqlite";
import { createCategory } from "../../models/Category";

const db = SQLite.openDatabase("budgetby_mobile.db");

export function createCategoryTableAsync() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);",
                    [],
                    () => {
                        resolve();
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
}

export function saveCategoriesAndGetIdsAsync(categories) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                const savedCategoryIds = [];
                const categoriesCount = categories.length;

                categories.forEach((category, index) => {
                    tx.executeSql(
                        "INSERT INTO categories (name, items, sheetId) VALUES (?, ?, ?);",
                        [category.name, category.items, category.sheetId],
                        (_, result) => {
                            savedCategoryIds.push(result.insertId);
                            if (index === categoriesCount - 1) {
                                resolve(savedCategoryIds);
                            }
                        },
                        (_, error) => {
                            reject(error);
                        }
                    );
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
}
import * as SQLite from "expo-sqlite";
import { createSheet } from "../../models/Sheet";

const db = SQLite.openDatabase("budgetby_mobile.db");

export function createSheetTableAsync() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);",
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

export function findById(id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "SELECT * FROM items WHERE id = ?;",
                    [id],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            const row = result.rows.item(0);
                            const item = createItem(row.id, row.name);
                            resolve(item);
                        } else {
                            resolve(null);
                        }
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

export function findAllSheetsAsync() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "SELECT * FROM Sheets;",
                    [],
                    (_, result) => {
                        const sheets = [];
                        for (let i = 0; i < result.rows.length; i++) {
                            const row = result.rows.item(i);
                            const item = createItem(row.id, row.name);
                            sheets.push(item);
                        }
                        resolve(sheets);
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

export const saveSheetAndGetIdAsync = async (db, sheet) => {
    const insertSheetQuery = `
      INSERT INTO sheets (date, userId)
      VALUES (?, ?);
    `;
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                insertSheetQuery,
                [sheet.date, sheet.userId],
                (_, results) => {
                    const insertId = results.insertId;
                    console.log('Sheet saved with ID:', insertId);
                    resolve(insertId);
                },
                (_, error) => {
                    console.error('Error saving sheet:', error);
                    reject(error);
                },
            );
        });
    });
};

export function update(item) {
    // ...
}

export function deleteItem(item) {
    // ...
}

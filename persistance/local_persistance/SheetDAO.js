import * as SQLite from "expo-sqlite";
import { createSheet } from "../../models/Sheet";
import getDatabase from "./Database.js";



export function findAllSheetsAsync() {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "SELECT * FROM Sheets;",
                        [],
                        (_, result) => {
                            const sheets = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                const row = result.rows.item(i);
                                const sheet = createSheet(row.sheet_id, row.sheet_date, row.sheet_user);
                                sheets.push(sheet);
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
    });
}

export function isTableCreatedAsync(tableName) {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        `SELECT name FROM sqlite_master WHERE type = 'table' AND name = '${tableName}'; `,
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
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}


export function createSheetTableAsync() {
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Sheets (sheet_id INTEGER NOT NULL UNIQUE, sheet_date TEXT NOT NULL, sheet_user INTEGER, PRIMARY KEY(sheet_id AUTOINCREMENT));",
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



export const saveSheetAndGetIdAsync = async (sheet) => {
    const insertSheetQuery = `
      INSERT INTO Sheets(sheet_date, sheet_user)
                            VALUES(?, ?);
                            `;
    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
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
                },
                (error) => {
                    console.error('Error creating sheet transaction:', error);
                    reject(error);
                },
            );
        }).catch((error) => {
            console.error('Error getting database instance:', error);
            reject(error);
        });
    });
};



export function update(item) {
    // ...
}

export function deleteItem(item) {
    // ...
}

//Function for development purposes
export const deleteAllSheetsAsync = async () => {
    const deleteQuery = `DELETE FROM Sheets`;

    return new Promise((resolve, reject) => {
        getDatabase().then((db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        deleteQuery,
                        [],
                        (_, results) => {
                            console.log('Deleted all sheets from database');
                            resolve();
                        },
                        (_, error) => {
                            console.error('Error deleting sheets:', error);
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

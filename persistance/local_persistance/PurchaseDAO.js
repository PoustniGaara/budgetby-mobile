import * as SQLite from "expo-sqlite";
import { createPurchase } from "../../models/Purchase";
import getDatabase from "./Database.js";

export const findAllPurchasesAsync = () => {
  return new Promise((resolve, reject) => {
    getDatabase().then((db) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM Purchases;",
            [],
            (_, result) => {
              const purchases = [];
              for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows.item(i);
                const purchase = createPurchase(row.purchase_id, row.purchase_product, row.purchase_amount, row.purchase_total, row.purchase_date, row.purchase_item, row.purchase_supplier);
                purchases.push(purchase);
              }
              console.log(`Retrieved ${purchases.length} purchases from database`);
              resolve(purchases);
            },
            (_, error) => {
              console.error('Error selecting purchases:', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Error creating transaction for selecting purchases:', error);
          reject(error);
        }
      );
    }).catch((error) => {
      console.error('Error getting database instance:', error);
      reject(error);
    });
  });
};


export async function savePurchasesAndGetIdsAsync(purchases) {
  try {
    const db = await getDatabase();
    const savedPurchaseIds = [];

    for (let i = 0; i < purchases.length; i++) {
      const purchase = purchases[i];
      const result = await new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "INSERT INTO Purchases (purchase_product, purchase_amount, purchase_total, purchase_date, purchase_item, purchase_supplier) VALUES (?, ?, ?, ?, ?, ?);",
              [purchase.productName, purchase.amount, purchase.total, purchase.date, purchase.itemId, purchase.supplierId],
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

      savedPurchaseIds.push(result.insertId);
    }
    return savedPurchaseIds;
  } catch (error) {
    console.error("Error saving purchases:", error);
    throw error;
  }
}

export async function savePurchaseAndGetIdAsync(purchase) {
  try {
    const db = await getDatabase();
    let savedPurchaseId;

    const result = await new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO Purchases (purchase_product, purchase_amount, purchase_total, purchase_date, purchase_item, purchase_supplier) VALUES (?, ?, ?, ?, ?, ?);",
            [purchase.productName, purchase.amount, purchase.total, purchase.date, purchase.itemId, purchase.supplierId],
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

    savedPurchaseId = result.insertId;

    return savedPurchaseId;
  } catch (error) {
    console.error("Error saving purchase:", error);
    throw error;
  }
}



export const deleteAllPurchasesAsync = async () => {
  const deleteQuery = `DELETE FROM Purchases`;

  return new Promise((resolve, reject) => {
    getDatabase().then((db) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            deleteQuery,
            [],
            (_, results) => {
              console.log('Deleted all purchases from database');
              resolve();
            },
            (_, error) => {
              console.error('Error deleting purchases:', error);
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

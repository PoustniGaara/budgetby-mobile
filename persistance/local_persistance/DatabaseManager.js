import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

import dbAsset from '../../assets/database/budgetby_mobile.db';
const dbName = 'budgetby';
let dbInstance = null;

export async function openDatabase(forceOverwrite = false) {
    return openAndCopyDatabase(dbAsset, forceOverwrite);
}

async function openAndCopyDatabase(dbAsset, forceOverwrite) {

    const localDbUri = FileSystem.documentDirectory + 'SQLite/' + dbName;
    const { exists } = await FileSystem.getInfoAsync(localDbUri);

    // Always make sure the 'SQLite' directory exists
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    // Close the SQLite database before deleting or overwriting it
    if (dbInstance) {
        dbInstance._db.close();
        dbInstance = null;
    }

    // Download and overwrite the existing database file if forceOverwrite is true or the file doesn't exist
    if (forceOverwrite || !exists) {
        const { uri: downloadUri } = await FileSystem.downloadAsync(
            Asset.fromModule(dbAsset).uri,
            localDbUri
        );
    }

    const newDb = SQLite.openDatabase(dbName);
    dbInstance = newDb;
    return newDb;
}



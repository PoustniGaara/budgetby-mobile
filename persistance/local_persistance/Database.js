import { openDatabase } from "./DatabaseManager";

export default function getDatabase() {
    return openDatabase();
}


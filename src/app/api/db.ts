import { open } from "sqlite";
import sqlite from "sqlite3";

export default async function openDatabase() {
    return await open({
        driver: sqlite.Database,
        filename: process.env.DATABASE_NAME!
    })
}
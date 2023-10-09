import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'Expenses';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'simple-control-gastos.db', location: 'default' });
};

export const createTable = async (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id TEXT PRIMARY KEY NOT NULL,
        description TEXT NOT NULL,
        amount FLOAT NOT NULL,
        date DATE NOT NULL,
        category TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getExpenses = async (db) => {
  try {
    const expenses = [];
    const getQuery = `SELECT id, description, amount, date, category FROM ${tableName}`
    const results = await db.executeSql(getQuery);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        expenses.push(result.rows.item(index))
      }
    });
    return expenses;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get items from Expenses !!!');
  }
};

export const addExpenese = async (db, expense) => {
  const insertQuery =
    `INSERT INTO ${tableName}(id, description, amount, date, category) values` +
      `('${expense.id}', '${expense.description}', '${expense.amount}', '${expense.date}', '${expense.category}')`

  return db.executeSql(insertQuery);
};

export const deleteExpense = async (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db) => {
  const query = `drop table ${tableName}`;
  await db.executeSql(query);
};
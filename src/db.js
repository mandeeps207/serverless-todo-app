import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed BOOLEAN)");
});

export const addTodo = (task, callback) => {
  db.run("INSERT INTO todos (task, completed) VALUES (?, ?)", [task, false], function(err) {
    if (err) {
      return console.error(err.message);
    }
    callback(this.lastID);
  });
};

export const getTodos = (callback) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

export const updateTodo = (id, completed, callback) => {
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    callback();
  });
};

export const deleteTodo = (id, callback) => {
  db.run("DELETE FROM todos WHERE id = ?", id, function(err) {
    if (err) {
      return console.error(err.message);
    }
    callback();
  });
};
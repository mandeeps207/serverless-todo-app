import { openDB } from 'idb';

const dbPromise = openDB('todo-db', 1, {
  upgrade(db) {
    db.createObjectStore('todos', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});

export const addTodo = async (task) => {
  const db = await dbPromise;
  const id = await db.add('todos', { task, completed: false });
  return id;
};

export const getTodos = async () => {
  const db = await dbPromise;
  return await db.getAll('todos');
};

export const updateTodo = async (id, completed) => {
  const db = await dbPromise;
  const tx = db.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const todo = await store.get(id);
  todo.completed = completed;
  await store.put(todo);
  await tx.done;
};

export const deleteTodo = async (id) => {
  const db = await dbPromise;
  await db.delete('todos', id);
};
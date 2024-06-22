import React, { useState, useEffect } from 'react';
import { addTodo, getTodos, updateTodo, deleteTodo } from './db';

const App = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (task.trim()) {
      const id = await addTodo(task);
      setTodos([...todos, { id, task, completed: false }]);
      setTask('');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    await updateTodo(id, !completed);
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-5">
        <h1 className="text-2xl font-bold mb-5">To-Do List</h1>
        <div className="flex mb-5">
          <input
            type="text"
            className="flex-grow p-2 border rounded mr-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
              />
              <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>{todo.task}</span>
              <button
                className="p-1 bg-red-500 text-white rounded"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
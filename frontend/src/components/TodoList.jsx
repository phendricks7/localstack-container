import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Constructing URL using current url instead of hardcoded http://localhost:5000.
  // So it works when opening on a different device in same wifi network.
  let baseUrl = `${window.location.protocol}//${window.location.hostname}`;
  
  if (window.location.port !== undefined) {
    baseUrl = `${baseUrl}:5000`;
  }

  useEffect(() => {
    axios.get(`${baseUrl}/api/todos`)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post(`${baseUrl}/api/todos`, { text: newTodo })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    axios.delete(`${baseUrl}/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <div>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

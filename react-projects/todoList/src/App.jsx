import { useState } from 'react';
import './App.css'
import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState('all');  // 'all' 'active' ''completed

  const filterTodos = todos.filter(todo => {
    console.log("Hello");
    
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className='app'>
      <header>
        <h1>My Todo App</h1>
        <p className='stats'>
          {stats.active} active / {stats.total} total
        </p>
      </header>

      <TodoForm onAdd={addTodo} />

      <div className='filters'>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <TodoList
        todos={filterTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

export default App

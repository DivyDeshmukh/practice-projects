import { useEffect, useState } from "react"

export const useTodos = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        const todo = {
            id: crypto.randomUUID(),
            text,
            complete: false,
            createdAt: Date.now()
        };

        setTodos((todos) => [...todos, todo]);
    };

    const toggleTodo = (todoId) => {
        setTodos((todos) => {
            return todos.map(todo => 
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            );
        });
    };

    const deleteTodo = (todoId) => {
        setTodos(todos => todos.filter(todo => todo.id !== todoId));
    };

    const editTodo = (todoId, newText) => {
        setTodos(todos => todos.map(todo => todo.id === todoId ? { ...todo, text: newText.trim() } : todo));
    };
    
    return { todos, addTodo, deleteTodo, editTodo, toggleTodo };
}
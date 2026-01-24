import { useState } from "react"

export const TodoForm = ({ onAdd }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onAdd(input);
            setInput('');
        }
    };

    return  (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo..."
                className="todo-input"
            />
            <button
                type="submit"
                className="btn-add"
            >   
                Add
            </button>
        </form>
    )
}
import { useState } from "react"

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(false);

    const handleEdit = () => {
        if (editText.trim() && editText !== todo.text) {
            onEdit(todo.id, editText);
        }
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="todo-checkbox"
            />

            {
                isEditing ? (
                    <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleEdit}
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                        autoFocus
                        className="todo-edit-input"    
                    />
                ) : (
                    <span
                        onDoubleClick={() => setEditText(true)}
                        className="todo-text"
                    >
                        {todo.text}
                    </span>
                )
            }

            <button
                onClick={() => onDelete(todo.id)}
                className="btn-Delete"
            >
                Delete
            </button>
        </div>
    )
}
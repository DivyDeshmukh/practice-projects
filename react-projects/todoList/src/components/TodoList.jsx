import { TodoItem } from "./TodoItem"

export const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    if (todos.length === 0) {
        return <p className="empty-state">No todos yet. Add one above!</p>
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    )
}
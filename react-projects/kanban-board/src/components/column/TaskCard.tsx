import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../context/type";
import DeleteTask from "./DeleteTask";

export default function TaskCard({ task, columnId }: { task: Task, columnId: string }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            className="task-card"
            ref={setNodeRef}
            {...attributes}
            style={style}
        >
            <span {...listeners} className="drag-handle cursor-grab">⠿</span>
            {task.title}
            <DeleteTask taskId={task.id} columnId={columnId} />
        </div>
    )
}

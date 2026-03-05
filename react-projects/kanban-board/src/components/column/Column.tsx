import { useDroppable } from "@dnd-kit/core";
import { useBoard } from "../../context/BoardContext";
import type { Column } from "../../context/type";
import ColumnHeader from "./ColumnHeader";
import TaskList from "./TaskList";

export default function Column({ column }: { column: Column }) {
    const { state } = useBoard();
    const { setNodeRef } = useDroppable({ id: column.id });

    const tasks = column.taskIds.map(
        (taskId: string) => state.tasks[taskId]
    );

    return (
        <div className="column" ref={setNodeRef}>
            <ColumnHeader title={column.title} />
            <TaskList tasks={tasks} columnId={column.id} /> 
        </div>
    )
}

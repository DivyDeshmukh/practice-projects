import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useBoard } from "../../context/BoardContext";
import Column from '../column/Column';
import BoardHeader from "./BoardHeader";
import type { DragEndEvent, DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { useState } from "react";
import type { Task } from "../../context/type";

export default function Board() {
    const { state, dispatch } = useBoard();
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    function findSourceAndDest(activeId: string, overId: string) {
        let sourceColumnId: string | null = null;
        let destColumnId: string | null = null;

        for (const columnId of state.columnOrder) {
            const column = state.columns[columnId];
            if (column.taskIds.includes(activeId)) sourceColumnId = columnId;
            if (column.taskIds.includes(overId) || columnId === overId) destColumnId = columnId;
        }

        return { sourceColumnId, destColumnId };
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveTask(state.tasks[event.active.id as string]);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const { sourceColumnId, destColumnId } = findSourceAndDest(
            active.id as string,
            over.id as string
        );

        if (!sourceColumnId || !destColumnId) return;
        if (sourceColumnId === destColumnId) return; // same column handled in dragEnd

        dispatch({
            type: "MOVE_TASK",
            payload: { activeId: active.id, overId: over.id }
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over || active.id === over.id) return;

        const { sourceColumnId, destColumnId } = findSourceAndDest(
            active.id as string,
            over.id as string
        );

        // cross-column already handled by onDragOver; only do same-column sort here
        if (sourceColumnId === destColumnId) {
            dispatch({
                type: "MOVE_TASK",
                payload: { activeId: active.id, overId: over.id }
            });
        }
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="board">
                <BoardHeader />
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    return <Column column={column} key={column.id} />;
                })}
            </div>
            <DragOverlay>
                {activeTask ? (
                    <div className="task-card" style={{ opacity: 0.8, cursor: 'grabbing' }}>
                        <span className="drag-handle">⠿</span>
                        {activeTask.title}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

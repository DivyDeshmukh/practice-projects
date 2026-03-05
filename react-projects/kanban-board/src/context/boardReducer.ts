import type { BoardAction, BoardState } from "./type";

export function boardReducer(
    state: BoardState,
    action: BoardAction,
): BoardState {
    switch (action.type) {
        case "ADD_TASK": {
            const { columnId, task } = action.payload;

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [task.id]: task
                },
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: [
                            ...state.columns[columnId].taskIds,
                            task.id
                        ]
                    }
                }
            }
        }

        case "DELETE_TASK": {
            const { columnId, taskId } = action.payload;

            const newTasks = { ...state.tasks }
            delete newTasks[taskId]

            return {
                ...state,
                tasks: newTasks,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: state.columns[columnId].taskIds.filter(
                            id => id !== taskId
                        )
                    }
                }
            }
        }
            
        case "MOVE_TASK": {
            const { activeId, overId } = action.payload;
            // overId is the id of the task that is currently being hovered over. It can be null if the task is being dragged over an empty area.

            let sourceColumnId: string | null = null;
            let destColumnId: string | null = null;

            for (const columnId of state.columnOrder) {
                const column = state.columns[columnId];

                if (column.taskIds.includes(activeId)) {
                    sourceColumnId = columnId;
                }

                if (column.taskIds.includes(overId)) {
                    destColumnId = columnId;
                }
            
                // overId may be a column id when dropping on an empty column
                if (columnId === overId) {
                    destColumnId = columnId;
                }
            }

            if (!sourceColumnId || !destColumnId) return state;

            const sourceColumn = state.columns[sourceColumnId];
            const destColumn = state.columns[destColumnId];

            const sourceIndex = sourceColumn.taskIds.indexOf(activeId);
            const destIndex = destColumn.taskIds.indexOf(overId);

            // remove from source
            const newSourceTaskIds = [...sourceColumn.taskIds];
            newSourceTaskIds.splice(sourceIndex, 1);

            // insert into destination
            const newDestTaskIds = sourceColumnId === destColumnId ? newSourceTaskIds : [...destColumn.taskIds];

            newDestTaskIds.splice(destIndex, 0, activeId);

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColumnId]: {
                        ...sourceColumn,
                        taskIds: newSourceTaskIds
                    },
                    [destColumnId]: {
                        ...destColumn,
                        taskIds: newDestTaskIds
                    }
                }
            };
        }

        default:
            return state
    }
}

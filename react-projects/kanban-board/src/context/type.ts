export type Task = {
    id: string;
    title: string;
    description: string;
}

export type Column = {
    id: string;
    title: string;
    taskIds: string[];
}

export type BoardState = {
    tasks: Record<string, Task>,
    columns: Record<string, Column>,
    columnOrder: string[]
}

export type BoardAction = 
    | { type: "ADD_TASK"; payload: { columnId: string; task: Task } }
    | { type: "DELETE_TASK"; payload: { columnId: string; taskId: string } }
    | { type: "MOVE_TASK"; payload: any }


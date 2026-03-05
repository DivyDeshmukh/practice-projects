import type { BoardState } from "./type";

export const initialState: BoardState = {
    tasks: {},
    columns: {
        todo: {
            id: "todo",
            title: "Todo",
            taskIds: []
        },
        inprogress: {
            id: "inprogress",
            title: "In Progress",
            taskIds: []
        },
        done: {
            id: "done",
            title: "Done",
            taskIds: []
        }
    },

    columnOrder: ["todo", "inprogress", "done"]
}

import { createContext, useContext, useReducer } from "react"
import type { BoardAction, BoardState } from "./type"
import { boardReducer } from "./boardReducer"
import { initialState } from "./initialState"

type BoardContextType = {
    state: BoardState
    dispatch: React.Dispatch<BoardAction>
}

const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(boardReducer, initialState);

    return (
        <BoardContext.Provider value={{ state, dispatch }}>
            { children }
        </BoardContext.Provider>
    )
}

export function useBoard() {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error("useBoard must be used within BoardProvider");
    }

    return context;
}
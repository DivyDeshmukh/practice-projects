import { useBoard } from "../../context/BoardContext";

export default function DeleteTask({ columnId, taskId }: { columnId: string, taskId: string }) {
    const { dispatch } = useBoard();

    function handleDelete() {
        dispatch({
            type: "DELETE_TASK",
            payload: {
                columnId,
                taskId: taskId
            }
        })
    }

    return <button className="btn btn-delete" onClick={() => handleDelete()}>✕</button>
}


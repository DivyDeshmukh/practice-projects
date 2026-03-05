import { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import { v4 as uuid } from "uuid";
import Input from "../ui/Input";

export default function AddTask() {
    const [title, setTitle] = useState <string>("");
    const [desc, setDesc] = useState<string>("");
    const [addTask, setAddTask] = useState<boolean>(false);
    const { dispatch } = useBoard();

    function handleAdd() {
        dispatch({
            type: "ADD_TASK",
            payload: {
                columnId: "todo",
                task: {
                    id: uuid(),
                    title,
                    description: desc
                }
            }
        });

        setTitle("");
        setDesc("");
        setAddTask(false);
    }

    return (
        addTask ? (
            <div className="add-task-panel">
                <div className="form-field">
                    <label htmlFor="title">Title</label>
                    <Input
                        id="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="desc">Description</label>
                    <Input
                        id="desc"
                        type="text"
                        value={desc}
                        required
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type="button" onClick={handleAdd}>Submit</button>
            </div>
        ): (
            <button className="btn btn-add" onClick={() => setAddTask(true)}>+ Add Task +</button>
        )
    )
}


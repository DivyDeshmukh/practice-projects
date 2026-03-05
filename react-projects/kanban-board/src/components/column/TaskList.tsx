import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Task } from "../../context/type"
import TaskCard from "./TaskCard"

const TaskList = ({ tasks, columnId }: { tasks: Task[], columnId: string }) => {

  const taskIds = tasks.map((task) => task.id);

  return (
    <SortableContext
      items={taskIds}
      strategy={verticalListSortingStrategy}
    >
      <div className="task-list">
        {
            tasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} columnId={columnId} />
            ))      
        }      
      </div>
    </SortableContext>
  )
}

export default TaskList
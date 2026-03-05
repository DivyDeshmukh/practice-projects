import AddTask from "../column/AddTask"

const BoardHeader = () => {
  return (
    <div className="w-screen min-h-15 flex justify-between items-center mb-4 border-b-2 border-gray-300">
      <h1>Board</h1>
      <AddTask />
    </div>
  )
}

export default BoardHeader
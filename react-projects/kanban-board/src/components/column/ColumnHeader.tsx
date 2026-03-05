const ColumnHeader = ({ title }: { title: string }) => {
  return (
    <div className="column-header">
        <h3>{title}</h3>
    </div>
  )
}

export default ColumnHeader
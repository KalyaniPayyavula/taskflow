type TaskCardProps = {
    title: string
    description: string
    date: string
    status: 'Pending' | 'Completed'
    onEdit: () => void
    onDelete: () => void
    onToggleStatus: () => void
  }
  
  function TaskCard({
    title,
    description,
    date,
    status,
    onEdit,
    onDelete,
    onToggleStatus,
  }: TaskCardProps) {
    return (
      <div className="task-card">
        <div className="task-card-content">
  
          <div className="task-card-info">
            <h3>{title}</h3>
  
            <p>{description}</p>
  
            <span className="task-date">
              📅 {date}
            </span>
          </div>
  
          <div className="task-card-right">
  
            <span className={`status ${status.toLowerCase()}`}>
              {status}
            </span>
  
            <div className="task-actions">
              <button onClick={onToggleStatus}>
                {status === 'Pending' ? 'Complete' : 'Undo'}
              </button>
  
              <button onClick={onEdit}>
                Edit
              </button>
  
              <button onClick={onDelete}>
                Delete
              </button>
            </div>
  
          </div>
        </div>
      </div>
    )
  }
  
  export default TaskCard
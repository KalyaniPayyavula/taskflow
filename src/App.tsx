import { useState } from 'react'
import TaskCard from './components/TaskCard'

type Task = {
  id: number
  title: string
  description: string
  date: string
  status: 'Pending' | 'Completed'
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Dropping kid to painting class',
      description: 'Take my kid to the painting class.',
      date: 'Today',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Doctor appointment',
      description: 'Take the kids to the doctor appointment.',
      date: 'Tomorrow',
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Grocery shopping',
      description: 'Buy groceries for the week.',
      date: 'Saturday',
      status: 'Pending',
    },
    {
      id: 4,
      title: 'Gift purchase for birthday party',
      description: 'Buy a birthday gift before the party.',
      date: 'Sunday',
      status: 'Pending',
    },
  ])

  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const handleSaveTask = () => {
    if (!taskName || !date) {
      return
    }

    if (editingTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: taskName,
                description,
                date,
              }
            : task
        )
      )
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: taskName,
        description,
        date,
        status: 'Pending',
      }

      setTasks([...tasks, newTask])
    }

    setTaskName('')
    setDescription('')
    setDate('')
    setEditingTaskId(null)
    setShowForm(false)
  }

  const handleEditTask = (task: Task) => {
    setTaskName(task.title)
    setDescription(task.description)
    setDate(task.date)
    setEditingTaskId(task.id)
    setShowForm(true)
  }

  const handleDeleteTask = (taskId: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (confirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId))
    }
  }

  const handleToggleStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'Pending' ? 'Completed' : 'Pending',
            }
          : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>TaskFlow</h1>
          <p>Plan your day, one task at a time.</p>
        </div>

        <button
          className="add-task-button"
          onClick={() => setShowForm(true)}
        >
          + Add Task
        </button>
      </header>

      {showForm && (
        <div className="task-form">
          <h2>
            {editingTaskId !== null ? 'Edit Task' : 'Add New Task'}
          </h2>

          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <div className="form-actions">
            <button
              onClick={() => {
                setShowForm(false)
                setEditingTaskId(null)
                setTaskName('')
                setDescription('')
                setDate('')
              }}
            >
              Cancel
            </button>

            <button onClick={handleSaveTask}>
              Save Task
            </button>
          </div>
        </div>
      )}

      <main className="main-content">
        <section className="welcome-section">
          <h2>My Tasks</h2>
          <p>Stay organized with your everyday tasks.</p>

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
          />
        </section>

        <section className="task-list">
         {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
           <TaskCard
           key={task.id}
           title={task.title}
          description={task.description}
          date={task.date}
          status={task.status}
          onEdit={() => handleEditTask(task)}
          onDelete={() => handleDeleteTask(task.id)}
          onToggleStatus={() => handleToggleStatus(task.id)}
         />
    ))
  ) : (
    <p className="no-tasks">
      No tasks found.
    </p>
  )}
</section>
      </main>
    </div>
  )
}

export default App
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() !== "" && newTaskDesc.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          description: newTaskDesc,
          isComplete: false,
        },
      ]);
      setNewTask("");
      setNewTaskDesc("");
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.isComplete;
    } else if (filter === "incomplete") {
      return !task.isComplete;
    }
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <div className="task-inputs">
        <input
          type="text"
          placeholder="Task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <textarea
          placeholder="Task description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        ></textarea>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filter-section">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.isComplete ? "completed" : ""}>
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleTaskStatus(task.id)}>
                {task.isComplete ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

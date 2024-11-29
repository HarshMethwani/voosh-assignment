import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Fetch tasks from backend
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "TODO" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Open Edit Modal
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  // Open View Modal
  const openViewModal = (task) => {
    setCurrentTask(task);
    setIsViewModalOpen(true);
  };

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
      toast.success("Tasks fetched successfully!");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        const response = await API.post("/tasks", newTask);
        setTasks([...tasks, response.data]);
        setNewTask({ title: "", description: "", status: "TODO" });
        setIsAddModalOpen(false);
        toast.success("Task added successfully!");
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task.");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task.");
      }
    }
  };

  // Update a task
  const handleEditTask = async () => {
    if (currentTask.title.trim() && currentTask.description.trim()) {
      try {
        const response = await API.put(`/tasks/${currentTask.id}`, currentTask);
        setTasks(tasks.map((task) => (task.id === response.data.id ? response.data : task)));
        setCurrentTask(null);
        setIsEditModalOpen(false);
        toast.success("Task updated successfully!");
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task.");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  // Filter tasks by status
  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <button className="add-task-btn" onClick={() => setIsAddModalOpen(true)}>
          Add Task
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => console.log("Search functionality not implemented yet")}
        />
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddTask} className="btn save-btn">
                Add
              </button>
              <button onClick={() => setIsAddModalOpen(false)} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && currentTask && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Task</h3>
            <input
              type="text"
              placeholder="Title"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            />
            <select
              value={currentTask.status}
              onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleEditTask} className="btn save-btn">
                Save
              </button>
              <button onClick={() => setIsEditModalOpen(false)} className="btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && currentTask && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Task Details</h3>
            <p>
              <strong>Title:</strong> {currentTask.title}
            </p>
            <p>
              <strong>Description:</strong> {currentTask.description}
            </p>
            <p>
              <strong>Status:</strong> {currentTask.status.replace("_", " ")}
            </p>
            <p>
              <strong>Created At:</strong> {currentTask.createdAt}
            </p>
            <div className="modal-actions">
              <button onClick={() => setIsViewModalOpen(false)} className="btn close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Columns */}
      <div className="tasks-columns">
        {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
          <div className="tasks-column" key={status}>
            <h3 className="column-title">{status.replace("_", " ")}</h3>
            {getTasksByStatus(status).map((task) => (
              <div className="task-card" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p className="created-at">Created at: {task.createdAt}</p>
                <div className="task-actions">
                  <button className="btn delete-btn" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                  <button className="btn edit-btn" onClick={() => openEditModal(task)}>
                    Edit
                  </button>
                  <button className="btn view-btn" onClick={() => openViewModal(task)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Tasks;

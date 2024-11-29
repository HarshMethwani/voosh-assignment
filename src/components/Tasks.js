// src/components/Tasks.js

import React, { useState, useEffect, useMemo } from "react";
import API from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Tasks.css";

const Tasks = ({ user }) => {
  // State variables
  const [tasks, setTasks] = useState([]); // All tasks from backend
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "TODO" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // New state variables for search and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

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
    const controller = new AbortController();

    const fetchTasks = async () => {
      if (!user?.token) return; // Skip if user is not logged in

      try {
        const response = await API.get("/tasks", {
          headers: { Authorization: `Bearer ${user.token}` },
          signal: controller.signal, // Attach abort signal
        });
        setTasks(response.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Task fetch aborted.");
        } else {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to fetch tasks.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    // Cleanup: Abort API call if component unmounts or user logs out
    return () => controller.abort();
  }, [user]);

  // Compute filtered and sorted tasks
  const filteredAndSortedTasks = useMemo(() => {
    // Filter tasks based on search query
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort tasks based on createdAt
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [tasks, searchQuery, sortOrder]);

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        const response = await API.post("/tasks", newTask, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks((prevTasks) => [...prevTasks, response.data]);
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
        await API.delete(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
        const response = await API.put(`/tasks/${currentTask.id}`, currentTask, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === response.data.id ? response.data : task))
        );
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
  const getTasksByStatus = (status) =>
    filteredAndSortedTasks.filter((task) => task.status === status);

  if (loading) {
    return <div>Loading tasks...</div>; // Show loading state
  }

  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <button className="add-task-btn" onClick={() => setIsAddModalOpen(true)}>
          Add Task
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Date: Oldest</option>
          <option value="desc">Sort by Date: Newest</option>
        </select>
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
              <strong>Created At:</strong> {new Date(currentTask.createdAt).toLocaleString()}
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
                <p className="created-at">
                  Created at: {new Date(task.createdAt).toLocaleString()}
                </p>
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

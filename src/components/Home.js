// components/Home.js
import React, { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import UpdateTaskForm from "./UpdateTaskForm"; // Import the new UpdateTaskForm component
import axios from "axios";
import "./TaskList.css";
import { toast } from "react-toastify";
import "./Home.css"

const Home = ({ searchQuery }) => {
  let id = sessionStorage.getItem("id");
  let uid = sessionStorage.getItem("id");

  const [tasks, setTasks] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null); // State to track the index of the task being updated

  const [sortOrder, setSortOrder] = useState("asc");

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleShowFullTitle = () => {
    setShowFullTitle(!showFullTitle);
  };

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const storedTasks = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/user/getTasks/${id}`
    );
    setTasks(res.data);
  };

  const handleAddTask = async (newTask) => {
    try {
      await axios.post("http://localhost:5000/api/user/addTask", {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        id,
      });
      toast.success("task added successfully");
    } catch (error) {}
    setTasks((prevTasks) => [...prevTasks, newTask]);
    storedTasks();
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        ...updatedTask,
        uid, // Ensure this variable contains the user's ID
      });

      await axios.put(
        `http://localhost:5000/api/user/updateTask/${taskId}`,
        body,
        config
      );
      toast.success("Task Updated Successfully");
      // Update local state to reflect the change
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );

      storedTasks();
      // Reset updateIndex to close the UpdateForm
      setUpdateIndex(null);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          UserId: uid, // Assuming uid is the variable holding the user's ID
        },
      };
      await axios
        .delete(`http://localhost:5000/api/user/deleteTask/${id}`, config)
        .then((res) => {
          toast.success(res.data.msg);
        });
      storedTasks();
    } catch (error) {
      toast.error(error);
    }
  };

  const sortByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    storedTasks();
  }, [id]);

  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  return (
    <>
      <button 
        className={`add-task-btn ${showAddTaskForm ? 'open' : ''}`} 
        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
      >
        <div className="plusb">+</div>
      </button>
      <div className={`add-task-form ${showAddTaskForm ? 'open' : ''}`}>
        {showAddTaskForm && <AddTaskForm onAddTask={handleAddTask} />}
      </div>

      <div className="task-list">
        <h2>Tasks</h2>
        <button
          className="btn btn-primary mb-2 ml-50"
          onClick={sortByDueDate}
        >
          Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
        <ul>
          {(searchQuery ? filteredTasks : tasks).map((task, index) => (
            <li key={index} className="task-item">
              <h3>
                {showFullTitle
                  ? task.title
                  : `${task.title.substring(0, 50)}${
                      task.title.length > 50 ? "..." : ""
                    }`}
                {!showFullTitle && task.title.length > 50 && (
                  <button
                    className="read-more-btn"
                    onClick={toggleShowFullTitle}
                  >
                    Read More
                  </button>
                )}
              </h3>
              <p>
                <strong>Description:</strong>{" "}
                {showFullDescription
                  ? task.description
                  : `${task.description.substring(0, 100)}${
                      task.description.length > 100 ? "..." : ""
                    }`}
                {!showFullDescription && task.description.length > 100 && (
                  <button
                    className="read-more-btn"
                    onClick={toggleShowFullDescription}
                  >
                    Read More
                  </button>
                )}
              </p>
              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>
              <button
                className="btnUpdate"
                onClick={() => setUpdateIndex(task._id)}
              >
                Update
              </button>{" "}
              <button
                className="btnDelete"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
              {updateIndex === task._id && (
                <UpdateTaskForm
                  task={task}
                  onUpdateTask={(updatedTask) =>
                    handleUpdateTask(task._id, updatedTask)
                  }
                  onCancel={() => setUpdateIndex(null)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;

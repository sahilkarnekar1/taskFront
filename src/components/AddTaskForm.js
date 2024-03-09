// frontend/src/components/AddTaskForm.js
import React, { useState } from 'react';
import './AddTaskForm.css'; // Adjust the path according to your file structure


const AddTaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const { title, description, dueDate } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Create new task object
    const newTask = { title, description, dueDate };
    // Call onAddTask function from parent component with new task data
    onAddTask(newTask);
    // Reset form data
    setFormData({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className='add-task-container'>
      <h2>Add Task</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button className='add-task-button' type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;

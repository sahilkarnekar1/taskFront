// frontend/src/components/UpdateTaskForm.js
import React, { useState } from 'react';
import './UpdateTaskForm.css'; // Import CSS for styling

const UpdateTaskForm = ({ task, onUpdateTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate
  });

  const { title, description, dueDate } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateTask({ ...formData });
  };

  return (
    <div className="update-form-container"> {/* Apply CSS class for centering */}
      <div className="update-form">
        <span className="close" onClick={onCancel}>&times;</span> {/* Close button */}
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Update</button>{' '}
          {/* Close button also calls onCancel when clicked */}
          <button type="button" className="cancel" onClick={onCancel}>Close</button> 
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;

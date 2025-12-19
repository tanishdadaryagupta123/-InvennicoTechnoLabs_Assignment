import { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status
  });
  const [loading, setLoading] = useState(false);

  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // Save edited task
  const handleSave = async () => {
    if (!editData.title.trim()) return;
    
    setLoading(true);
    try {
      await onUpdate(task._id, editData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle task status (quick action)
  const handleToggleStatus = async () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    setLoading(true);
    try {
      await onUpdate(task._id, { status: newStatus });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await onDelete(task._id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Edit Mode View
  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="edit-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              placeholder="Task title"
              maxLength="100"
              autoFocus
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editData.description}
              onChange={handleChange}
              placeholder="Task description (optional)"
              rows="2"
              maxLength="500"
            />
          </div>
          <div className="form-group">
            <select
              name="status"
              value={editData.status}
              onChange={handleChange}
            >
              <option value="pending">🕐 Pending</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>
          <div className="edit-actions">
            <button 
              onClick={handleCancel} 
              className="btn btn-secondary btn-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-success btn-sm"
              disabled={loading || !editData.title.trim()}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normal View
  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleToggleStatus}
          disabled={loading}
          id={`task-${task._id}`}
        />
        <label htmlFor={`task-${task._id}`}></label>
      </div>
      
      <div className="task-content">
        <div className="task-header">
          <h4 className={task.status === 'completed' ? 'completed' : ''}>
            {task.title}
          </h4>
          <span className={`status-badge ${task.status}`}>
            {task.status === 'pending' ? '🕐 Pending' : '✅ Completed'}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <p className="task-date">
          📅 Created: {formatDate(task.createdAt)}
        </p>
      </div>

      <div className="task-actions">
        <button 
          onClick={handleEdit} 
          className="btn btn-icon btn-edit"
          title="Edit task"
          disabled={loading}
        >
          ✏️
        </button>
        <button 
          onClick={handleDelete} 
          className="btn btn-icon btn-delete"
          title="Delete task"
          disabled={loading}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

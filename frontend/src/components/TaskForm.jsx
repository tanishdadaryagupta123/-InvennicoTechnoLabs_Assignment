import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onTaskAdded(formData);
      
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        status: 'pending'
      });
      setIsExpanded(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      status: 'pending'
    });
    setError('');
    setIsExpanded(false);
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h3>📝 Add New Task</h3>
        {!isExpanded && (
          <button 
            className="btn btn-expand"
            onClick={() => setIsExpanded(true)}
          >
            + New Task
          </button>
        )}
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="task-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              maxLength="100"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add some details about this task..."
              rows="3"
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Initial Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">🕐 Pending</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TaskForm;

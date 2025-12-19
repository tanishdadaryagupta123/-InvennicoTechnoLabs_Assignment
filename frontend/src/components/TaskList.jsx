import { useState, useEffect } from 'react';
import { taskAPI } from '../api/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskAPI.getAllTasks();
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (taskData) => {
    const response = await taskAPI.createTask(taskData);
    if (response.data.success) {
      setTasks([response.data.task, ...tasks]);
    }
  };

  // Update an existing task
  const handleUpdateTask = async (id, taskData) => {
    const response = await taskAPI.updateTask(id, taskData);
    if (response.data.success) {
      setTasks(tasks.map(task => 
        task._id === id ? response.data.task : task
      ));
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    const response = await taskAPI.deleteTask(id);
    if (response.data.success) {
      setTasks(tasks.filter(task => task._id !== id));
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Calculate task statistics
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  // Loading state
  if (loading) {
    return (
      <div className="task-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Add Task Form */}
      <TaskForm onTaskAdded={handleAddTask} />

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span>⚠️</span> {error}
          <button onClick={fetchTasks} className="retry-btn">Retry</button>
        </div>
      )}

      {/* Task Statistics */}
      <div className="task-stats">
        <div className="stat-card total">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
        <div className="stat-card pending">
          <span className="stat-icon">🕐</span>
          <div className="stat-info">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card completed">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="task-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks ({stats.total})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Task List */}
      <div className="tasks">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">
            <span className="no-tasks-icon">📝</span>
            <h3>No tasks found</h3>
            <p>
              {filter === 'all' 
                ? "You don't have any tasks yet. Create your first task above!"
                : `You don't have any ${filter} tasks.`
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;

import React from 'react';
import { CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import api from '../utils/api';
import './TaskCard.css';

export default function TaskCard({ task, fetchTasks, onEdit }) {
  const isCompleted = task.status === 'Completed';

  const toggleStatus = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { 
        status: isCompleted ? 'Pending' : 'Completed' 
      });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling status', err);
    }
  };

  const deleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task', err);
      }
    }
  };

  return (
    <div className={`task-card ${isCompleted ? 'completed' : 'pending'}`}>
      <div className="task-card-content">
        <button 
          onClick={toggleStatus}
          className="task-status-btn"
        >
          {isCompleted ? (
            <CheckCircle2 className="icon-completed" />
          ) : (
            <Circle className="icon-pending" />
          )}
        </button>
        
        <div className="task-details">
          <h4 className="task-title">
            {task.title}
          </h4>
          <p className="task-desc">
            {task.description}
          </p>
          <div className="task-meta">
            <span className="task-badge">
              {task.status}
            </span>
            <span className="task-meta-dot">•</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="task-actions">
          <button 
            onClick={() => onEdit(task)}
            className="action-btn edit-btn"
            title="Edit Task"
          >
            <Edit2 className="action-icon" />
          </button>
          <button 
            onClick={deleteTask}
            className="action-btn delete-btn"
            title="Delete Task"
          >
            <Trash2 className="action-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

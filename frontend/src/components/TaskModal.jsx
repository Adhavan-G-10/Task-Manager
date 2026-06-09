import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../utils/api';
import './TaskModal.css';

export default function TaskModal({ isOpen, onClose, task, fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (task) {
        await api.put(`/tasks/${task._id}`, { title, description });
      } else {
        await api.post('/tasks', { title, description });
      }
      fetchTasks();
      onClose();
    } catch (err) {
      console.error('Error saving task', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="task-modal-overlay">
      <div className="task-modal-content">
        <div className="task-modal-header">
          <h3 className="task-modal-title">
            {task ? 'Edit Task' : 'New Task'}
          </h3>
          <button onClick={onClose} className="task-modal-close">
            <X className="task-modal-close-icon" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-modal-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              required
              rows={4}
              className="form-input form-textarea"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="task-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

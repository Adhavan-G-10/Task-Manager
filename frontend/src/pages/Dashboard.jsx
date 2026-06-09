import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Plus, Search, Filter, Sun, Moon } from 'lucide-react';
import api from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Bonus features state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks', {
        params: {
          search,
          status: statusFilter,
          page,
          limit: 6 // 6 items per page for a nice grid
        }
      });
      setTasks(data.tasks);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="dashboard-logo">
            <h1 className="logo-text">Task Manager</h1>
          </div>
          <div className="header-actions">
            <span className="user-greeting">
              Hello, {user?.name}
            </span>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
            </button>
            <button 
              onClick={logout}
              className="logout-btn"
            >
              <LogOut className="icon logout-icon" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="filters-group">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="control-input search-input"
              />
              <Search className="icon search-icon" />
            </div>
            <div className="filter-box">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="control-input filter-select"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <Filter className="icon filter-icon" />
            </div>
          </div>
          
          <button 
            onClick={handleAddNew}
            className="new-task-btn"
          >
            <Plus className="icon" />
            New Task
          </button>
        </div>

        {/* Tasks Grid */}
        {tasks.length > 0 ? (
          <div className="tasks-grid">
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                fetchTasks={fetchTasks} 
                onEdit={handleEdit} 
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search className="icon" />
            </div>
            <h3 className="empty-state-title">No tasks found</h3>
            <p className="empty-state-desc">Get started by creating a new task.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-text">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={editingTask}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}

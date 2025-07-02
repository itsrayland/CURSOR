/**
 * Tasker - A simple task management application with theming support
 */
class Tasker {
  constructor() {
    this.tasks = [];
    this.currentFilter = 'all';
    this.taskIdCounter = 1;
    this.styleCoordinator = new StyleCoordinator();
    
    this.init();
  }

  /**
   * Initialize the tasker application
   */
  init() {
    this.loadTasks();
    this.styleCoordinator.init();
    this.setupEventListeners();
    this.updateStats();
    this.renderTasks();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Task form submission
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addTask();
      });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setFilter(e.target.dataset.filter);
      });
    });

    // Theme change listener
    this.styleCoordinator.onThemeChange(() => {
      this.updateThemeUI();
    });
  }

  /**
   * Add a new task
   */
  addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const task = {
      id: this.taskIdCounter++,
      text: taskText,
      priority: prioritySelect.value,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();

    // Clear form
    taskInput.value = '';
    taskInput.focus();
  }

  /**
   * Toggle task completion
   */
  toggleTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
    }
  }

  /**
   * Delete a task
   */
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
  }

  /**
   * Set filter
   */
  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    this.renderTasks();
  }

  /**
   * Get filtered tasks
   */
  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      case 'high':
        return this.tasks.filter(t => t.priority === 'high');
      case 'medium':
        return this.tasks.filter(t => t.priority === 'medium');
      case 'low':
        return this.tasks.filter(t => t.priority === 'low');
      default:
        return this.tasks;
    }
  }

  /**
   * Render tasks
   */
  renderTasks() {
    const taskList = document.getElementById('task-list');
    const filteredTasks = this.getFilteredTasks();
    
    if (filteredTasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <h3>No tasks found</h3>
          <p>Create a new task to get started!</p>
        </div>
      `;
      return;
    }

    taskList.innerHTML = filteredTasks
      .sort((a, b) => {
        // Sort by completion status and creation date
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .map(task => this.createTaskHTML(task))
      .join('');

    // Add event listeners to task items
    this.attachTaskEventListeners();
  }

  /**
   * Create task HTML
   */
  createTaskHTML(task) {
    const createdDate = new Date(task.createdAt).toLocaleDateString();
    const completedDate = task.completedAt ? 
      new Date(task.completedAt).toLocaleDateString() : '';

    return `
      <div class="task-item" data-task-id="${task.id}">
        <input type="checkbox" 
               class="task-checkbox" 
               ${task.completed ? 'checked' : ''}
               data-task-id="${task.id}">
        <div class="task-content">
          <div class="task-text ${task.completed ? 'completed' : ''}">
            ${this.escapeHtml(task.text)}
          </div>
          <div class="task-meta">
            <span class="priority-badge priority-${task.priority}">
              ${task.priority}
            </span>
            <span>Created: ${createdDate}</span>
            ${completedDate ? `<span>Completed: ${completedDate}</span>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="btn btn-danger btn-small delete-btn" 
                  data-task-id="${task.id}">
            Delete
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to task items
   */
  attachTaskEventListeners() {
    // Checkbox listeners
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const taskId = parseInt(e.target.dataset.taskId);
        this.toggleTask(taskId);
      });
    });

    // Delete button listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = parseInt(e.target.dataset.taskId);
        if (confirm('Are you sure you want to delete this task?')) {
          this.deleteTask(taskId);
        }
      });
    });
  }

  /**
   * Update statistics
   */
  updateStats() {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? 
      Math.round((completedTasks / totalTasks) * 100) : 0;

    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('active-tasks').textContent = activeTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('completion-rate').textContent = completionRate + '%';
  }

  /**
   * Update theme UI
   */
  updateThemeUI() {
    // Theme-specific UI updates can go here
    console.log('Theme updated to:', this.styleCoordinator.currentTheme);
  }

  /**
   * Save tasks to localStorage
   */
  saveTasks() {
    localStorage.setItem('tasker-tasks', JSON.stringify(this.tasks));
  }

  /**
   * Load tasks from localStorage
   */
  loadTasks() {
    const saved = localStorage.getItem('tasker-tasks');
    if (saved) {
      try {
        this.tasks = JSON.parse(saved);
        // Update task ID counter
        if (this.tasks.length > 0) {
          this.taskIdCounter = Math.max(...this.tasks.map(t => t.id)) + 1;
        }
      } catch (e) {
        console.error('Error loading tasks:', e);
        this.tasks = [];
      }
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Export tasks
   */
  exportTasks() {
    const dataStr = JSON.stringify(this.tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  /**
   * Import tasks
   */
  importTasks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        this.tasks = [...this.tasks, ...importedTasks];
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        alert('Tasks imported successfully!');
      } catch (error) {
        alert('Error importing tasks. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.tasker = new Tasker();
});
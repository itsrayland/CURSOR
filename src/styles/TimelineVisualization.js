/**
 * TimelineVisualization - A dynamic timeline component with running time and project/task rows
 */
class TimelineVisualization {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      // Time settings
      timeScale: 'minutes', // 'seconds', 'minutes', 'hours', 'days'
      timeSpan: 60, // How many time units to show
      updateInterval: 1000, // Update frequency in milliseconds
      autoScroll: true, // Auto-scroll to current time
      
      // Visual settings
      rowHeight: 60,
      timelineHeight: 40,
      markerInterval: 5, // Show time markers every N units
      
      // Animation settings
      animationDuration: 300,
      smoothScrolling: true,
      
      // Data
      items: [],
      
      ...options
    };
    
    this.currentTime = new Date();
    this.startTime = new Date(this.currentTime.getTime() - (this.options.timeSpan * this.getTimeUnitMs() / 2));
    this.endTime = new Date(this.startTime.getTime() + (this.options.timeSpan * this.getTimeUnitMs()));
    
    this.isRunning = false;
    this.animationFrame = null;
    this.lastUpdate = 0;
    
    this.init();
  }
  
  /**
   * Initialize the timeline visualization
   */
  init() {
    if (!this.container) {
      console.error('TimelineVisualization: Container not found');
      return;
    }
    
    this.createStructure();
    this.createTimeScale();
    this.createRows();
    this.setupEventListeners();
    this.start();
  }
  
  /**
   * Create the basic HTML structure
   */
  createStructure() {
    this.container.className = 'timeline-container';
    this.container.innerHTML = `
      <div class="timeline-header">
        <div class="timeline-controls">
          <button class="timeline-btn" id="playPause">⏸️</button>
          <button class="timeline-btn" id="reset">🔄</button>
          <select class="timeline-select" id="timeScale">
            <option value="seconds">Seconds</option>
            <option value="minutes" selected>Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
          <span class="timeline-time-display" id="currentTimeDisplay"></span>
        </div>
      </div>
      <div class="timeline-viewport">
        <div class="timeline-scale" id="timelineScale"></div>
        <div class="timeline-content" id="timelineContent">
          <div class="timeline-current-time-indicator" id="currentTimeIndicator"></div>
        </div>
      </div>
    `;
    
    this.viewport = this.container.querySelector('.timeline-viewport');
    this.scaleElement = this.container.querySelector('.timeline-scale');
    this.contentElement = this.container.querySelector('.timeline-content');
    this.currentTimeIndicator = this.container.querySelector('.timeline-current-time-indicator');
    this.timeDisplay = this.container.querySelector('#currentTimeDisplay');
  }
  
  /**
   * Create the time scale/ruler
   */
  createTimeScale() {
    const scaleWidth = this.getTimelineWidth();
    this.scaleElement.style.width = `${scaleWidth}px`;
    this.scaleElement.innerHTML = '';
    
    const timeUnit = this.getTimeUnitMs();
    const totalDuration = this.endTime - this.startTime;
    const pixelsPerMs = scaleWidth / totalDuration;
    
    // Create time markers
    for (let i = 0; i <= this.options.timeSpan; i += this.options.markerInterval) {
      const markerTime = new Date(this.startTime.getTime() + (i * timeUnit));
      const markerPosition = (markerTime - this.startTime) * pixelsPerMs;
      
      const marker = document.createElement('div');
      marker.className = 'timeline-marker';
      marker.style.left = `${markerPosition}px`;
      
      const label = document.createElement('span');
      label.className = 'timeline-marker-label';
      label.textContent = this.formatTime(markerTime);
      marker.appendChild(label);
      
      this.scaleElement.appendChild(marker);
    }
  }
  
  /**
   * Create timeline rows for items
   */
  createRows() {
    const existingRows = this.contentElement.querySelectorAll('.timeline-row');
    existingRows.forEach(row => row.remove());
    
    this.options.items.forEach((item, index) => {
      const row = this.createRow(item, index);
      this.contentElement.appendChild(row);
    });
    
    // Update content width
    const scaleWidth = this.getTimelineWidth();
    this.contentElement.style.width = `${scaleWidth}px`;
  }
  
  /**
   * Create a single timeline row
   */
  createRow(item, index) {
    const row = document.createElement('div');
    row.className = 'timeline-row';
    row.style.height = `${this.options.rowHeight}px`;
    row.dataset.itemId = item.id || index;
    
    // Row label
    const label = document.createElement('div');
    label.className = 'timeline-row-label';
    label.textContent = item.name || `Item ${index + 1}`;
    row.appendChild(label);
    
    // Row content area
    const content = document.createElement('div');
    content.className = 'timeline-row-content';
    
    // Create timeline items/bars for this row
    if (item.events) {
      item.events.forEach(event => {
        const eventElement = this.createEventElement(event);
        content.appendChild(eventElement);
      });
    }
    
    row.appendChild(content);
    return row;
  }
  
  /**
   * Create an event element (timeline bar/point)
   */
  createEventElement(event) {
    const element = document.createElement('div');
    element.className = `timeline-event timeline-event-${event.type || 'default'}`;
    
    const startTime = new Date(event.startTime);
    const endTime = event.endTime ? new Date(event.endTime) : null;
    
    const scaleWidth = this.getTimelineWidth();
    const totalDuration = this.endTime - this.startTime;
    const pixelsPerMs = scaleWidth / totalDuration;
    
    const leftPosition = Math.max(0, (startTime - this.startTime) * pixelsPerMs);
    element.style.left = `${leftPosition}px`;
    
    if (endTime) {
      // Duration event (bar)
      const width = Math.max(2, (endTime - startTime) * pixelsPerMs);
      element.style.width = `${width}px`;
      element.classList.add('timeline-event-duration');
    } else {
      // Point event
      element.style.width = '3px';
      element.classList.add('timeline-event-point');
    }
    
    // Event content
    const content = document.createElement('div');
    content.className = 'timeline-event-content';
    content.textContent = event.title || 'Event';
    element.appendChild(content);
    
    // Tooltip
    element.title = `${event.title || 'Event'}\nStart: ${this.formatTime(startTime)}${endTime ? `\nEnd: ${this.formatTime(endTime)}` : ''}`;
    
    return element;
  }
  
  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Play/Pause button
    const playPauseBtn = this.container.querySelector('#playPause');
    playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    
    // Reset button
    const resetBtn = this.container.querySelector('#reset');
    resetBtn.addEventListener('click', () => this.reset());
    
    // Time scale selector
    const timeScaleSelect = this.container.querySelector('#timeScale');
    timeScaleSelect.addEventListener('change', (e) => {
      this.options.timeScale = e.target.value;
      this.updateTimeScale();
    });
    
    // Viewport scrolling
    this.viewport.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        // Zoom with Ctrl+scroll
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        this.zoom(zoomFactor);
      }
    });
  }
  
  /**
   * Start the timeline animation
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastUpdate = performance.now();
    this.animate();
    
    const playPauseBtn = this.container.querySelector('#playPause');
    playPauseBtn.textContent = '⏸️';
  }
  
  /**
   * Stop the timeline animation
   */
  stop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    const playPauseBtn = this.container.querySelector('#playPause');
    playPauseBtn.textContent = '▶️';
  }
  
  /**
   * Toggle play/pause
   */
  togglePlayPause() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }
  
  /**
   * Reset timeline to current time
   */
  reset() {
    this.currentTime = new Date();
    this.startTime = new Date(this.currentTime.getTime() - (this.options.timeSpan * this.getTimeUnitMs() / 2));
    this.endTime = new Date(this.startTime.getTime() + (this.options.timeSpan * this.getTimeUnitMs()));
    
    this.createTimeScale();
    this.createRows();
    this.updateCurrentTimeIndicator();
  }
  
  /**
   * Animation loop
   */
  animate() {
    if (!this.isRunning) return;
    
    const now = performance.now();
    const deltaTime = now - this.lastUpdate;
    
    if (deltaTime >= this.options.updateInterval) {
      this.currentTime = new Date();
      this.updateCurrentTimeIndicator();
      this.updateTimeDisplay();
      
      // Auto-scroll to keep current time in view
      if (this.options.autoScroll) {
        this.scrollToCurrentTime();
      }
      
      this.lastUpdate = now;
    }
    
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Update the current time indicator position
   */
  updateCurrentTimeIndicator() {
    const scaleWidth = this.getTimelineWidth();
    const totalDuration = this.endTime - this.startTime;
    const pixelsPerMs = scaleWidth / totalDuration;
    
    const currentPosition = (this.currentTime - this.startTime) * pixelsPerMs;
    this.currentTimeIndicator.style.left = `${currentPosition}px`;
    
    // Update visibility based on whether current time is in view
    const isVisible = currentPosition >= 0 && currentPosition <= scaleWidth;
    this.currentTimeIndicator.style.opacity = isVisible ? '1' : '0.3';
  }
  
  /**
   * Update the time display
   */
  updateTimeDisplay() {
    this.timeDisplay.textContent = this.formatTime(this.currentTime);
  }
  
  /**
   * Scroll to keep current time in view
   */
  scrollToCurrentTime() {
    const scaleWidth = this.getTimelineWidth();
    const totalDuration = this.endTime - this.startTime;
    const pixelsPerMs = scaleWidth / totalDuration;
    
    const currentPosition = (this.currentTime - this.startTime) * pixelsPerMs;
    const viewportWidth = this.viewport.clientWidth;
    
    // If current time is outside the visible area, adjust the time window
    if (currentPosition < 0 || currentPosition > viewportWidth) {
      const newStartTime = new Date(this.currentTime.getTime() - (this.options.timeSpan * this.getTimeUnitMs() / 2));
      const newEndTime = new Date(newStartTime.getTime() + (this.options.timeSpan * this.getTimeUnitMs()));
      
      this.startTime = newStartTime;
      this.endTime = newEndTime;
      
      this.createTimeScale();
      this.createRows();
    }
  }
  
  /**
   * Update time scale when changed
   */
  updateTimeScale() {
    this.reset();
  }
  
  /**
   * Zoom the timeline
   */
  zoom(factor) {
    const newTimeSpan = Math.max(5, Math.min(1440, this.options.timeSpan / factor));
    this.options.timeSpan = newTimeSpan;
    
    const centerTime = new Date(this.startTime.getTime() + (this.endTime - this.startTime) / 2);
    this.startTime = new Date(centerTime.getTime() - (newTimeSpan * this.getTimeUnitMs() / 2));
    this.endTime = new Date(this.startTime.getTime() + (newTimeSpan * this.getTimeUnitMs()));
    
    this.createTimeScale();
    this.createRows();
    this.updateCurrentTimeIndicator();
  }
  
  /**
   * Get timeline width in pixels
   */
  getTimelineWidth() {
    return Math.max(800, this.viewport.clientWidth * 2);
  }
  
  /**
   * Get time unit in milliseconds
   */
  getTimeUnitMs() {
    switch (this.options.timeScale) {
      case 'seconds': return 1000;
      case 'minutes': return 60 * 1000;
      case 'hours': return 60 * 60 * 1000;
      case 'days': return 24 * 60 * 60 * 1000;
      default: return 60 * 1000;
    }
  }
  
  /**
   * Format time for display
   */
  formatTime(date) {
    switch (this.options.timeScale) {
      case 'seconds':
        return date.toLocaleTimeString();
      case 'minutes':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'hours':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'days':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  
  /**
   * Add new timeline item
   */
  addItem(item) {
    this.options.items.push(item);
    this.createRows();
  }
  
  /**
   * Remove timeline item
   */
  removeItem(itemId) {
    this.options.items = this.options.items.filter(item => (item.id || item.name) !== itemId);
    this.createRows();
  }
  
  /**
   * Update timeline item
   */
  updateItem(itemId, updates) {
    const item = this.options.items.find(item => (item.id || item.name) === itemId);
    if (item) {
      Object.assign(item, updates);
      this.createRows();
    }
  }
  
  /**
   * Destroy the timeline
   */
  destroy() {
    this.stop();
    if (this.container) {
      this.container.innerHTML = '';
      this.container.className = '';
    }
  }
}

// Export for use in other modules
export default TimelineVisualization;
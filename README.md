# Tasker - Dynamic Task Management Application

A modern task management application with dynamic theming capabilities, built with vanilla JavaScript and a custom StyleCoordinator system.

## Features

- **Task Management**
  - Create, complete, and delete tasks
  - Set priority levels (High, Medium, Low)
  - Track creation and completion dates
  - Real-time statistics (total, active, completed, completion rate)

- **Dynamic Theming**
  - Multiple built-in themes (Light, Dark, Ocean)
  - Smooth theme transitions
  - Theme persistence across sessions
  - Easy custom theme creation

- **Filtering System**
  - Filter by status (All, Active, Completed)
  - Filter by priority level
  - Instant filter switching

- **Modern UI/UX**
  - Responsive design for all devices
  - Smooth animations and transitions
  - Clean, intuitive interface
  - Accessibility considerations

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd CURSOR
```

2. Open the application:
```bash
# Open the index.html file in your browser
open example/index.html
# Or use a local server
python -m http.server 8000
```

Then navigate to `http://localhost:8000/example/`

### Usage

1. **Adding Tasks**: Type your task in the input field, select a priority, and click "Add Task"
2. **Completing Tasks**: Click the checkbox next to any task to mark it as complete
3. **Deleting Tasks**: Click the "Delete" button on any task to remove it
4. **Filtering**: Use the filter buttons to view specific task categories
5. **Changing Themes**: Use the theme selector in the header to switch themes

## Project Structure

```
CURSOR/
├── docs/
│   └── STYLE_COORDINATOR_GUIDE.md    # StyleCoordinator documentation
├── example/
│   └── index.html                    # Main application HTML
├── src/
│   ├── styles/
│   │   ├── base.css                  # Base styles with CSS variables
│   │   ├── config.js                 # Style configuration
│   │   └── StyleCoordinator.js       # Theme management system
│   └── tasker.js                     # Main application logic
└── README.md                         # This file
```

## Architecture

### StyleCoordinator
The heart of the theming system. Manages theme switching, persistence, and CSS custom properties.

```javascript
const styleCoordinator = new StyleCoordinator();
styleCoordinator.init();
styleCoordinator.applyTheme('dark');
```

### Tasker
Main application class handling task management, filtering, and UI updates.

```javascript
const tasker = new Tasker();
// Automatically initializes on page load
```

## Customization

### Adding Custom Themes

1. In `StyleCoordinator.js`, add to the themes object:
```javascript
purple: {
  name: 'Purple Theme',
  primary: '#6c5ce7',
  secondary: '#a29bfe',
  background: '#f5f3ff',
  // ... other colors
}
```

2. Add the option to the theme selector:
```html
<option value="purple">Purple</option>
```

### Modifying Styles

All styles use CSS custom properties defined in `base.css`. Modify these for global changes:

```css
:root {
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
  --transition-normal: 300ms ease-in-out;
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Technologies Used

- Vanilla JavaScript (ES6+)
- CSS3 with Custom Properties
- LocalStorage API
- No external dependencies

## Development

### Adding Features

1. Extend the `Tasker` class in `src/tasker.js`
2. Add corresponding UI elements in `example/index.html`
3. Style new elements using CSS variables in `src/styles/base.css`

### Testing Themes

1. Open the browser console
2. Access the tasker instance: `window.tasker`
3. Test theme functions:
```javascript
tasker.styleCoordinator.applyTheme('ocean');
tasker.styleCoordinator.getCurrentTheme();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 
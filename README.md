# Style Coordinator

A comprehensive styling system for modern web applications that provides theme management, responsive design utilities, component styling, and dynamic CSS coordination.

## Features

- 🎨 **Theme Management**: Built-in light/dark themes with custom theme support
- 📱 **Responsive Design**: Automatic breakpoint detection and responsive utilities
- 🧩 **Component System**: Pre-built component styles and dynamic styling
- ⚡ **Utility Classes**: Auto-generated utility classes for rapid development
- 🎬 **Animations**: Built-in animation utilities and Web Animations API integration
- 🔧 **Configuration**: Highly customizable with comprehensive configuration options
- 🎯 **Type-Safe**: Modern JavaScript with excellent IDE support

## Quick Start

```html
<!-- Include the base styles -->
<link rel="stylesheet" href="src/styles/base.css">

<!-- Initialize the Style Coordinator -->
<script type="module">
  import { styleCoordinator } from './src/styles/StyleCoordinator.js';
  
  // Generate utility classes
  styleCoordinator.generateUtilityClasses();
  
  // Toggle theme
  document.getElementById('themeToggle').addEventListener('click', () => {
    styleCoordinator.toggleTheme();
  });
</script>
```

## Demo

Open `example/index.html` in your browser to see the Style Coordinator in action with:
- Live theme switching
- Component examples
- Responsive design
- Animation demos
- Utility class examples

## Documentation

See the [complete documentation](docs/STYLE_COORDINATOR_GUIDE.md) for detailed usage instructions, API reference, and examples.

## Project Structure

```
├── src/
│   └── styles/
│       ├── StyleCoordinator.js    # Main Style Coordinator class
│       ├── base.css              # Base styles and CSS reset
│       └── config.js             # Configuration options
├── example/
│   └── index.html               # Demo page
├── docs/
│   └── STYLE_COORDINATOR_GUIDE.md # Complete documentation
└── README.md
```

## Key Components

### StyleCoordinator Class
The main class that manages themes, responsive design, animations, and dynamic styling.

### Base CSS
Modern CSS reset with utility classes, component styles, and responsive design patterns.

### Configuration System
Comprehensive configuration options for themes, breakpoints, animations, and component presets.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the demo page
5. Submit a pull request

## License

MIT License 
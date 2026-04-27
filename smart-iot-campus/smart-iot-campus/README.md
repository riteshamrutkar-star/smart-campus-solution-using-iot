# Smart IoT Campus Solution

A comprehensive IoT-based campus management system that provides real-time monitoring and control of various campus facilities including energy management, room automation, security systems, and analytics.

## Features

### 🏢 Campus Dashboard
- Real-time monitoring of campus statistics
- Live people count and occupancy tracking
- Energy consumption overview
- Temperature monitoring
- Security status display

### ⚡ Energy Management
- Building-wise energy consumption tracking
- Real-time energy meters
- Usage analytics and insights
- Automated energy optimization suggestions

### 🏠 Smart Room Management
- Remote control of room lighting
- Air conditioning control
- Projector and equipment management
- Room occupancy tracking
- Availability status display

### 🔒 Security Monitoring
- Access control log
- Real-time camera status monitoring
- Entry/exit tracking
- Security alerts and notifications

### 📊 Analytics & Insights
- Daily energy consumption charts
- Room utilization analytics
- Interactive data visualizations
- Trend analysis and reporting

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Custom CSS with modern design principles
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Open `index.html` in your web browser

```bash
# If using a local server
python -m http.server 8000
# or
npx serve .
```

4. Access the application at `http://localhost:8000`

## Usage

### Navigation
- Use the navigation menu to switch between different sections
- Keyboard shortcuts available (Ctrl+1 to Ctrl+5 for quick navigation)

### Room Controls
- Click the control buttons to toggle room devices
- Monitor real-time status changes
- View occupancy information

### Energy Monitoring
- Track energy consumption across different buildings
- Visualize usage patterns through interactive charts
- Monitor real-time energy meters

### Security Features
- View access logs with timestamps
- Monitor camera status
- Track entry/exit activities

## Project Structure

```
smart-iot-campus/
├── index.html          # Main application page
├── styles.css          # Styling and responsive design
├── script.js           # Application logic and IoT simulation
└── README.md           # Project documentation
```

## Key Components

### Dashboard Module
- Real-time data updates every 5 seconds
- Interactive statistics cards
- Responsive grid layout

### Energy Management
- Building-wise energy tracking
- Visual energy meters
- Consumption analytics

### Room Automation
- Device control interface
- Occupancy monitoring
- Status indicators

### Security System
- Access logging
- Camera monitoring
- Real-time status updates

### Analytics Dashboard
- Interactive charts
- Data visualization
- Trend analysis

## IoT Simulation

The application includes a simulated IoT environment that demonstrates:
- Real-time sensor data
- Device control mechanisms
- Automated monitoring systems
- Data visualization

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- [ ] Real IoT device integration
- [ ] Mobile application
- [ ] Advanced AI-powered analytics
- [ ] Voice control capabilities
- [ ] Multi-campus support
- [ ] Cloud integration
- [ ] User authentication system
- [ ] Advanced reporting features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or suggestions regarding this Smart IoT Campus solution, please create an issue in the project repository.

---

**Note**: This is a demonstration project showcasing IoT concepts for campus management. In a production environment, proper security measures, authentication, and real IoT device integration would be required.

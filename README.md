# 🏫 Smart Campus Solution Using IoT

<div align="center">

![Smart IoT Campus](https://img.shields.io/badge/Smart%20Campus-IoT%20Solution-2563eb?style=for-the-badge&logo=wifi&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A comprehensive, browser-based IoT campus management system providing real-time monitoring, AI-powered analytics, smart room automation, energy management, and advanced security — all without a backend.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Module Documentation](#-module-documentation)
- [User Roles](#-user-roles)
- [Browser Compatibility](#-browser-compatibility)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The **Smart Campus Solution Using IoT** is a fully client-side web application that simulates a modern, intelligent campus management platform. It demonstrates how IoT sensor data can be aggregated, visualized, and acted upon through a unified dashboard — covering everything from energy optimization to AI-driven anomaly detection.

This project is ideal for:
- 🎓 **Academic demonstrations** of IoT and smart-building concepts
- 🏗️ **Prototyping** a real campus management system
- 📖 **Learning** modern JavaScript architecture with modular ES6+ design

---

## ✨ Features

### 🏢 Campus Dashboard
- Live headcount and campus occupancy tracking
- Real-time energy consumption overview
- Average temperature monitoring across all zones
- Campus-wide security status indicator
- Interactive stat cards with live data updates every 5 seconds

### ⚡ Energy Management
- Per-building energy consumption meters (Building A, Building B, Library)
- Visual progress-bar style energy meters
- Usage analytics with daily, weekly, monthly, and yearly views
- Automated energy optimization suggestions via AI

### 🏠 Smart Room Management
- Remote toggle of **Lights**, **AC**, **Projectors**, and **Lab Equipment**
- Real-time room occupancy vs. capacity tracking
- Room availability status display
- Dedicated control panels for each room (Room 101 – Lecture Hall, Room 202 – Lab)

### 🔒 Advanced Security Monitoring
- Time-stamped access control logs (entry/exit events)
- Live camera status monitoring (Online/Offline) for multiple zones:
  - Main Entrance, Parking Lot, Library
- Real-time security alerts and notifications
- Role-based access with Admin, Staff, and Student accounts

### 🤖 AI Insights & Recommendations
- **Energy Optimization**: Highlights inefficiencies and suggests corrective actions
- **Predictive Analytics**: Provides next-day energy consumption forecasts with confidence intervals
- **Anomaly Detection**: Flags unusual sensor readings (e.g., off-hours energy spikes)

### 📊 Analytics & Reporting
- Interactive Chart.js visualizations (Line, Bar, Doughnut, Radar)
- Configurable time ranges: Day / Week / Month / Year
- Data export system for reports
- Room utilization analytics and trend analysis

### 🔔 Real-Time Alert System
- Filterable alert feed: **All | Critical | Warning | Info**
- In-app toast notification container
- Persistent alert history

### ⚙️ User Preferences & Personalization
- Configurable dashboard settings per user role
- Preference persistence via `localStorage`
- PWA-ready with `manifest.json` and theme color support

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Structure** | HTML5 (Semantic) |
| **Styling** | CSS3 (Custom, mobile-first, responsive) |
| **Logic** | JavaScript ES6+ (Modular, no build step) |
| **Charts** | [Chart.js](https://www.chartjs.org/) (CDN) |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) (CDN) |
| **Storage** | Browser `localStorage` |
| **PWA** | Web App Manifest (`manifest.json`) |

---

## 📁 Project Structure

```
smart-campus-solution-using-iot/
│
├── README.md                       # This file
├── smart-iot-campus.zip            # Deployable archive of the project
│
└── smart-iot-campus/
    └── smart-iot-campus/
        ├── index.html              # Main application shell & all section markup
        ├── styles.css              # Global styles, responsive layout, component CSS
        ├── manifest.json           # PWA web app manifest
        │
        ├── script.js               # Core app logic, IoT simulation, data updates
        ├── auth.js                 # Login/logout, role-based access control
        ├── storage.js              # localStorage abstraction layer
        ├── ai-engine.js            # AI recommendations, forecasting, anomaly detection
        │
        ├── advanced-alerts.js      # Real-time alert feed and notification system
        ├── advanced-charts.js      # Chart.js integration, chart switching & rendering
        ├── advanced-security.js    # Security camera status, access log management
        ├── smart-room-management.js # Room device controls and occupancy tracking
        │
        ├── export-system.js        # Data export functionality (reports)
        ├── performance-optimizer.js # Lazy loading, rendering optimization
        ├── user-preferences.js     # User settings, theme, and preference management
        │
        ├── data-fix.js             # Data normalization and consistency helpers
        └── chart-fix.js            # Chart rendering bug fixes and patches
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (see [Browser Compatibility](#-browser-compatibility))
- No build tools, Node.js, or backend required

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/riteshamrutkar-star/smart-campus-solution-using-iot.git
   cd smart-campus-solution-using-iot
   ```

2. **Navigate to the application directory:**
   ```bash
   cd smart-iot-campus/smart-iot-campus
   ```

3. **Open directly in your browser:**
   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

4. **Or serve locally for full PWA support:**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```
   Then visit: `http://localhost:8000`

---

## 📖 Usage Guide

### 🔐 Logging In

Click the **Login** button in the top-right corner. Use any of the following credentials:

| Role | Username | Password |
|---|---|---|
| Administrator | `admin` | `admin123` |
| Staff | `staff` | `staff123` |
| Student | `student` | `student123` |

> Different roles see different levels of system detail and control.

### 🧭 Navigation

| Section | Keyboard Shortcut | Description |
|---|---|---|
| Dashboard | `Ctrl + 1` | Overview stats and campus pulse |
| Energy | `Ctrl + 2` | Building-level energy meters |
| Rooms | `Ctrl + 3` | Smart room device controls |
| Security | `Ctrl + 4` | Camera status and access logs |
| Analytics | `Ctrl + 5` | Interactive charts and reports |

### 💡 Room Controls

1. Go to the **Rooms** section.
2. Select a room panel (e.g., Room 101 – Lecture Hall).
3. Click **Lights**, **AC**, or **Projector** to toggle each device on/off.
4. The occupancy counter and availability badge update in real time.

### 📈 Analytics

1. Go to the **Analytics** section.
2. Use the **time range** buttons (Day / Week / Month / Year) to scope the data.
3. Switch the **chart type** (Line / Bar / Doughnut / Radar) to change the visualization.

### 🔔 Alerts

1. Go to the **Real-time Alerts** section.
2. Filter alerts by severity: **All**, **Critical**, **Warning**, or **Info**.
3. New alerts auto-appear via the in-app notification system.

---

## 🧩 Module Documentation

| Module | Responsibility |
|---|---|
| `script.js` | IoT simulation loop, dashboard data updates, global event wiring |
| `auth.js` | User login, logout, session persistence, role-based UI gating |
| `storage.js` | Unified read/write API over `localStorage` |
| `ai-engine.js` | Energy recommendations, next-day forecasting, anomaly flagging |
| `advanced-alerts.js` | Alert creation, severity filtering, notification pop-ups |
| `advanced-charts.js` | Chart.js lifecycle management, chart switching, data injection |
| `advanced-security.js` | Camera status polling, access log rendering |
| `smart-room-management.js` | Device toggle handlers, occupancy simulation |
| `export-system.js` | CSV/JSON report generation and download trigger |
| `performance-optimizer.js` | Intersection Observer–based lazy rendering |
| `user-preferences.js` | Settings persistence, theme management |
| `data-fix.js` | Runtime data sanitization and default value patching |
| `chart-fix.js` | Chart.js canvas re-initialization and rendering edge-case fixes |

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Administrator** | Full access: room controls, security logs, AI insights, export, settings |
| **Staff** | Room controls, energy monitoring, alerts |
| **Student** | View-only: dashboard stats, room availability, schedule |

---

## 🌐 Browser Compatibility

| Browser | Minimum Version |
|---|---|
| Google Chrome | 60+ |
| Mozilla Firefox | 55+ |
| Apple Safari | 12+ |
| Microsoft Edge | 79+ |

---

## 🗺️ Future Roadmap

- [ ] **Real IoT Integration** — MQTT / WebSocket support for live sensor feeds
- [ ] **Mobile App** — React Native companion app for remote control
- [ ] **Cloud Backend** — Firebase or Node.js for persistent multi-user data
- [ ] **Advanced AI** — ML-based occupancy prediction using historical patterns
- [ ] **Voice Control** — Web Speech API integration for hands-free operation
- [ ] **Multi-Campus** — Hierarchical dashboard for managing multiple campuses
- [ ] **Push Notifications** — Service Worker–based alerts even when app is closed
- [ ] **Dark / Light Theme Toggle** — Full user-facing theming support
- [ ] **Advanced Reporting** — PDF export with charts embedded

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "feat: add my feature"`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open a Pull Request** against `main`

Please make sure your code is well-commented, follows existing naming conventions, and is tested across the supported browsers.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For questions, bug reports, or feature suggestions, please [open an issue](https://github.com/riteshamrutkar-star/smart-campus-solution-using-iot/issues) in this repository.

---

<div align="center">

> ⚠️ **Note:** This is a demonstration / prototype project showcasing IoT concepts for campus management.
> In a production environment, a secure backend, real IoT device integration, and proper authentication
> infrastructure would be required.

**Made with ❤️ for smarter campuses**

</div>
// Smart Room Management System
// Automated room control with AI optimization and scheduling

class SmartRoomManagement {
    constructor() {
        this.rooms = new Map();
        this.schedules = new Map();
        this.automationRules = new Map();
        this.roomAnalytics = new Map();
        this.energyOptimization = new Map();
        this.maintenanceSchedule = new Map();
        this.initializeSmartRooms();
    }

    initializeSmartRooms() {
        this.setupRoomDefinitions();
        this.createRoomInterface();
        this.initializeAutomation();
        this.setupScheduling();
        this.startRoomMonitoring();
    }

    setupRoomDefinitions() {
        // Define smart rooms with advanced capabilities
        this.rooms.set('room101', {
            name: 'Lecture Hall 101',
            type: 'lecture',
            capacity: 50,
            currentOccupancy: 0,
            devices: {
                lights: { type: 'led', count: 20, brightness: 0, color: 'white' },
                ac: { type: 'hvac', temperature: 22, humidity: 45, mode: 'auto' },
                projector: { type: '4k', status: 'off', lampHours: 1200 },
                speakers: { type: 'surround', volume: 0, mode: 'stereo' },
                blinds: { type: 'electric', position: 50, automation: true },
                sensors: { motion: true, temperature: true, humidity: true, airQuality: true }
            },
            schedule: {
                available: true,
                bookingSystem: true,
                autoCleanup: true,
                preConditioning: true
            },
            energy: {
                currentUsage: 0,
                baselineUsage: 5.2,
                optimizationEnabled: true,
                savings: 0
            },
            preferences: {
                defaultTemperature: 22,
                defaultLighting: 80,
                ecoMode: false,
                presenceDetection: true
            }
        });

        this.rooms.set('room202', {
            name: 'Computer Lab 202',
            type: 'lab',
            capacity: 30,
            currentOccupancy: 0,
            devices: {
                lights: { type: 'led', count: 15, brightness: 0, color: 'white' },
                ac: { type: 'hvac', temperature: 20, humidity: 40, mode: 'auto' },
                computers: { type: 'workstation', count: 30, status: 'off', powerManagement: true },
                equipment: { type: 'scientific', status: 'off', powerSaving: true },
                sensors: { motion: true, temperature: true, humidity: true, power: true }
            },
            schedule: {
                available: true,
                bookingSystem: true,
                autoShutdown: true,
                maintenanceMode: false
            },
            energy: {
                currentUsage: 0,
                baselineUsage: 8.7,
                optimizationEnabled: true,
                savings: 0
            },
            preferences: {
                defaultTemperature: 20,
                defaultLighting: 70,
                ecoMode: true,
                presenceDetection: true
            }
        });

        this.rooms.set('room301', {
            name: 'Conference Room 301',
            type: 'conference',
            capacity: 20,
            currentOccupancy: 0,
            devices: {
                lights: { type: 'smart', count: 10, brightness: 0, color: 'white' },
                ac: { type: 'hvac', temperature: 21, humidity: 45, mode: 'auto' },
                projector: { type: 'laser', status: 'off', lampHours: 800 },
                videoConference: { type: 'zoom', status: 'off', camera: 'off' },
                smartBoard: { type: 'interactive', status: 'off', calibration: 'good' },
                sensors: { motion: true, temperature: true, co2: true, noise: true }
            },
            schedule: {
                available: true,
                bookingSystem: true,
                autoSetup: true,
                recordingEnabled: false
            },
            energy: {
                currentUsage: 0,
                baselineUsage: 3.8,
                optimizationEnabled: true,
                savings: 0
            },
            preferences: {
                defaultTemperature: 21,
                defaultLighting: 90,
                ecoMode: false,
                presenceDetection: true
            }
        });
    }

    createRoomInterface() {
        const roomSection = document.querySelector('#rooms .container');
        if (!roomSection) return;

        // Enhanced room management interface
        const roomDashboard = document.createElement('div');
        roomDashboard.className = 'room-dashboard';
        roomDashboard.innerHTML = `
            <div class="room-overview">
                <div class="overview-stats">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-door-open"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-rooms">3</h3>
                            <span>Total Rooms</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="occupied-rooms">0</h3>
                            <span>Occupied</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="total-energy">0 kWh</h3>
                            <span>Total Energy</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-leaf"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="energy-saved">0 kWh</h3>
                            <span>Energy Saved</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="room-controls-advanced">
                <div class="control-section">
                    <h4>Quick Actions</h4>
                    <div class="quick-actions">
                        <button class="action-btn" onclick="smartRoomManagement.allLightsOn()">
                            <i class="fas fa-lightbulb"></i>
                            All Lights On
                        </button>
                        <button class="action-btn" onclick="smartRoomManagement.allLightsOff()">
                            <i class="fas fa-lightbulb"></i>
                            All Lights Off
                        </button>
                        <button class="action-btn" onclick="smartRoomManagement.ecoModeAll()">
                            <i class="fas fa-leaf"></i>
                            Eco Mode All
                        </button>
                        <button class="action-btn" onclick="smartRoomManagement.emergencyMode()">
                            <i class="fas fa-exclamation-triangle"></i>
                            Emergency
                        </button>
                    </div>
                </div>

                <div class="control-section">
                    <h4>Automation Rules</h4>
                    <div class="automation-controls">
                        <label class="automation-toggle">
                            <input type="checkbox" id="auto-scheduling" checked>
                            <span>Auto Scheduling</span>
                        </label>
                        <label class="automation-toggle">
                            <input type="checkbox" id="presence-detection" checked>
                            <span>Presence Detection</span>
                        </label>
                        <label class="automation-toggle">
                            <input type="checkbox" id="energy-optimization" checked>
                            <span>Energy Optimization</span>
                        </label>
                        <label class="automation-toggle">
                            <input type="checkbox" id="auto-cleanup" checked>
                            <span>Auto Cleanup</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="room-grid-advanced">
                ${Array.from(this.rooms.entries()).map(([roomId, room]) => `
                    <div class="room-card-advanced" data-room="${roomId}">
                        <div class="room-header">
                            <div class="room-title">
                                <h3>${room.name}</h3>
                                <span class="room-type">${room.type.toUpperCase()}</span>
                            </div>
                            <div class="room-status ${room.currentOccupancy > 0 ? 'occupied' : 'available'}">
                                <i class="fas fa-${room.currentOccupancy > 0 ? 'users' : 'check-circle'}"></i>
                                <span>${room.currentOccupancy > 0 ? 'Occupied' : 'Available'}</span>
                            </div>
                        </div>

                        <div class="room-metrics">
                            <div class="metric-item">
                                <span class="metric-label">Occupancy</span>
                                <span class="metric-value">${room.currentOccupancy}/${room.capacity}</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-label">Temperature</span>
                                <span class="metric-value">${room.devices.ac.temperature}°C</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-label">Energy</span>
                                <span class="metric-value">${room.energy.currentUsage} kWh</span>
                            </div>
                        </div>

                        <div class="room-devices">
                            <div class="device-group">
                                <h5>Lighting</h5>
                                <div class="device-controls">
                                    <button class="device-btn" onclick="smartRoomManagement.toggleDevice('${roomId}', 'lights')">
                                        <i class="fas fa-lightbulb"></i>
                                        ${room.devices.lights.brightness > 0 ? 'ON' : 'OFF'}
                                    </button>
                                    <input type="range" class="device-slider" min="0" max="100" 
                                           value="${room.devices.lights.brightness}"
                                           oninput="smartRoomManagement.adjustBrightness('${roomId}', this.value)">
                                </div>
                            </div>

                            <div class="device-group">
                                <h5>Climate</h5>
                                <div class="device-controls">
                                    <button class="device-btn" onclick="smartRoomManagement.toggleDevice('${roomId}', 'ac')">
                                        <i class="fas fa-snowflake"></i>
                                        ${room.devices.ac.mode !== 'off' ? 'ON' : 'OFF'}
                                    </button>
                                    <div class="temp-control">
                                        <button class="temp-btn" onclick="smartRoomManagement.adjustTemperature('${roomId}', -1)">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span class="temp-display">${room.devices.ac.temperature}°C</span>
                                        <button class="temp-btn" onclick="smartRoomManagement.adjustTemperature('${roomId}', 1)">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="device-group">
                                <h5>Equipment</h5>
                                <div class="device-controls">
                                    ${room.devices.projector ? `
                                        <button class="device-btn" onclick="smartRoomManagement.toggleDevice('${roomId}', 'projector')">
                                            <i class="fas fa-video"></i>
                                            ${room.devices.projector.status === 'on' ? 'ON' : 'OFF'}
                                        </button>
                                    ` : ''}
                                    ${room.devices.videoConference ? `
                                        <button class="device-btn" onclick="smartRoomManagement.toggleDevice('${roomId}', 'videoConference')">
                                            <i class="fas fa-video"></i>
                                            ${room.devices.videoConference.status === 'on' ? 'ON' : 'OFF'}
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>

                        <div class="room-analytics">
                            <h5>Analytics</h5>
                            <div class="analytics-mini">
                                <div class="analytics-item">
                                    <span class="analytics-label">Usage Today</span>
                                    <span class="analytics-value">4.2 hrs</span>
                                </div>
                                <div class="analytics-item">
                                    <span class="analytics-label">Efficiency</span>
                                    <span class="analytics-value">87%</span>
                                </div>
                                <div class="analytics-item">
                                    <span class="analytics-label">Comfort</span>
                                    <span class="analytics-value">Good</span>
                                </div>
                            </div>
                        </div>

                        <div class="room-actions">
                            <button class="action-btn-small" onclick="smartRoomManagement.viewRoomDetails('${roomId}')">
                                <i class="fas fa-info-circle"></i>
                                Details
                            </button>
                            <button class="action-btn-small" onclick="smartRoomManagement.scheduleRoom('${roomId}')">
                                <i class="fas fa-calendar"></i>
                                Schedule
                            </button>
                            <button class="action-btn-small" onclick="smartRoomManagement.maintenanceMode('${roomId}')">
                                <i class="fas fa-wrench"></i>
                                Maintenance
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Replace existing room content
        const existingContent = roomSection.querySelector('.room-controls');
        if (existingContent) {
            existingContent.replaceWith(roomDashboard);
        }

        // Add styles
        this.addRoomStyles();
        this.setupRoomEventListeners();
    }

    addRoomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .room-dashboard {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            .room-overview {
                margin-bottom: 2rem;
            }

            .overview-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
            }

            .overview-stats .stat-card {
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.3s ease;
            }

            .overview-stats .stat-card:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-2px);
            }

            .stat-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                color: white;
                font-size: 1.2rem;
            }

            .stat-info h3 {
                margin: 0;
                color: var(--text-primary);
                font-size: 1.5rem;
            }

            .stat-info span {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .room-controls-advanced {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .control-section {
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
            }

            .control-section h4 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .quick-actions {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .action-btn {
                padding: 1rem;
                border: none;
                border-radius: 8px;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .action-btn:hover {
                background: var(--primary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .automation-controls {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .automation-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 6px;
                transition: background 0.2s ease;
            }

            .automation-toggle:hover {
                background: var(--light-bg);
            }

            .room-grid-advanced {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 2rem;
            }

            .room-card-advanced {
                background: var(--card-bg);
                border-radius: 12px;
                box-shadow: var(--shadow);
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .room-card-advanced:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-4px);
            }

            .room-header {
                padding: 1.5rem;
                background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .room-title h3 {
                margin: 0;
                font-size: 1.2rem;
            }

            .room-type {
                background: rgba(255, 255, 255, 0.2);
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .room-status {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                font-weight: 600;
            }

            .room-status.occupied {
                background: rgba(239, 68, 68, 0.2);
            }

            .room-metrics {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                padding: 1.5rem;
                background: var(--light-bg);
            }

            .metric-item {
                text-align: center;
            }

            .metric-label {
                display: block;
                color: var(--text-secondary);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }

            .metric-value {
                display: block;
                color: var(--text-primary);
                font-size: 1.2rem;
                font-weight: bold;
            }

            .room-devices {
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .device-group h5 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1rem;
            }

            .device-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .device-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 6px;
                background: var(--secondary-color);
                color: white;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            }

            .device-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .device-slider {
                width: 100px;
                height: 6px;
                border-radius: 3px;
                background: var(--border-color);
                outline: none;
            }

            .temp-control {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .temp-btn {
                width: 30px;
                height: 30px;
                border: none;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .temp-display {
                min-width: 50px;
                text-align: center;
                font-weight: bold;
                color: var(--text-primary);
            }

            .room-analytics {
                padding: 1.5rem;
                background: var(--light-bg);
            }

            .analytics-mini {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
            }

            .analytics-item {
                text-align: center;
            }

            .analytics-label {
                display: block;
                color: var(--text-secondary);
                font-size: 0.8rem;
                margin-bottom: 0.25rem;
            }

            .analytics-value {
                display: block;
                color: var(--primary-color);
                font-weight: bold;
                font-size: 1rem;
            }

            .room-actions {
                padding: 1.5rem;
                background: var(--light-bg);
                display: flex;
                justify-content: center;
                gap: 1rem;
            }

            .action-btn-small {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 6px;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            }

            .action-btn-small:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            @media (max-width: 1024px) {
                .room-controls-advanced {
                    grid-template-columns: 1fr;
                }
                
                .room-grid-advanced {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .overview-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .quick-actions {
                    grid-template-columns: 1fr;
                }
                
                .room-metrics {
                    grid-template-columns: 1fr;
                }
                
                .device-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupRoomEventListeners() {
        // Auto-update room statistics
        setInterval(() => {
            this.updateRoomStatistics();
        }, 3000);

        // Simulate room usage
        setInterval(() => {
            this.simulateRoomActivity();
        }, 5000);
    }

    initializeAutomation() {
        // Setup automation rules
        this.automationRules.set('presence-based-lighting', {
            condition: (room) => room.preferences.presenceDetection && room.currentOccupancy === 0,
            action: (room) => this.setDeviceState(room, 'lights', 'brightness', 0),
            priority: 'high'
        });

        this.automationRules.set('temperature-optimization', {
            condition: (room) => Math.abs(room.devices.ac.temperature - room.preferences.defaultTemperature) > 2,
            action: (room) => this.setDeviceState(room, 'ac', 'temperature', room.preferences.defaultTemperature),
            priority: 'medium'
        });

        this.automationRules.set('energy-saving-mode', {
            condition: (room) => room.preferences.ecoMode && room.currentOccupancy === 0,
            action: (room) => {
                this.setDeviceState(room, 'lights', 'brightness', 20);
                this.setDeviceState(room, 'ac', 'temperature', room.preferences.defaultTemperature + 2);
            },
            priority: 'medium'
        });

        this.automationRules.set('meeting-preparation', {
            condition: (room, schedule) => schedule && schedule.type === 'meeting' && 
                schedule.startTime - Date.now() < 900000, // 15 minutes before
            action: (room) => {
                this.setDeviceState(room, 'ac', 'temperature', room.preferences.defaultTemperature);
                this.setDeviceState(room, 'lights', 'brightness', room.preferences.defaultLighting);
                if (room.devices.projector) {
                    this.setDeviceState(room, 'projector', 'status', 'on');
                }
            },
            priority: 'high'
        });
    }

    setupScheduling() {
        // Initialize room scheduling system
        this.schedules.set('room101', [
            {
                id: 'meeting-1',
                title: 'AI Workshop',
                type: 'meeting',
                startTime: Date.now() + 3600000, // 1 hour from now
                endTime: Date.now() + 7200000, // 2 hours from now
                organizer: 'Dr. Smith',
                attendees: 25,
                requirements: ['projector', 'videoConference'],
                autoPreparation: true
            }
        ]);

        this.schedules.set('room202', [
            {
                id: 'lab-session-1',
                title: 'Computer Science Lab',
                type: 'class',
                startTime: Date.now() + 1800000, // 30 minutes from now
                endTime: Date.now() + 5400000, // 1.5 hours from now
                organizer: 'Prof. Johnson',
                attendees: 28,
                requirements: ['computers', 'equipment'],
                autoPreparation: true
            }
        ]);
    }

    startRoomMonitoring() {
        // Monitor room conditions and automation
        setInterval(() => {
            this.processAutomationRules();
            this.updateEnergyUsage();
            this.checkMaintenanceNeeds();
        }, 2000);
    }

    processAutomationRules() {
        this.rooms.forEach((room, roomId) => {
            const schedule = this.getCurrentSchedule(roomId);
            
            this.automationRules.forEach((rule, ruleName) => {
                if (rule.condition(room, schedule)) {
                    rule.action(room);
                }
            });
        });
    }

    getCurrentSchedule(roomId) {
        const schedules = this.schedules.get(roomId) || [];
        const now = Date.now();
        
        return schedules.find(schedule => 
            schedule.startTime <= now && schedule.endTime > now
        );
    }

    setDeviceState(room, deviceType, property, value) {
        if (room.devices[deviceType]) {
            room.devices[deviceType][property] = value;
            this.updateRoomDisplay(roomId);
            this.logDeviceChange(roomId, deviceType, property, value);
        }
    }

    updateRoomDisplay(roomId) {
        const roomElement = document.querySelector(`[data-room="${roomId}"]`);
        const room = this.rooms.get(roomId);
        
        if (roomElement && room) {
            // Update occupancy
            const statusElement = roomElement.querySelector('.room-status');
            const occupancyElement = roomElement.querySelector('.metric-value');
            
            if (statusElement) {
                statusElement.className = `room-status ${room.currentOccupancy > 0 ? 'occupied' : 'available'}`;
                statusElement.innerHTML = `
                    <i class="fas fa-${room.currentOccupancy > 0 ? 'users' : 'check-circle'}"></i>
                    <span>${room.currentOccupancy > 0 ? 'Occupied' : 'Available'}</span>
                `;
            }

            // Update metrics
            const metrics = roomElement.querySelectorAll('.metric-value');
            if (metrics[0]) metrics[0].textContent = `${room.currentOccupancy}/${room.capacity}`;
            if (metrics[1]) metrics[1].textContent = `${room.devices.ac.temperature}°C`;
            if (metrics[2]) metrics[2].textContent = `${room.energy.currentUsage} kWh`;

            // Update device controls
            this.updateDeviceControls(roomElement, room);
        }
    }

    updateDeviceControls(roomElement, room) {
        // Update lighting controls
        const lightsBtn = roomElement.querySelector('.device-btn');
        const brightnessSlider = roomElement.querySelector('.device-slider');
        
        if (lightsBtn && brightnessSlider) {
            lightsBtn.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                ${room.devices.lights.brightness > 0 ? 'ON' : 'OFF'}
            `;
            brightnessSlider.value = room.devices.lights.brightness;
        }

        // Update temperature controls
        const tempDisplay = roomElement.querySelector('.temp-display');
        if (tempDisplay) {
            tempDisplay.textContent = `${room.devices.ac.temperature}°C`;
        }
    }

    logDeviceChange(roomId, deviceType, property, value) {
        const change = {
            roomId,
            deviceType,
            property,
            value,
            timestamp: Date.now(),
            source: 'automation'
        };

        if (window.storageManager) {
            window.storageManager.addDeviceChange(change);
        }
    }

    simulateRoomActivity() {
        this.rooms.forEach((room, roomId) => {
            const random = Math.random();
            
            // Simulate occupancy changes
            if (random > 0.9) {
                room.currentOccupancy = Math.floor(Math.random() * room.capacity);
                this.updateRoomDisplay(roomId);
            }

            // Simulate device usage
            if (random > 0.85 && room.currentOccupancy > 0) {
                this.setDeviceState(room, 'lights', 'brightness', Math.floor(Math.random() * 50) + 50);
            }

            // Simulate energy usage changes
            if (random > 0.8) {
                room.energy.currentUsage = (Math.random() * 5 + room.energy.baselineUsage).toFixed(1);
                this.updateRoomDisplay(roomId);
            }
        });
    }

    updateEnergyUsage() {
        let totalEnergy = 0;
        let totalSavings = 0;

        this.rooms.forEach(room => {
            // Calculate energy usage based on devices
            let usage = 0;
            
            if (room.devices.lights.brightness > 0) {
                usage += (room.devices.lights.brightness / 100) * 2.5; // LED lights
            }
            
            if (room.devices.ac.mode !== 'off') {
                usage += 3.2; // HVAC system
            }
            
            if (room.devices.projector && room.devices.projector.status === 'on') {
                usage += 4.8; // Projector
            }

            room.energy.currentUsage = usage.toFixed(1);
            totalEnergy += parseFloat(usage);

            // Calculate savings
            if (room.energy.optimizationEnabled) {
                const savings = Math.max(0, room.energy.baselineUsage - usage);
                room.energy.savings += savings;
                totalSavings += savings;
            }
        });

        // Update global energy display
        document.getElementById('total-energy').textContent = `${totalEnergy.toFixed(1)} kWh`;
        document.getElementById('energy-saved').textContent = `${totalSavings.toFixed(1)} kWh`;
    }

    checkMaintenanceNeeds() {
        this.rooms.forEach((room, roomId) => {
            // Check device maintenance needs
            if (room.devices.projector && room.devices.projector.lampHours > 1500) {
                this.scheduleMaintenance(roomId, 'projector', 'Projector lamp replacement needed');
            }

            if (room.devices.ac && Math.random() > 0.98) {
                this.scheduleMaintenance(roomId, 'hvac', 'HVAC filter replacement needed');
            }
        });
    }

    scheduleMaintenance(roomId, device, issue) {
        const maintenance = {
            id: `maintenance-${Date.now()}`,
            roomId,
            device,
            issue,
            priority: device === 'projector' ? 'high' : 'medium',
            scheduledDate: Date.now() + 86400000, // 24 hours from now
            status: 'scheduled'
        };

        if (window.notificationSystem) {
            window.notificationSystem.show(
                `Maintenance scheduled for ${this.rooms.get(roomId).name}: ${issue}`,
                'warning'
            );
        }
    }

    updateRoomStatistics() {
        let occupiedRooms = 0;
        let totalEnergy = 0;
        let totalSavings = 0;

        this.rooms.forEach(room => {
            if (room.currentOccupancy > 0) occupiedRooms++;
            totalEnergy += parseFloat(room.energy.currentUsage);
            totalSavings += room.energy.savings;
        });

        document.getElementById('total-rooms').textContent = this.rooms.size;
        document.getElementById('occupied-rooms').textContent = occupiedRooms;
        document.getElementById('total-energy').textContent = `${totalEnergy.toFixed(1)} kWh`;
        document.getElementById('energy-saved').textContent = `${totalSavings.toFixed(1)} kWh`;
    }

    // Public API methods
    toggleDevice(roomId, deviceType) {
        const room = this.rooms.get(roomId);
        if (!room) return;

        const device = room.devices[deviceType];
        if (!device) return;

        if (deviceType === 'lights') {
            device.brightness = device.brightness > 0 ? 0 : 100;
        } else if (deviceType === 'ac') {
            device.mode = device.mode === 'off' ? 'auto' : 'off';
        } else if (deviceType === 'projector') {
            device.status = device.status === 'on' ? 'off' : 'on';
        } else if (deviceType === 'videoConference') {
            device.status = device.status === 'on' ? 'off' : 'on';
            device.camera = device.status === 'on' ? 'off' : 'on';
        }

        this.updateRoomDisplay(roomId);
    }

    adjustBrightness(roomId, brightness) {
        const room = this.rooms.get(roomId);
        if (room && room.devices.lights) {
            room.devices.lights.brightness = parseInt(brightness);
            this.updateRoomDisplay(roomId);
        }
    }

    adjustTemperature(roomId, delta) {
        const room = this.rooms.get(roomId);
        if (room && room.devices.ac) {
            room.devices.ac.temperature = Math.max(16, Math.min(30, room.devices.ac.temperature + delta));
            this.updateRoomDisplay(roomId);
        }
    }

    allLightsOn() {
        this.rooms.forEach((room, roomId) => {
            this.setDeviceState(room, 'lights', 'brightness', 100);
        });
    }

    allLightsOff() {
        this.rooms.forEach((room, roomId) => {
            this.setDeviceState(room, 'lights', 'brightness', 0);
        });
    }

    ecoModeAll() {
        this.rooms.forEach((room, roomId) => {
            room.preferences.ecoMode = true;
            this.setDeviceState(room, 'lights', 'brightness', 20);
            this.setDeviceState(room, 'ac', 'temperature', room.preferences.defaultTemperature + 2);
        });
    }

    emergencyMode() {
        this.rooms.forEach((room, roomId) => {
            // Turn on all lights to full brightness
            this.setDeviceState(room, 'lights', 'brightness', 100);
            
            // Unlock all doors
            if (room.devices.door) {
                room.devices.door.locked = false;
            }
            
            // Activate emergency lighting
            if (room.devices.emergencyLights) {
                room.devices.emergencyLights.status = 'on';
            }
        });

        if (window.notificationSystem) {
            window.notificationSystem.show(
                'Emergency mode activated in all rooms',
                'critical'
            );
        }
    }

    viewRoomDetails(roomId) {
        const room = this.rooms.get(roomId);
        if (room) {
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `Viewing detailed information for ${room.name}`,
                    'info'
                );
            }
        }
    }

    scheduleRoom(roomId) {
        const room = this.rooms.get(roomId);
        if (room) {
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `Opening scheduling interface for ${room.name}`,
                    'info'
                );
            }
        }
    }

    maintenanceMode(roomId) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.schedule.maintenanceMode = !room.schedule.maintenanceMode;
            
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `${room.name} maintenance mode: ${room.schedule.maintenanceMode ? 'ON' : 'OFF'}`,
                    room.schedule.maintenanceMode ? 'warning' : 'info'
                );
            }
        }
    }
}

// Initialize smart room management
window.smartRoomManagement = new SmartRoomManagement();

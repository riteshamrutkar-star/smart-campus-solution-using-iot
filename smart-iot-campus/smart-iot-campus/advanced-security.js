// Advanced Security Monitoring System
// AI-powered security with real-time threat detection

class AdvancedSecuritySystem {
    constructor() {
        this.securityEvents = [];
        this.threatLevels = ['low', 'medium', 'high', 'critical'];
        this.securityZones = new Map();
        this.faceRecognitionDB = new Map();
        this.accessLogs = [];
        this.securityCameras = new Map();
        this.patrolRoutes = [];
        this.emergencyProtocols = new Map();
        this.initializeAdvancedSecurity();
    }

    initializeAdvancedSecurity() {
        this.setupSecurityZones();
        this.createSecurityInterface();
        this.initializeSurveillanceSystem();
        this.setupAccessControl();
        this.initializeEmergencyProtocols();
        this.startSecurityMonitoring();
    }

    setupSecurityZones() {
        // Define security zones with different threat levels
        this.securityZones.set('main-entrance', {
            name: 'Main Entrance',
            level: 'high',
            cameras: ['cam-01', 'cam-02'],
            sensors: ['motion-01', 'door-01'],
            accessRequired: 'employee',
            armed: true
        });

        this.securityZones.set('server-room', {
            name: 'Server Room',
            level: 'critical',
            cameras: ['cam-03', 'cam-04'],
            sensors: ['motion-02', 'temp-01', 'smoke-01'],
            accessRequired: 'admin',
            armed: true
        });

        this.securityZones.set('parking-lot', {
            name: 'Parking Lot',
            level: 'medium',
            cameras: ['cam-05', 'cam-06', 'cam-07'],
            sensors: ['motion-03', 'gate-01'],
            accessRequired: 'public',
            armed: true
        });

        this.securityZones.set('laboratory', {
            name: 'Research Laboratory',
            level: 'high',
            cameras: ['cam-08', 'cam-09'],
            sensors: ['motion-04', 'door-02', 'chemical-01'],
            accessRequired: 'researcher',
            armed: true
        });

        this.securityZones.set('library', {
            name: 'Library',
            level: 'medium',
            cameras: ['cam-10', 'cam-11'],
            sensors: ['motion-05', 'door-03'],
            accessRequired: 'student',
            armed: true
        });
    }

    createSecurityInterface() {
        const securitySection = document.querySelector('#security .container');
        if (!securitySection) return;

        // Enhanced security dashboard
        const securityDashboard = document.createElement('div');
        securityDashboard.className = 'security-dashboard';
        securityDashboard.innerHTML = `
            <div class="security-overview">
                <div class="security-status-grid">
                    <div class="status-card">
                        <div class="status-indicator online">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="status-info">
                            <h3>System Status</h3>
                            <span class="status-text">Armed & Operational</span>
                        </div>
                    </div>
                    <div class="status-card">
                        <div class="threat-level high">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="status-info">
                            <h3>Threat Level</h3>
                            <span class="threat-text">High</span>
                        </div>
                    </div>
                    <div class="status-card">
                        <div class="active-zones">
                            <i class="fas fa-map-marked-alt"></i>
                        </div>
                        <div class="status-info">
                            <h3>Active Zones</h3>
                            <span class="zones-count">5/5</span>
                        </div>
                    </div>
                    <div class="status-card">
                        <div class="security-patrol">
                            <i class="fas fa-walking"></i>
                        </div>
                        <div class="status-info">
                            <h3>Patrol Status</h3>
                            <span class="patrol-text">2 Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="security-controls">
                <div class="control-section">
                    <h4>Zone Control</h4>
                    <div class="zone-controls">
                        ${Array.from(this.securityZones.entries()).map(([id, zone]) => `
                            <div class="zone-control" data-zone="${id}">
                                <div class="zone-header">
                                    <span class="zone-name">${zone.name}</span>
                                    <span class="zone-level ${zone.level}">${zone.level.toUpperCase()}</span>
                                </div>
                                <div class="zone-actions">
                                    <button class="zone-btn ${zone.armed ? 'armed' : ''}" 
                                            onclick="advancedSecurity.toggleZoneArm('${id}')">
                                        <i class="fas fa-${zone.armed ? 'lock' : 'unlock'}"></i>
                                        ${zone.armed ? 'Armed' : 'Disarmed'}
                                    </button>
                                    <button class="zone-btn" onclick="advancedSecurity.viewZoneDetails('${id}')">
                                        <i class="fas fa-eye"></i>
                                        View
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="control-section">
                    <h4>Camera Monitoring</h4>
                    <div class="camera-grid">
                        ${this.generateCameraGrid()}
                    </div>
                </div>

                <div class="control-section">
                    <h4>Access Control</h4>
                    <div class="access-control-panel">
                        <div class="access-stats">
                            <div class="stat-item">
                                <span class="stat-value" id="access-today">0</span>
                                <span class="stat-label">Access Today</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="access-denied">0</span>
                                <span class="stat-label">Denied</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value" id="unusual-access">0</span>
                                <span class="stat-label">Unusual</span>
                            </div>
                        </div>
                        <div class="access-actions">
                            <button class="btn btn-warning" onclick="advancedSecurity.lockdownAll()">
                                <i class="fas fa-lock"></i>
                                Emergency Lockdown
                            </button>
                            <button class="btn btn-secondary" onclick="advancedSecurity.openAll()">
                                <i class="fas fa-unlock"></i>
                                Open All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="security-events">
                <h3>Recent Security Events</h3>
                <div class="events-list" id="security-events-list">
                    <!-- Events will be added dynamically -->
                </div>
            </div>
        `;

        // Replace existing security content
        const existingContent = securitySection.querySelector('.security-grid');
        if (existingContent) {
            existingContent.replaceWith(securityDashboard);
        }

        // Add styles
        this.addSecurityStyles();
        this.setupSecurityEventListeners();
    }

    generateCameraGrid() {
        const cameras = [
            { id: 'cam-01', name: 'Main Entrance', status: 'online', recording: true },
            { id: 'cam-02', name: 'Main Lobby', status: 'online', recording: true },
            { id: 'cam-03', name: 'Server Room', status: 'online', recording: true },
            { id: 'cam-04', name: 'Server Room 2', status: 'online', recording: false },
            { id: 'cam-05', name: 'Parking Lot A', status: 'online', recording: true },
            { id: 'cam-06', name: 'Parking Lot B', status: 'offline', recording: false },
            { id: 'cam-07', name: 'Parking Lot C', status: 'online', recording: true },
            { id: 'cam-08', name: 'Laboratory', status: 'online', recording: true },
            { id: 'cam-09', name: 'Lab Storage', status: 'online', recording: false },
            { id: 'cam-10', name: 'Library Entrance', status: 'online', recording: true },
            { id: 'cam-11', name: 'Library Main', status: 'online', recording: true }
        ];

        return cameras.map(camera => `
            <div class="camera-item ${camera.status}" data-camera="${camera.id}">
                <div class="camera-preview">
                    <div class="camera-feed">
                        <i class="fas fa-video"></i>
                        <div class="camera-status ${camera.recording ? 'recording' : ''}">
                            <i class="fas fa-circle"></i>
                        </div>
                    </div>
                </div>
                <div class="camera-info">
                    <span class="camera-name">${camera.name}</span>
                    <span class="camera-status-text ${camera.status}">${camera.status.toUpperCase()}</span>
                </div>
                <div class="camera-actions">
                    <button class="camera-btn" onclick="advancedSecurity.viewCamera('${camera.id}')">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="camera-btn" onclick="advancedSecurity.toggleRecording('${camera.id}')">
                        <i class="fas fa-${camera.recording ? 'stop' : 'play'}"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    addSecurityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .security-dashboard {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .security-overview {
                grid-column: span 2;
            }

            .security-status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .status-card {
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.3s ease;
            }

            .status-card:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-2px);
            }

            .status-indicator {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
            }

            .status-indicator.online {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            }

            .threat-level {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            }

            .threat-level.low {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            }

            .threat-level.medium {
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            }

            .threat-level.high {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            }

            .threat-level.critical {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            }

            .active-zones {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            }

            .security-patrol {
                background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            }

            .status-info h3 {
                margin: 0 0 0.5rem 0;
                color: var(--text-primary);
                font-size: 1rem;
            }

            .status-text, .threat-text, .zones-count, .patrol-text {
                color: var(--text-secondary);
                font-weight: 600;
            }

            .security-controls {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }

            .control-section {
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
            }

            .control-section h4 {
                color: var(--primary-color);
                margin-bottom: 1.5rem;
                font-size: 1.2rem;
            }

            .zone-controls {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .zone-control {
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem;
                transition: all 0.3s ease;
            }

            .zone-control:hover {
                border-color: var(--primary-color);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .zone-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .zone-name {
                font-weight: 600;
                color: var(--text-primary);
            }

            .zone-level {
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                color: white;
            }

            .zone-level.low {
                background: #10b981;
            }

            .zone-level.medium {
                background: #f59e0b;
            }

            .zone-level.high {
                background: #ef4444;
            }

            .zone-level.critical {
                background: #dc2626;
            }

            .zone-actions {
                display: flex;
                gap: 0.5rem;
            }

            .zone-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            }

            .zone-btn.armed {
                background: var(--secondary-color);
                color: white;
            }

            .zone-btn:not(.armed) {
                background: var(--warning-color);
                color: white;
            }

            .zone-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .camera-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }

            .camera-item {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .camera-item:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-2px);
            }

            .camera-item.offline {
                opacity: 0.7;
                border-color: var(--danger-color);
            }

            .camera-preview {
                position: relative;
                height: 120px;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .camera-feed {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 2rem;
            }

            .camera-status {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ef4444;
            }

            .camera-status.recording {
                background: #ef4444;
                animation: pulse 1.5s infinite;
            }

            .camera-info {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .camera-name {
                font-weight: 600;
                color: var(--text-primary);
            }

            .camera-status-text {
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .camera-status-text.online {
                background: rgba(16, 185, 129, 0.2);
                color: var(--secondary-color);
            }

            .camera-status-text.offline {
                background: rgba(239, 68, 68, 0.2);
                color: var(--danger-color);
            }

            .camera-actions {
                display: flex;
                gap: 0.5rem;
            }

            .camera-btn {
                padding: 0.25rem 0.5rem;
                border: none;
                border-radius: 4px;
                background: var(--primary-color);
                color: white;
                cursor: pointer;
                font-size: 0.8rem;
            }

            .access-control-panel {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .access-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
            }

            .access-stats .stat-item {
                text-align: center;
                padding: 1rem;
                background: var(--light-bg);
                border-radius: 8px;
            }

            .access-stats .stat-value {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--primary-color);
            }

            .access-stats .stat-label {
                display: block;
                color: var(--text-secondary);
                margin-top: 0.5rem;
            }

            .access-actions {
                display: flex;
                gap: 1rem;
            }

            .security-events {
                grid-column: span 2;
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
            }

            .events-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }

            .event-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border-left: 4px solid var(--border-color);
                background: var(--light-bg);
                border-radius: 0 8px 8px 0;
                transition: all 0.3s ease;
            }

            .event-item:hover {
                border-left-color: var(--primary-color);
                transform: translateX(4px);
            }

            .event-item.critical {
                border-left-color: var(--danger-color);
                background: rgba(239, 68, 68, 0.1);
            }

            .event-item.warning {
                border-left-color: var(--warning-color);
                background: rgba(245, 158, 11, 0.1);
            }

            .event-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .event-content {
                flex: 1;
            }

            .event-title {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }

            .event-details {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .event-time {
                color: var(--text-secondary);
                font-size: 0.8rem;
                white-space: nowrap;
            }

            @media (max-width: 1024px) {
                .security-dashboard {
                    grid-template-columns: 1fr;
                }
                
                .security-overview {
                    grid-column: span 1;
                }
                
                .security-controls {
                    grid-template-columns: 1fr;
                }
                
                .access-stats {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 768px) {
                .security-status-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .camera-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupSecurityEventListeners() {
        // Auto-update security statistics
        setInterval(() => {
            this.updateSecurityStatistics();
        }, 3000);

        // Simulate security events
        setInterval(() => {
            this.generateSecurityEvent();
        }, 8000);
    }

    initializeSurveillanceSystem() {
        // Initialize camera monitoring
        this.securityCameras.set('cam-01', {
            name: 'Main Entrance',
            status: 'online',
            recording: true,
            motionDetection: true,
            aiAnalysis: true
        });

        // Start AI-powered surveillance
        this.startAISurveillance();
    }

    startAISurveillance() {
        setInterval(() => {
            this.analyzeVideoFeeds();
        }, 5000);
    }

    analyzeVideoFeeds() {
        // Simulate AI analysis of video feeds
        this.securityCameras.forEach((camera, cameraId) => {
            if (camera.status === 'online' && camera.aiAnalysis) {
                // Simulate AI detection
                const detection = this.performAIDetection(cameraId);
                if (detection) {
                    this.handleAIDetection(cameraId, detection);
                }
            }
        });
    }

    performAIDetection(cameraId) {
        const random = Math.random();
        
        if (random > 0.95) {
            return {
                type: 'unauthorized_person',
                confidence: 0.87,
                timestamp: Date.now(),
                location: this.getCameraLocation(cameraId)
            };
        } else if (random > 0.92) {
            return {
                type: 'unusual_behavior',
                confidence: 0.76,
                timestamp: Date.now(),
                location: this.getCameraLocation(cameraId)
            };
        } else if (random > 0.98) {
            return {
                type: 'weapon_detected',
                confidence: 0.94,
                timestamp: Date.now(),
                location: this.getCameraLocation(cameraId)
            };
        }
        
        return null;
    }

    handleAIDetection(cameraId, detection) {
        this.createSecurityEvent({
            id: `ai-event-${Date.now()}`,
            type: 'ai_detection',
            severity: detection.type === 'weapon_detected' ? 'critical' : 'warning',
            title: 'AI Detection Alert',
            message: `${detection.type.replace('_', ' ')} detected at ${detection.location}`,
            camera: cameraId,
            detection: detection,
            timestamp: Date.now()
        });
    }

    getCameraLocation(cameraId) {
        const zone = Array.from(this.securityZones.entries())
            .find(([id, zone]) => zone.cameras.includes(cameraId));
        return zone ? zone[1].name : 'Unknown Location';
    }

    setupAccessControl() {
        // Initialize access control system
        this.accessLogs = [];
        
        // Simulate access events
        setInterval(() => {
            this.simulateAccessEvent();
        }, 6000);
    }

    simulateAccessEvent() {
        const events = [
            { type: 'granted', person: 'John Doe', location: 'Main Entrance', method: 'card' },
            { type: 'denied', person: 'Unknown', location: 'Server Room', method: 'biometric' },
            { type: 'granted', person: 'Jane Smith', location: 'Library', method: 'mobile' },
            { type: 'unusual', person: 'Mike Johnson', location: 'Laboratory', method: 'card', time: '02:30 AM' }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        this.createAccessEvent(event);
    }

    createAccessEvent(event) {
        const accessEvent = {
            id: `access-${Date.now()}`,
            ...event,
            timestamp: Date.now()
        };

        this.accessLogs.unshift(accessEvent);
        if (this.accessLogs.length > 100) {
            this.accessLogs = this.accessLogs.slice(0, 100);
        }

        this.updateAccessStatistics();
    }

    initializeEmergencyProtocols() {
        // Define emergency protocols
        this.emergencyProtocols.set('fire', {
            name: 'Fire Emergency',
            actions: [
                'unlock_all_exits',
                'activate_fire_alarm',
                'notify_fire_department',
                'shutdown_hvac',
                'activate_sprinklers',
                'emergency_lighting'
            ]
        });

        this.emergencyProtocols.set('lockdown', {
            name: 'Lockdown',
            actions: [
                'lock_all_doors',
                'activate_lockdown_alarm',
                'notify_security',
                'block_card_access',
                'activate_cameras_recording'
            ]
        });

        this.emergencyProtocols.set('medical', {
            name: 'Medical Emergency',
            actions: [
                'guide_emergency_services',
                'unlock_medical_rooms',
                'notify_medical_team',
                'clear_emergency_routes'
            ]
        });
    }

    createSecurityEvent(event) {
        this.securityEvents.unshift(event);
        if (this.securityEvents.length > 50) {
            this.securityEvents = this.securityEvents.slice(0, 50);
        }

        this.renderSecurityEvent(event);
        this.updateThreatLevel(event);
    }

    renderSecurityEvent(event) {
        const eventsList = document.getElementById('security-events-list');
        if (!eventsList) return;

        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${event.severity}`;
        eventElement.innerHTML = `
            <div class="event-icon ${event.severity}">
                <i class="fas ${this.getEventIcon(event.type)}"></i>
            </div>
            <div class="event-content">
                <div class="event-title">${event.title}</div>
                <div class="event-details">${event.message}</div>
            </div>
            <div class="event-time">${this.formatTime(event.timestamp)}</div>
        `;

        eventsList.insertBefore(eventElement, eventsList.firstChild);

        // Keep only last 20 events visible
        while (eventsList.children.length > 20) {
            eventsList.removeChild(eventsList.lastChild);
        }
    }

    getEventIcon(type) {
        const icons = {
            ai_detection: 'fa-brain',
            access_denied: 'fa-ban',
            motion_detected: 'fa-running',
            door_forced: 'fa-exclamation-triangle',
            camera_offline: 'fa-video-slash',
            alarm_triggered: 'fa-bell'
        };
        return icons[type] || 'fa-shield-alt';
    }

    updateThreatLevel(event) {
        // Calculate overall threat level based on recent events
        const recentEvents = this.securityEvents.filter(e => 
            Date.now() - e.timestamp < 300000 // Last 5 minutes
        );

        let threatLevel = 'low';
        
        if (recentEvents.some(e => e.severity === 'critical')) {
            threatLevel = 'critical';
        } else if (recentEvents.some(e => e.severity === 'warning')) {
            threatLevel = 'high';
        } else if (recentEvents.length > 3) {
            threatLevel = 'medium';
        }

        this.updateThreatDisplay(threatLevel);
    }

    updateThreatDisplay(level) {
        const threatElement = document.querySelector('.threat-level');
        const threatText = document.querySelector('.threat-text');
        
        if (threatElement && threatText) {
            threatElement.className = `threat-level ${level}`;
            threatText.textContent = level.toUpperCase();
        }
    }

    updateSecurityStatistics() {
        // Update access statistics
        const today = new Date().toDateString();
        const todayAccess = this.accessLogs.filter(log => 
            new Date(log.timestamp).toDateString() === today
        );

        const granted = todayAccess.filter(log => log.type === 'granted').length;
        const denied = todayAccess.filter(log => log.type === 'denied').length;
        const unusual = todayAccess.filter(log => log.type === 'unusual').length;

        document.getElementById('access-today').textContent = todayAccess.length;
        document.getElementById('access-denied').textContent = denied;
        document.getElementById('unusual-access').textContent = unusual;
    }

    generateSecurityEvent() {
        const eventTypes = [
            {
                type: 'motion_detected',
                severity: 'warning',
                title: 'Motion Detected',
                message: 'Motion detected in secure area'
            },
            {
                type: 'camera_offline',
                severity: 'warning',
                title: 'Camera Offline',
                message: 'Security camera went offline'
            },
            {
                type: 'door_forced',
                severity: 'critical',
                title: 'Forced Entry',
                message: 'Forced entry attempt detected'
            },
            {
                type: 'alarm_triggered',
                severity: 'critical',
                title: 'Alarm Triggered',
                message: 'Security alarm activated'
            }
        ];

        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        this.createSecurityEvent({
            ...event,
            id: `event-${Date.now()}`,
            timestamp: Date.now()
        });
    }

    // Public API methods
    toggleZoneArm(zoneId) {
        const zone = this.securityZones.get(zoneId);
        if (zone) {
            zone.armed = !zone.armed;
            this.updateZoneDisplay(zoneId);
        }
    }

    updateZoneDisplay(zoneId) {
        const zoneElement = document.querySelector(`[data-zone="${zoneId}"]`);
        const zone = this.securityZones.get(zoneId);
        
        if (zoneElement && zone) {
            const button = zoneElement.querySelector('.zone-btn');
            if (button) {
                button.className = `zone-btn ${zone.armed ? 'armed' : ''}`;
                button.innerHTML = `
                    <i class="fas fa-${zone.armed ? 'lock' : 'unlock'}"></i>
                    ${zone.armed ? 'Armed' : 'Disarmed'}
                `;
            }
        }
    }

    viewZoneDetails(zoneId) {
        const zone = this.securityZones.get(zoneId);
        if (zone) {
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `Viewing details for ${zone.name}`,
                    'info'
                );
            }
        }
    }

    viewCamera(cameraId) {
        const camera = this.securityCameras.get(cameraId);
        if (camera) {
            if (window.notificationSystem) {
                window.notificationSystem.show(
                    `Opening camera feed: ${camera.name}`,
                    'info'
                );
            }
        }
    }

    toggleRecording(cameraId) {
        const camera = this.securityCameras.get(cameraId);
        if (camera) {
            camera.recording = !camera.recording;
            this.updateCameraDisplay(cameraId);
        }
    }

    updateCameraDisplay(cameraId) {
        const cameraElement = document.querySelector(`[data-camera="${cameraId}"]`);
        const camera = this.securityCameras.get(cameraId);
        
        if (cameraElement && camera) {
            const statusIndicator = cameraElement.querySelector('.camera-status');
            const recordingButton = cameraElement.querySelector('.camera-actions button:last-child');
            
            if (statusIndicator) {
                statusIndicator.className = `camera-status ${camera.recording ? 'recording' : ''}`;
            }
            
            if (recordingButton) {
                recordingButton.innerHTML = `
                    <i class="fas fa-${camera.recording ? 'stop' : 'play'}"></i>
                `;
            }
        }
    }

    lockdownAll() {
        this.securityZones.forEach((zone, zoneId) => {
            zone.armed = true;
            this.updateZoneDisplay(zoneId);
        });

        if (window.notificationSystem) {
            window.notificationSystem.show(
                'Emergency lockdown activated',
                'critical'
            );
        }
    }

    openAll() {
        this.securityZones.forEach((zone, zoneId) => {
            zone.armed = false;
            this.updateZoneDisplay(zoneId);
        });

        if (window.notificationSystem) {
            window.notificationSystem.show(
                'All zones unlocked',
                'info'
            );
        }
    }

    formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString();
    }
}

// Initialize advanced security system
window.advancedSecurity = new AdvancedSecuritySystem();

// Advanced Real-time Alerts System
// Intelligent alert management with escalation and automation

class AdvancedAlertsSystem {
    constructor() {
        this.alerts = [];
        this.alertRules = new Map();
        this.escalationLevels = ['info', 'warning', 'critical', 'emergency'];
        this.alertCategories = ['energy', 'security', 'device', 'occupancy', 'environmental', 'maintenance'];
        this.notificationChannels = ['dashboard', 'email', 'sms', 'push', 'webhook'];
        this.alertHistory = [];
        this.alertTemplates = new Map();
        this.initializeAdvancedAlerts();
    }

    initializeAdvancedAlerts() {
        this.setupAlertRules();
        this.createAlertInterface();
        this.setupAlertMonitoring();
        this.initializeAlertTemplates();
        this.startRealTimeAlertProcessing();
    }

    setupAlertRules() {
        // Energy Alert Rules
        this.alertRules.set('energy-spike', {
            condition: (data) => data.currentUsage > data.averageUsage * 1.5,
            severity: 'warning',
            message: 'Energy consumption spike detected',
            category: 'energy',
            cooldown: 300000 // 5 minutes
        });

        this.alertRules.set('energy-critical', {
            condition: (data) => data.currentUsage > data.maxCapacity * 0.9,
            severity: 'critical',
            message: 'Energy usage approaching critical levels',
            category: 'energy',
            cooldown: 60000 // 1 minute
        });

        // Security Alert Rules
        this.alertRules.set('unauthorized-access', {
            condition: (data) => data.accessType === 'unauthorized',
            severity: 'critical',
            message: 'Unauthorized access attempt detected',
            category: 'security',
            cooldown: 0 // immediate
        });

        this.alertRules.set('door-forced', {
            condition: (data) => data.doorStatus === 'forced',
            severity: 'emergency',
            message: 'Forced entry detected - immediate response required',
            category: 'security',
            cooldown: 0 // immediate
        });

        // Device Alert Rules
        this.alertRules.set('device-offline', {
            condition: (data) => data.status === 'offline' && data.criticalDevice,
            severity: 'warning',
            message: 'Critical device went offline',
            category: 'device',
            cooldown: 300000 // 5 minutes
        });

        this.alertRules.set('device-failure', {
            condition: (data) => data.health < 0.3,
            severity: 'critical',
            message: 'Device health critically low',
            category: 'device',
            cooldown: 120000 // 2 minutes
        });

        // Occupancy Alert Rules
        this.alertRules.set('overcrowding', {
            condition: (data) => data.occupancy > data.capacity * 0.95,
            severity: 'warning',
            message: 'Room approaching maximum capacity',
            category: 'occupancy',
            cooldown: 600000 // 10 minutes
        });

        this.alertRules.set('unusual-activity', {
            condition: (data) => data.activityScore > 0.8 && data.timeSlot === 'off-hours',
            severity: 'warning',
            message: 'Unusual activity detected during off-hours',
            category: 'security',
            cooldown: 900000 // 15 minutes
        });

        // Environmental Alert Rules
        this.alertRules.set('temperature-extreme', {
            condition: (data) => data.temperature > 30 || data.temperature < 15,
            severity: 'warning',
            message: 'Temperature outside optimal range',
            category: 'environmental',
            cooldown: 900000 // 15 minutes
        });

        // Maintenance Alert Rules
        this.alertRules.set('maintenance-due', {
            condition: (data) => data.nextMaintenance <= Date.now() + 86400000, // within 24 hours
            severity: 'info',
            message: 'Scheduled maintenance due soon',
            category: 'maintenance',
            cooldown: 3600000 // 1 hour
        });
    }

    createAlertInterface() {
        const alertSection = document.querySelector('#alerts .container');
        if (!alertSection) return;

        // Enhanced alert controls
        const alertControls = document.createElement('div');
        alertControls.className = 'alert-controls';
        alertControls.innerHTML = `
            <div class="alert-filters-advanced">
                <div class="filter-group">
                    <h4>Severity</h4>
                    <div class="severity-filters">
                        <label class="filter-checkbox">
                            <input type="checkbox" data-severity="all" checked>
                            <span>All</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-severity="emergency">
                            <span>Emergency</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-severity="critical">
                            <span>Critical</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-severity="warning">
                            <span>Warning</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-severity="info">
                            <span>Info</span>
                        </label>
                    </div>
                </div>
                <div class="filter-group">
                    <h4>Category</h4>
                    <div class="category-filters">
                        ${this.alertCategories.map(cat => `
                            <label class="filter-checkbox">
                                <input type="checkbox" data-category="${cat}" checked>
                                <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="filter-group">
                    <h4>Status</h4>
                    <div class="status-filters">
                        <label class="filter-checkbox">
                            <input type="checkbox" data-status="active" checked>
                            <span>Active</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-status="acknowledged">
                            <span>Acknowledged</span>
                        </label>
                        <label class="filter-checkbox">
                            <input type="checkbox" data-status="resolved">
                            <span>Resolved</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="alert-actions">
                <button class="btn btn-primary" onclick="advancedAlerts.acknowledgeAll()">
                    <i class="fas fa-check"></i>
                    Acknowledge All
                </button>
                <button class="btn btn-secondary" onclick="advancedAlerts.resolveAll()">
                    <i class="fas fa-check-double"></i>
                    Resolve All
                </button>
                <button class="btn btn-danger" onclick="advancedAlerts.triggerEmergency()">
                    <i class="fas fa-exclamation-triangle"></i>
                    Emergency
                </button>
            </div>
            <div class="alert-statistics">
                <div class="stat-item">
                    <span class="stat-value" id="active-alerts">0</span>
                    <span class="stat-label">Active</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="critical-alerts">0</span>
                    <span class="stat-label">Critical</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="resolved-today">0</span>
                    <span class="stat-label">Resolved Today</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="avg-response-time">0m</span>
                    <span class="stat-label">Avg Response</span>
                </div>
            </div>
        `;

        // Enhanced alert list
        const alertList = document.createElement('div');
        alertList.className = 'alert-list-advanced';
        alertList.id = 'alert-list-advanced';

        // Insert into page
        const existingTitle = alertSection.querySelector('h2');
        existingTitle.insertAdjacentElement('afterend', alertControls);
        alertControls.insertAdjacentElement('afterend', alertList);

        // Add styles
        this.addAlertStyles();
        this.setupAlertEventListeners();
    }

    addAlertStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .alert-controls {
                background: var(--card-bg);
                padding: 2rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
                margin-bottom: 2rem;
            }

            .alert-filters-advanced {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .filter-group h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .severity-filters,
            .category-filters,
            .status-filters {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .filter-checkbox {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 6px;
                transition: background 0.2s ease;
            }

            .filter-checkbox:hover {
                background: var(--light-bg);
            }

            .filter-checkbox input[type="checkbox"] {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }

            .alert-actions {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }

            .alert-statistics {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .stat-item {
                text-align: center;
                padding: 1rem;
                background: var(--light-bg);
                border-radius: 8px;
                border-left: 4px solid var(--primary-color);
            }

            .stat-value {
                display: block;
                font-size: 2rem;
                font-weight: bold;
                color: var(--primary-color);
            }

            .stat-label {
                display: block;
                color: var(--text-secondary);
                margin-top: 0.5rem;
            }

            .alert-list-advanced {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .alert-item-advanced {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .alert-item-advanced:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-2px);
            }

            .alert-item-advanced.emergency {
                border-left: 6px solid #dc2626;
                background: linear-gradient(90deg, rgba(220, 38, 38, 0.1) 0%, transparent 100%);
            }

            .alert-item-advanced.critical {
                border-left: 6px solid #ef4444;
                background: linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%);
            }

            .alert-item-advanced.warning {
                border-left: 6px solid #f59e0b;
                background: linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%);
            }

            .alert-item-advanced.info {
                border-left: 6px solid #3b82f6;
                background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
            }

            .alert-icon {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: white;
                flex-shrink: 0;
            }

            .alert-icon.emergency { background: #dc2626; }
            .alert-icon.critical { background: #ef4444; }
            .alert-icon.warning { background: #f59e0b; }
            .alert-icon.info { background: #3b82f6; }

            .alert-content {
                flex: 1;
            }

            .alert-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .alert-title {
                font-weight: 600;
                color: var(--text-primary);
            }

            .alert-timestamp {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            .alert-message {
                color: var(--text-secondary);
                line-height: 1.5;
                margin-bottom: 1rem;
            }

            .alert-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: var(--text-secondary);
            }

            .alert-actions-item {
                display: flex;
                gap: 0.5rem;
                margin-left: auto;
            }

            .alert-btn {
                padding: 0.25rem 0.75rem;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.2s ease;
            }

            .alert-btn.acknowledge {
                background: var(--primary-color);
                color: white;
            }

            .alert-btn.resolve {
                background: var(--secondary-color);
                color: white;
            }

            .alert-btn.escalate {
                background: var(--danger-color);
                color: white;
            }

            .alert-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            @media (max-width: 768px) {
                .alert-filters-advanced {
                    grid-template-columns: 1fr;
                }
                
                .alert-actions {
                    flex-direction: column;
                }
                
                .alert-statistics {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .alert-item-advanced {
                    flex-direction: column;
                    text-align: center;
                }
                
                .alert-actions-item {
                    margin-left: 0;
                    margin-top: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupAlertEventListeners() {
        // Filter checkboxes
        document.querySelectorAll('.filter-checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.filterAlerts());
        });

        // Auto-refresh alerts
        setInterval(() => this.updateAlertStatistics(), 5000);
    }

    processAlert(ruleName, data) {
        const rule = this.alertRules.get(ruleName);
        if (!rule) return;

        // Check cooldown
        const lastAlert = this.alerts.find(alert => 
            alert.rule === ruleName && 
            (Date.now() - alert.timestamp) < rule.cooldown
        );

        if (lastAlert) return;

        // Check condition
        if (rule.condition(data)) {
            this.createAlert({
                id: `alert-${Date.now()}`,
                rule: ruleName,
                severity: rule.severity,
                message: rule.message,
                category: rule.category,
                data: data,
                timestamp: Date.now(),
                status: 'active',
                acknowledged: false,
                resolved: false
            });
        }
    }

    createAlert(alertData) {
        this.alerts.unshift(alertData);
        this.alertHistory.push(alertData);

        // Keep only last 100 alerts in memory
        if (this.alerts.length > 100) {
            this.alerts = this.alerts.slice(0, 100);
        }

        // Update UI
        this.renderAlert(alertData);
        this.updateAlertStatistics();

        // Send notifications
        this.sendNotifications(alertData);

        // Store in storage
        if (window.storageManager) {
            window.storageManager.addAlert(alertData);
        }
    }

    renderAlert(alert) {
        const alertList = document.getElementById('alert-list-advanced');
        if (!alertList) return;

        const alertElement = document.createElement('div');
        alertElement.className = `alert-item-advanced ${alert.severity}`;
        alertElement.dataset.alertId = alert.id;
        alertElement.innerHTML = `
            <div class="alert-icon ${alert.severity}">
                <i class="fas ${this.getAlertIcon(alert.category, alert.severity)}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-header">
                    <span class="alert-title">${alert.message}</span>
                    <span class="alert-timestamp">${this.formatTime(alert.timestamp)}</span>
                </div>
                <div class="alert-message">
                    ${this.getAlertDetails(alert)}
                </div>
                <div class="alert-meta">
                    <span class="alert-category">${alert.category}</span>
                    <span class="alert-source">${alert.data.source || 'System'}</span>
                </div>
            </div>
            <div class="alert-actions-item">
                ${alert.status === 'active' ? `
                    <button class="alert-btn acknowledge" onclick="advancedAlerts.acknowledgeAlert('${alert.id}')">
                        <i class="fas fa-check"></i> Acknowledge
                    </button>
                    <button class="alert-btn resolve" onclick="advancedAlerts.resolveAlert('${alert.id}')">
                        <i class="fas fa-check-double"></i> Resolve
                    </button>
                ` : ''}
                ${alert.severity === 'critical' || alert.severity === 'emergency' ? `
                    <button class="alert-btn escalate" onclick="advancedAlerts.escalateAlert('${alert.id}')">
                        <i class="fas fa-arrow-up"></i> Escalate
                    </button>
                ` : ''}
            </div>
        `;

        alertList.insertBefore(alertElement, alertList.firstChild);

        // Animate in
        setTimeout(() => {
            alertElement.style.opacity = '1';
            alertElement.style.transform = 'translateY(0)';
        }, 100);
    }

    getAlertIcon(category, severity) {
        const icons = {
            energy: 'fa-bolt',
            security: 'fa-shield-alt',
            device: 'fa-microchip',
            occupancy: 'fa-users',
            environmental: 'fa-temperature-high',
            maintenance: 'fa-wrench'
        };
        return icons[category] || 'fa-exclamation-triangle';
    }

    getAlertDetails(alert) {
        const details = [];
        
        if (alert.data.currentUsage) {
            details.push(`Current Usage: ${alert.data.currentUsage} kWh`);
        }
        if (alert.data.temperature) {
            details.push(`Temperature: ${alert.data.temperature}°C`);
        }
        if (alert.data.occupancy) {
            details.push(`Occupancy: ${alert.data.occupancy}/${alert.data.capacity}`);
        }
        if (alert.data.location) {
            details.push(`Location: ${alert.data.location}`);
        }
        if (alert.data.device) {
            details.push(`Device: ${alert.data.device}`);
        }
        
        return details.join(' | ') || 'No additional details available';
    }

    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedAt = Date.now();
            this.updateAlertElement(alertId, 'acknowledged');
            this.updateAlertStatistics();
        }
    }

    resolveAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.resolved = true;
            alert.resolvedAt = Date.now();
            alert.status = 'resolved';
            this.updateAlertElement(alertId, 'resolved');
            this.updateAlertStatistics();
        }
    }

    escalateAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.escalated = true;
            alert.escalatedAt = Date.now();
            alert.severity = this.escalateSeverity(alert.severity);
            
            // Send escalation notifications
            this.sendEscalationNotification(alert);
            this.updateAlertElement(alertId, 'escalated');
            this.updateAlertStatistics();
        }
    }

    escalateSeverity(currentSeverity) {
        const escalationMap = {
            'info': 'warning',
            'warning': 'critical',
            'critical': 'emergency',
            'emergency': 'emergency'
        };
        return escalationMap[currentSeverity] || 'emergency';
    }

    updateAlertElement(alertId, action) {
        const element = document.querySelector(`[data-alert-id="${alertId}"]`);
        if (!element) return;

        if (action === 'acknowledged') {
            element.style.opacity = '0.7';
            element.querySelector('.alert-btn.acknowledge')?.remove();
        } else if (action === 'resolved') {
            element.style.opacity = '0.5';
            element.style.textDecoration = 'line-through';
            element.querySelectorAll('.alert-btn').forEach(btn => btn.remove());
        } else if (action === 'escalated') {
            element.classList.add('escalated');
            element.querySelector('.alert-btn.escalate')?.remove();
        }
    }

    acknowledgeAll() {
        this.alerts
            .filter(alert => alert.status === 'active' && !alert.acknowledged)
            .forEach(alert => this.acknowledgeAlert(alert.id));
    }

    resolveAll() {
        this.alerts
            .filter(alert => alert.status === 'active')
            .forEach(alert => this.resolveAlert(alert.id));
    }

    triggerEmergency() {
        this.createAlert({
            id: `emergency-${Date.now()}`,
            rule: 'manual-emergency',
            severity: 'emergency',
            message: 'MANUAL EMERGENCY ACTIVATED',
            category: 'security',
            data: { source: 'Manual', triggeredBy: 'User' },
            timestamp: Date.now(),
            status: 'active',
            acknowledged: false,
            resolved: false
        });
    }

    filterAlerts() {
        const severityFilters = Array.from(document.querySelectorAll('.severity-filters input:checked'))
            .map(input => input.dataset.severity);
        const categoryFilters = Array.from(document.querySelectorAll('.category-filters input:checked'))
            .map(input => input.dataset.category);
        const statusFilters = Array.from(document.querySelectorAll('.status-filters input:checked'))
            .map(input => input.dataset.status);

        const elements = document.querySelectorAll('.alert-item-advanced');
        elements.forEach(element => {
            const alertId = element.dataset.alertId;
            const alert = this.alerts.find(a => a.id === alertId);
            
            if (!alert) return;

            let show = true;

            // Severity filter
            if (!severityFilters.includes('all') && !severityFilters.includes(alert.severity)) {
                show = false;
            }

            // Category filter
            if (!categoryFilters.includes(alert.category)) {
                show = false;
            }

            // Status filter
            const alertStatus = alert.resolved ? 'resolved' : (alert.acknowledged ? 'acknowledged' : 'active');
            if (!statusFilters.includes(alertStatus)) {
                show = false;
            }

            element.style.display = show ? 'flex' : 'none';
        });
    }

    updateAlertStatistics() {
        const activeAlerts = this.alerts.filter(a => a.status === 'active').length;
        const criticalAlerts = this.alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;
        const resolvedToday = this.alertHistory.filter(a => 
            a.resolved && 
            new Date(a.resolvedAt).toDateString() === new Date().toDateString()
        ).length;
        
        const avgResponseTime = this.calculateAverageResponseTime();

        document.getElementById('active-alerts').textContent = activeAlerts;
        document.getElementById('critical-alerts').textContent = criticalAlerts;
        document.getElementById('resolved-today').textContent = resolvedToday;
        document.getElementById('avg-response-time').textContent = avgResponseTime;
    }

    calculateAverageResponseTime() {
        const resolvedAlerts = this.alertHistory.filter(a => a.resolved && a.acknowledgedAt);
        if (resolvedAlerts.length === 0) return '0m';

        const totalResponseTime = resolvedAlerts.reduce((sum, alert) => {
            return sum + (alert.acknowledgedAt - alert.timestamp);
        }, 0);

        const avgTime = totalResponseTime / resolvedAlerts.length;
        const minutes = Math.floor(avgTime / 60000);
        const seconds = Math.floor((avgTime % 60000) / 1000);

        return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }

    sendNotifications(alert) {
        // Dashboard notification
        if (window.notificationSystem) {
            window.notificationSystem.show(alert.message, alert.severity);
        }

        // Email notification (simulated)
        if (alert.severity === 'critical' || alert.severity === 'emergency') {
            console.log('Sending email notification:', alert);
        }

        // SMS notification (simulated)
        if (alert.severity === 'emergency') {
            console.log('Sending SMS notification:', alert);
        }
    }

    sendEscalationNotification(alert) {
        if (window.notificationSystem) {
            window.notificationSystem.show(
                `Alert escalated: ${alert.message}`,
                'critical'
            );
        }
    }

    formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString();
    }

    initializeAlertTemplates() {
        // Predefined alert templates
        this.alertTemplates.set('fire-alarm', {
            severity: 'emergency',
            message: 'Fire alarm activated - evacuate immediately',
            category: 'security',
            autoActions: ['unlock-exits', 'notify-fire-department', 'activate-sprinklers']
        });

        this.alertTemplates.set('power-outage', {
            severity: 'critical',
            message: 'Power outage detected in building',
            category: 'energy',
            autoActions: ['switch-to-backup', 'notify-maintenance']
        });

        this.alertTemplates.set('medical-emergency', {
            severity: 'emergency',
            message: 'Medical emergency reported',
            category: 'security',
            autoActions: ['notify-medical-team', 'guide-ambulance']
        });
    }

    setupAlertMonitoring() {
        // Monitor campus state for alert conditions
        setInterval(() => {
            this.monitorEnergyUsage();
            this.monitorSecurityEvents();
            this.monitorDeviceHealth();
            this.monitorOccupancy();
        }, 2000);
    }

    monitorEnergyUsage() {
        if (window.campusState) {
            this.processAlert('energy-spike', {
                currentUsage: window.campusState.energyUsage,
                averageUsage: 400,
                source: 'Energy Monitor'
            });

            this.processAlert('energy-critical', {
                currentUsage: window.campusState.energyUsage,
                maxCapacity: 1000,
                source: 'Energy Monitor'
            });
        }
    }

    monitorSecurityEvents() {
        // Simulate security monitoring
        if (Math.random() > 0.98) {
            this.processAlert('unauthorized-access', {
                accessType: 'unauthorized',
                location: 'Main Entrance',
                source: 'Security System'
            });
        }
    }

    monitorDeviceHealth() {
        if (window.campusState && window.campusState.devices) {
            Object.entries(window.campusState.devices).forEach(([deviceId, device]) => {
                if (device.status === 'offline') {
                    this.processAlert('device-offline', {
                        status: 'offline',
                        criticalDevice: deviceId.includes('sensor') || deviceId.includes('controller'),
                        device: deviceId,
                        source: 'Device Monitor'
                    });
                }

                if (device.health < 0.3) {
                    this.processAlert('device-failure', {
                        health: device.health,
                        device: deviceId,
                        source: 'Device Monitor'
                    });
                }
            });
        }
    }

    monitorOccupancy() {
        if (window.campusState && window.campusState.rooms) {
            Object.values(window.campusState.rooms).forEach(room => {
                if (room.occupancy > room.capacity * 0.95) {
                    this.processAlert('overcrowding', {
                        occupancy: room.occupancy,
                        capacity: room.capacity,
                        location: room.id,
                        source: 'Occupancy Monitor'
                    });
                }
            });
        }
    }

    startRealTimeAlertProcessing() {
        // Process queued alerts
        setInterval(() => {
            this.processAlertQueue();
        }, 1000);
    }

    processAlertQueue() {
        // Process any queued alerts
        if (this.alertQueue && this.alertQueue.length > 0) {
            this.alertQueue.forEach(alertData => {
                this.createAlert(alertData);
            });
            this.alertQueue = [];
        }
    }
}

// Initialize advanced alerts system
window.advancedAlerts = new AdvancedAlertsSystem();

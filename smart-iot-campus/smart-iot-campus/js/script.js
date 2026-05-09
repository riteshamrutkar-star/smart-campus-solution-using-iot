// Smart IoT Campus JavaScript - Advanced Version

// Global state with enhanced features
const campusState = {
    totalPeople: 0,
    energyUsage: 0,
    avgTemperature: 22,
    securityStatus: 'Secure',
    buildings: {
        'building-a': { usage: 0, capacity: 100, health: 0.9 },
        'building-b': { usage: 0, capacity: 80, health: 0.85 },
        'library': { usage: 0, capacity: 150, health: 0.95 }
    },
    rooms: {
        'room101': { 
            lights: false, 
            ac: false, 
            projector: false, 
            occupied: false, 
            occupancy: 0, 
            capacity: 50,
            lastActivity: Date.now()
        },
        'room202': { 
            lights: false, 
            ac: false, 
            equipment: false, 
            occupied: false, 
            occupancy: 0, 
            capacity: 30,
            lastActivity: Date.now()
        }
    },
    accessLog: [],
    alerts: [],
    devices: {
        'temp-sensor-1': { status: 'online', lastUpdate: Date.now(), health: 0.95 },
        'motion-sensor-1': { status: 'online', lastUpdate: Date.now(), health: 0.88 },
        'smart-light-1': { status: 'online', lastUpdate: Date.now(), health: 0.92 },
        'ac-controller-1': { status: 'online', lastUpdate: Date.now(), health: 0.90 }
    }
};

// Enhanced interactive JavaScript

// Interactive element handlers
function setupInteractiveElements() {
    // Stat card interactions
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            const statType = this.dataset.stat;
            showStatDetails(statType);
        });
        
        card.addEventListener('mouseenter', function() {
            this.classList.add('updating');
            setTimeout(() => this.classList.remove('updating'), 500);
        });
    });
    
    // Energy card interactions
    document.querySelectorAll('.energy-card').forEach(card => {
        card.addEventListener('click', function() {
            const building = this.dataset.building;
            showBuildingDetails(building);
        });
    });
    
    // Room panel interactions
    document.querySelectorAll('.control-panel').forEach(panel => {
        panel.addEventListener('click', function(e) {
            if (!e.target.classList.contains('control-btn')) {
                const roomId = this.dataset.room;
                showRoomDetails(roomId);
            }
        });
    });
    
    // Security card interactions
    document.querySelectorAll('.security-card').forEach(card => {
        card.addEventListener('click', function() {
            const section = this.dataset.section;
            showSecurityDetails(section);
        });
    });
    
    // Camera item interactions
    document.querySelectorAll('.camera-item').forEach(item => {
        item.addEventListener('click', function() {
            const cameraId = this.dataset.camera;
            showCameraFeed(cameraId);
        });
    });
    
    // AI card interactions
    document.querySelectorAll('.ai-card').forEach(card => {
        card.addEventListener('click', function() {
            const aiType = this.dataset.ai;
            showAIDetails(aiType);
        });
    });
    
    // Alert item interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.alert-item')) {
            const alertItem = e.target.closest('.alert-item');
            showAlertDetails(alertItem);
        }
    });
}

// Show detailed information for stats
function showStatDetails(statType) {
    const details = {
        people: {
            title: 'People Analytics',
            content: `Current: ${campusState.totalPeople} people\nPeak today: ${Math.floor(campusState.totalPeople * 1.3)}\nAverage: ${Math.floor(campusState.totalPeople * 0.8)}`,
            icon: 'fas fa-users'
        },
        energy: {
            title: 'Energy Analytics',
            content: `Current: ${campusState.energyUsage} kWh\nDaily forecast: ${Math.floor(campusState.energyUsage * 1.2)} kWh\nCost: $${(campusState.energyUsage * 0.12).toFixed(2)}`,
            icon: 'fas fa-bolt'
        },
        temperature: {
            title: 'Temperature Analytics',
            content: `Current: ${campusState.avgTemperature}°C\nTarget: 22°C\nHumidity: 45%`,
            icon: 'fas fa-temperature-high'
        },
        security: {
            title: 'Security Status',
            content: `Status: ${campusState.securityStatus}\nActive alerts: ${campusState.alerts.filter(a => a.severity === 'critical').length}\nPatrols: 3 active`,
            icon: 'fas fa-shield-alt'
        }
    };
    
    const detail = details[statType];
    if (detail) {
        showInteractiveModal(detail.title, detail.content, detail.icon);
    }
}

// Show building details
function showBuildingDetails(buildingId) {
    const building = campusState.buildings[buildingId];
    const details = {
        title: `${buildingId.replace('-', ' ').toUpperCase()} Details`,
        content: `Usage: ${building.usage} kWh\nCapacity: ${building.capacity} kWh\nEfficiency: ${((building.usage / building.capacity) * 100).toFixed(1)}%\nHealth: ${(building.health * 100).toFixed(1)}%`,
        icon: 'fas fa-building'
    };
    
    showInteractiveModal(details.title, details.content, details.icon);
}

// Show room details
function showRoomDetails(roomId) {
    const room = campusState.rooms[roomId];
    const devices = [];
    if (room.lights) devices.push('Lights');
    if (room.ac) devices.push('AC');
    if (room.projector) devices.push('Projector');
    if (room.equipment) devices.push('Equipment');
    
    const details = {
        title: `Room ${roomId.replace('room', '')} Details`,
        content: `Occupancy: ${room.occupancy}/${room.capacity}\nStatus: ${room.occupied ? 'Occupied' : 'Available'}\nActive devices: ${devices.length > 0 ? devices.join(', ') : 'None'}\nLast activity: ${formatTime(room.lastActivity)}`,
        icon: 'fas fa-door-open'
    };
    
    showInteractiveModal(details.title, details.content, details.icon);
}

// Show security details
function showSecurityDetails(section) {
    const details = {
        access: {
            title: 'Access Control Details',
            content: `Total entries today: ${Math.floor(Math.random() * 200) + 50}\nSecurity level: High\nActive badges: ${Math.floor(Math.random() * 500) + 100}\nAlerts: ${campusState.alerts.filter(a => a.type === 'security').length}`,
            icon: 'fas fa-user-shield'
        },
        cameras: {
            title: 'Camera System Details',
            content: `Total cameras: 12\nOnline: 10\nOffline: 2\nRecording: 8\nAI detection: Active`,
            icon: 'fas fa-video'
        }
    };
    
    const detail = details[section];
    if (detail) {
        showInteractiveModal(detail.title, detail.content, detail.icon);
    }
}

// Show camera feed (simulated)
function showCameraFeed(cameraId) {
    const details = {
        title: `Camera: ${cameraId.replace('-', ' ').toUpperCase()}`,
        content: `Status: Online\nResolution: 1080p\nRecording: Yes\nMotion detection: Active\nLast motion: ${formatTime(Date.now() - Math.random() * 3600000)}`,
        icon: 'fas fa-video'
    };
    
    showInteractiveModal(details.title, details.content, details.icon);
}

// Show AI details
function showAIDetails(aiType) {
    const details = {
        energy: {
            title: 'Energy AI Analysis',
            content: `Optimization potential: 15%\nSavings: $${(Math.random() * 100 + 50).toFixed(2)}/day\nRecommendations: 3 active\nLast analysis: ${formatTime(Date.now() - 3600000)}`,
            icon: 'fas fa-lightbulb'
        },
        prediction: {
            title: 'Predictive Analytics',
            content: `Model accuracy: 94.5%\nData points: 1,247\nForecast range: 24 hours\nConfidence: High`,
            icon: 'fas fa-chart-line'
        },
        anomaly: {
            title: 'Anomaly Detection',
            content: `Active anomalies: ${campusState.alerts.filter(a => a.type === 'device').length}\nFalse positives: 2%\nDetection rate: 98%\nLast scan: ${formatTime(Date.now() - 1800000)}`,
            icon: 'fas fa-exclamation-triangle'
        }
    };
    
    const detail = details[aiType];
    if (detail) {
        showInteractiveModal(detail.title, detail.content, detail.icon);
    }
}

// Show alert details
function showAlertDetails(alertItem) {
    const alertId = alertItem.querySelector('span')?.textContent || 'Unknown';
    const details = {
        title: 'Alert Details',
        content: `Alert: ${alertId}\nTime: ${formatTime(Date.now())}\nSeverity: ${alertItem.classList.contains('critical') ? 'Critical' : alertItem.classList.contains('warning') ? 'Warning' : 'Info'}\nActions: Review, Acknowledge, Resolve`,
        icon: 'fas fa-exclamation-circle'
    };
    
    showInteractiveModal(details.title, details.content, details.icon);
}

// Interactive modal system
function showInteractiveModal(title, content, icon) {
    const modal = document.createElement('div');
    modal.className = 'modal interactive-modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content interactive-modal-content">
            <span class="close interactive-close">&times;</span>
            <div class="modal-header">
                <i class="${icon}"></i>
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                <pre>${content}</pre>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-action">Action</button>
                <button class="btn btn-secondary modal-close">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.interactive-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.modal-action').addEventListener('click', () => {
        showNotification('Action executed successfully', 'success');
        closeModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Add entrance animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Enhanced control button interactions
function enhanceControlButtons() {
    document.querySelectorAll('.control-btn').forEach(btn => {
        // Add ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Add loading state simulation
        const originalOnClick = btn.onclick;
        btn.onclick = function(e) {
            if (!this.disabled) {
                this.classList.add('loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                    if (originalOnClick) {
                        originalOnClick.call(this, e);
                    }
                }, 300);
            }
        };
    });
}

// Enhanced energy meter interactions
function enhanceEnergyMeters() {
    document.querySelectorAll('.energy-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const meter = this.querySelector('.meter-fill');
            if (meter) {
                meter.style.transition = 'width 0.3s ease-out';
                const currentWidth = parseFloat(meter.style.width) || 0;
                meter.style.width = (currentWidth + 5) + '%';
                
                setTimeout(() => {
                    meter.style.width = currentWidth + '%';
                }, 300);
            }
        });
    });
}

// Add keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape to close modals
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            if (modal) {
                closeModal(modal);
            }
        }
        
        // Tab navigation for interactive elements
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll('.interactive, .control-btn, .btn');
            const focusedElement = document.activeElement;
            const currentIndex = Array.from(focusableElements).indexOf(focusedElement);
            
            if (e.shiftKey) {
                // Shift+Tab goes backwards
                if (currentIndex > 0) {
                    focusableElements[currentIndex - 1].focus();
                    e.preventDefault();
                }
            } else {
                // Tab goes forwards
                if (currentIndex < focusableElements.length - 1) {
                    focusableElements[currentIndex + 1].focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add sound effects (optional)
function setupSoundEffects() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    window.playSound = function(type) {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                break;
            case 'success':
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.15;
                break;
            case 'alert':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.2;
                break;
        }
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    };
}

// Initialize all interactive features
function initializeInteractiveFeatures() {
    setupInteractiveElements();
    enhanceControlButtons();
    enhanceEnergyMeters();
    setupKeyboardNavigation();
    
    // Optional: Setup sound effects
    if (window.AudioContext || window.webkitAudioContext) {
        setupSoundEffects();
    }
    
    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .interactive-modal {
            animation: modalFadeIn 0.3s ease-out;
        }
        
        .interactive-modal.active {
            opacity: 1;
        }
        
        .interactive-modal-content {
            animation: modalSlideIn 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header i {
            font-size: 1.5rem;
            color: var(--primary-color);
        }
        
        .modal-body pre {
            background: var(--light-bg);
            padding: 1rem;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
        }
        
        .control-btn.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        .control-btn.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 -8px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize notification system
function initializeNotifications() {
    window.notificationSystem = new NotificationSystem();
}

// Initialize alerts system
function initializeAlerts() {
    setupAlertFilters();
    generateInitialAlerts();
}

// Initialize advanced features
function initializeAdvancedFeatures() {
    // Initialize AI features if available
    if (window.aiEngine) {
        setTimeout(() => {
            window.aiEngine.generateRecommendations();
            window.aiEngine.updateForecastDisplay();
        }, 2000);
    }
    
    // Initialize storage if available
    if (window.storageManager) {
        loadStoredData();
    }
    
    // Setup PWA features
    setupPWAFeatures();
}

// Load stored data
function loadStoredData() {
    const preferences = window.storageManager.getPreferences();
    if (preferences.theme) {
        document.body.setAttribute('data-theme', preferences.theme);
    }
    
    const historicalAlerts = window.storageManager.getAlerts('all', 10);
    if (historicalAlerts.length > 0) {
        campusState.alerts = historicalAlerts;
        updateAlertsList();
    }
}

// Setup PWA features
function setupPWAFeatures() {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    
    // Setup install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        showInstallButton();
    });
    
    function showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install App';
        installBtn.className = 'btn btn-primary';
        installBtn.style.position = 'fixed';
        installBtn.style.bottom = '20px';
        installBtn.style.right = '20px';
        installBtn.style.zIndex = '1000';
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
                installBtn.remove();
            }
        });
        
        document.body.appendChild(installBtn);
    }
}

// Update dashboard statistics with enhanced animations
function updateDashboardStats() {
    // Simulate real-time data
    const newPeople = Math.floor(Math.random() * 500) + 100;
    const newEnergy = Math.floor(Math.random() * 1000) + 200;
    const newTemp = Math.floor(Math.random() * 8) + 18;
    
    // Animate value changes
    animateValue('total-people', campusState.totalPeople, newPeople, 1000);
    animateValue('energy-usage', campusState.energyUsage, newEnergy, 1000, ' kWh');
    animateValue('avg-temp', campusState.avgTemperature, newTemp, 1000, '°C');
    
    campusState.totalPeople = newPeople;
    campusState.energyUsage = newEnergy;
    campusState.avgTemperature = newTemp;
    
    // Update security status with animation
    const securityElement = document.getElementById('security-status');
    if (securityElement && securityElement.textContent !== campusState.securityStatus) {
        securityElement.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            securityElement.textContent = campusState.securityStatus;
            securityElement.style.animation = '';
        }, 250);
    }
}

// Animate numeric value changes
function animateValue(elementId, start, end, duration, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const range = end - start;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + range * easeOutQuart);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Update energy meters with enhanced animations
function updateEnergyMeters() {
    Object.keys(campusState.buildings).forEach(building => {
        const usage = Math.floor(Math.random() * 200) + 50;
        campusState.buildings[building].usage = usage;
        
        const meterElement = document.getElementById(`${building}-meter`);
        const usageElement = document.getElementById(`${building}-usage`);
        
        if (meterElement && usageElement) {
            const percentage = (usage / campusState.buildings[building].capacity) * 100;
            
            // Add color classes based on usage
            meterElement.classList.remove('warning', 'danger');
            if (percentage > 80) {
                meterElement.classList.add('danger');
            } else if (percentage > 60) {
                meterElement.classList.add('warning');
            }
            
            // Animate the meter fill
            meterElement.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            meterElement.style.width = `${Math.min(percentage, 100)}%`;
            
            // Animate the usage text
            animateValue(`${building}-usage`, 
                parseInt(usageElement.textContent) || 0, 
                usage, 
                1000, 
                ' kWh'
            );
        }
    });
}

// Update room status with enhanced animations
function updateRoomStatus() {
    Object.keys(campusState.rooms).forEach(roomId => {
        const room = campusState.rooms[roomId];
        const newOccupancy = Math.floor(Math.random() * room.capacity);
        const wasOccupied = room.occupied;
        room.occupancy = newOccupancy;
        room.occupied = newOccupancy > 0;
        room.lastActivity = Date.now();
        
        const statusElement = document.getElementById(`${roomId}-status`);
        const occupancyElement = document.getElementById(`${roomId}-occupancy`);
        
        if (statusElement && occupancyElement) {
            const newStatus = room.occupied ? 'Occupied' : 'Available';
            const statusChanged = statusElement.textContent !== newStatus;
            
            // Animate status change
            if (statusChanged) {
                statusElement.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    statusElement.textContent = newStatus;
                    statusElement.className = room.occupied ? 'status-indicator occupied' : 'status-indicator';
                    statusElement.style.animation = '';
                }, 250);
            }
            
            // Animate occupancy change
            animateValue(`${roomId}-occupancy`, 
                parseInt(occupancyElement.textContent) || 0, 
                newOccupancy, 
                800, 
                `/${room.capacity}`
            );
        }
    });
}

// Update security log
function updateSecurityLog() {
    const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];
    const actions = ['Entered Main Gate', 'Exited Library', 'Entered Building A', 'Exited Parking Lot', 'Entered Cafeteria'];
    
    const newEntry = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        person: names[Math.floor(Math.random() * names.length)],
        action: actions[Math.floor(Math.random() * actions.length)]
    };
    
    campusState.accessLog.unshift(newEntry);
    if (campusState.accessLog.length > 10) {
        campusState.accessLog.pop();
    }
    
    const logContainer = document.getElementById('access-log');
    if (logContainer) {
        logContainer.innerHTML = campusState.accessLog.map(entry => `
            <div class="log-entry">
                <span class="time">${entry.time}</span>
                <span class="person">${entry.person}</span>
                <span class="action">${entry.action}</span>
            </div>
        `).join('');
    }
}

// Room control functions
function toggleLight(roomId) {
    campusState.rooms[roomId].lights = !campusState.rooms[roomId].lights;
    showNotification(`${roomId} lights ${campusState.rooms[roomId].lights ? 'turned on' : 'turned off'}`);
    updateEnergyUsage();
}

function toggleAC(roomId) {
    campusState.rooms[roomId].ac = !campusState.rooms[roomId].ac;
    showNotification(`${roomId} AC ${campusState.rooms[roomId].ac ? 'turned on' : 'turned off'}`);
    updateEnergyUsage();
}

function toggleProjector(roomId) {
    if (campusState.rooms[roomId].projector !== undefined) {
        campusState.rooms[roomId].projector = !campusState.rooms[roomId].projector;
        showNotification(`${roomId} projector ${campusState.rooms[roomId].projector ? 'turned on' : 'turned off'}`);
        updateEnergyUsage();
    }
}

function toggleEquipment(roomId) {
    if (campusState.rooms[roomId].equipment !== undefined) {
        campusState.rooms[roomId].equipment = !campusState.rooms[roomId].equipment;
        showNotification(`${roomId} equipment ${campusState.rooms[roomId].equipment ? 'turned on' : 'turned off'}`);
        updateEnergyUsage();
    }
}

// Update device health status
function updateDeviceHealth() {
    Object.keys(campusState.devices).forEach(deviceId => {
        const device = campusState.devices[deviceId];
        // Simulate health degradation
        device.health = Math.max(0.7, device.health - Math.random() * 0.01);
        device.lastUpdate = Date.now();
        
        // Store health data
        if (window.storageManager) {
            window.storageManager.addDeviceHealth(deviceId, {
                health: device.health,
                status: device.status
            });
        }
    });
}

// Setup alert filters
function setupAlertFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateAlertsList(this.dataset.filter);
        });
    });
}

// Generate initial alerts
function generateInitialAlerts() {
    const initialAlerts = [
        {
            id: 'alert-1',
            type: 'energy',
            severity: 'warning',
            message: 'Energy consumption 15% above average',
            timestamp: Date.now() - 3600000
        },
        {
            id: 'alert-2',
            type: 'security',
            severity: 'info',
            message: 'Scheduled maintenance completed',
            timestamp: Date.now() - 7200000
        },
        {
            id: 'alert-3',
            type: 'device',
            severity: 'critical',
            message: 'Temperature sensor malfunction detected',
            timestamp: Date.now() - 1800000
        }
    ];
    
    campusState.alerts = initialAlerts;
    updateAlertsList('all');
}

// Update alerts list
function updateAlertsList(filter = 'all') {
    const alertsList = document.getElementById('alerts-list');
    if (!alertsList) return;
    
    let filteredAlerts = campusState.alerts;
    if (filter !== 'all') {
        filteredAlerts = campusState.alerts.filter(alert => alert.severity === filter);
    }
    
    alertsList.innerHTML = filteredAlerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <i class="fas fa-${getAlertIcon(alert.type)}"></i>
            <div class="alert-content">
                <span>${alert.message}</span>
                <small>${formatTime(alert.timestamp)}</small>
            </div>
        </div>
    `).join('');
}

// Get alert icon based on type
function getAlertIcon(type) {
    const icons = {
        energy: 'bolt',
        security: 'shield-alt',
        device: 'microchip',
        maintenance: 'wrench'
    };
    return icons[type] || 'exclamation-triangle';
}

// Format timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add new alert
function addAlert(type, severity, message) {
    const alert = {
        id: `alert-${Date.now()}`,
        type,
        severity,
        message,
        timestamp: Date.now()
    };
    
    campusState.alerts.unshift(alert);
    
    // Keep only last 50 alerts
    if (campusState.alerts.length > 50) {
        campusState.alerts = campusState.alerts.slice(0, 50);
    }
    
    // Update UI
    updateAlertsList();
    
    // Store alert
    if (window.storageManager) {
        window.storageManager.addAlert(alert);
    }
    
    // Show notification
    if (window.notificationSystem) {
        window.notificationSystem.show(message, severity);
    }
}

// Initialize charts
function initializeCharts() {
    // Energy Chart
    const energyCtx = document.getElementById('energy-chart');
    if (energyCtx) {
        new Chart(energyCtx, {
            type: 'line',
            data: {
                labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                datasets: [{
                    label: 'Energy Consumption (kWh)',
                    data: [150, 280, 450, 380, 520, 320],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Utilization Chart
    const utilizationCtx = document.getElementById('utilization-chart');
    if (utilizationCtx) {
        new Chart(utilizationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Lecture Halls', 'Labs', 'Library', 'Common Areas', 'Empty'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#2563eb',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#e5e7eb'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Cost Chart
    const costCtx = document.getElementById('cost-chart');
    if (costCtx) {
        new Chart(costCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Energy Cost ($)',
                    data: [120, 150, 180, 160, 200, 80, 60],
                    backgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Device Health Chart
    const healthCtx = document.getElementById('health-chart');
    if (healthCtx) {
        new Chart(healthCtx, {
            type: 'radar',
            data: {
                labels: ['Temperature Sensors', 'Motion Sensors', 'Smart Lights', 'AC Controllers', 'Security Cameras'],
                datasets: [{
                    label: 'Device Health (%)',
                    data: [95, 88, 92, 90, 85],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.2)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// Start real-time updates
function startRealTimeUpdates() {
    setInterval(() => {
        updateDashboardStats();
        updateEnergyMeters();
        updateRoomStatus();
        updateDeviceHealth();
        
        // Update security log every 10 seconds
        if (Math.random() > 0.7) {
            updateSecurityLog();
        }
        
        // Generate random alerts
        if (Math.random() > 0.9) {
            generateRandomAlert();
        }
        
        // Update AI insights
        if (window.aiEngine && Math.random() > 0.8) {
            window.aiEngine.updateForecastDisplay();
            window.aiEngine.updateAnomalyAlerts();
        }
        
        // Store occupancy data
        if (window.storageManager) {
            window.storageManager.addOccupancyData({
                count: campusState.totalPeople,
                rooms: campusState.rooms
            });
        }
    }, 5000);
}

// Generate random alerts
function generateRandomAlert() {
    const alertTypes = [
        { type: 'energy', severity: 'warning', message: 'Energy spike detected in Building A' },
        { type: 'security', severity: 'info', message: 'Security patrol completed' },
        { type: 'device', severity: 'critical', message: 'Sensor offline: temp-sensor-2' },
        { type: 'maintenance', severity: 'warning', message: 'Scheduled maintenance due for AC system' }
    ];
    
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    addAlert(randomAlert.type, randomAlert.severity, randomAlert.message);
}

// Enhanced setup event listeners
function setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    e.preventDefault();
                    document.getElementById('energy').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    e.preventDefault();
                    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    e.preventDefault();
                    document.getElementById('security').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '5':
                    e.preventDefault();
                    document.getElementById('analytics').scrollIntoView({ behavior: 'smooth' });
                    break;
                case '6':
                    e.preventDefault();
                    document.getElementById('ai-insights').scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });
    
    // Time range selector
    const timeRangeSelect = document.getElementById('time-range');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function() {
            updateChartsWithTimeRange(this.value);
        });
    }
}

// Update charts based on time range
function updateChartsWithTimeRange(timeRange) {
    // Get historical data based on time range
    const energyData = window.storageManager ? 
        window.storageManager.getEnergyData(timeRange) : 
        generateMockData(timeRange);
    
    // Update chart data
    // This would update the actual Chart.js instances
    console.log(`Updating charts for ${timeRange}:`, energyData);
}

// Generate mock data for demonstration
function generateMockData(timeRange) {
    const dataPoints = {
        day: 24,
        week: 7,
        month: 30
    };
    
    const points = dataPoints[timeRange] || 24;
    return Array.from({ length: points }, (_, i) => ({
        timestamp: Date.now() - (i * 3600000),
        usage: Math.random() * 100 + 50
    }));
}

// Notification System Class
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification-container');
        this.notifications = [];
        this.maxNotifications = 5;
    }
    
    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type);
        this.addNotification(notification);
        
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification.id);
            }, duration);
        }
        
        return notification.id;
    }
    
    createNotification(message, type) {
        const id = `notification-${Date.now()}`;
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = id;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="notificationSystem.removeNotification('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        return { id, element: notification };
    }
    
    addNotification(notification) {
        if (this.notifications.length >= this.maxNotifications) {
            const oldest = this.notifications.shift();
            if (oldest.element.parentNode) {
                oldest.element.remove();
            }
        }
        
        this.notifications.push(notification);
        this.container.appendChild(notification.element);
        
        // Animate in
        setTimeout(() => {
            notification.element.style.opacity = '1';
            notification.element.style.transform = 'translateX(0)';
        }, 10);
    }
    
    removeNotification(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            const notification = this.notifications[index];
            notification.element.style.opacity = '0';
            notification.element.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.element.parentNode) {
                    notification.element.remove();
                }
                this.notifications.splice(index, 1);
            }, 300);
        }
    }
    
    clear() {
        this.notifications.forEach(notification => {
            if (notification.element.parentNode) {
                notification.element.remove();
            }
        });
        this.notifications = [];
    }
}

// Show notification (toast) - Legacy function
function showNotification(message, type = 'info') {
    if (window.notificationSystem) {
        return window.notificationSystem.show(message, type);
    }
    
    // Fallback to original implementation
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Simulate IoT device connections
function simulateIoTConnections() {
    const devices = [
        { name: 'Temperature Sensor Building A', status: 'online' },
        { name: 'Motion Sensor Library', status: 'online' },
        { name: 'Smart Light Room 101', status: 'online' },
        { name: 'AC Controller Building B', status: 'online' },
        { name: 'Camera Main Entrance', status: 'online' }
    ];
    
    console.log('IoT Devices Connected:', devices);
    return devices;
}

// Initialize IoT connections
simulateIoTConnections();

// Export functions for external use if needed
window.SmartIoTCampus = {
    toggleLight,
    toggleAC,
    toggleProjector,
    toggleEquipment,
    campusState,
    addAlert,
    updateAlertsList,
    notificationSystem: null // Will be set after initialization
};

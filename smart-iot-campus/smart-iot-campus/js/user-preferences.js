// User Preferences and Customizable Dashboard
// Personalized dashboard experience with saved settings

class UserPreferences {
    constructor() {
        this.preferences = {
            dashboard: {
                layout: 'grid', // grid, list, compact
                refreshInterval: 5000,
                showAnimations: true,
                compactMode: false,
                defaultView: 'dashboard'
            },
            notifications: {
                enabled: true,
                sound: false,
                position: 'top-right', // top-right, top-left, bottom-right, bottom-left
                duration: 5000,
                types: {
                    critical: true,
                    warning: true,
                    info: true,
                    success: true
                }
            },
            data: {
                units: {
                    energy: 'kWh', // kWh, MWh, GJ
                    temperature: 'Celsius', // Celsius, Fahrenheit
                    currency: 'USD' // USD, EUR, GBP
                },
                precision: {
                    energy: 2,
                    temperature: 1,
                    currency: 2
                }
            },
            accessibility: {
                highContrast: false,
                largeText: false,
                reducedMotion: false,
                screenReader: true
            },
            performance: {
                enableAnimations: true,
                chartAnimations: true,
                dataRefresh: true,
                cacheData: true
            }
        };
        
        this.loadPreferences();
        this.initializePreferenceSystem();
    }

    loadPreferences() {
        const saved = localStorage.getItem('campusPreferences');
        if (saved) {
            try {
                const savedPrefs = JSON.parse(saved);
                this.preferences = this.mergePreferences(this.preferences, savedPrefs);
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        }
    }

    mergePreferences(defaultPrefs, savedPrefs) {
        return {
            dashboard: { ...defaultPrefs.dashboard, ...savedPrefs.dashboard },
            notifications: { ...defaultPrefs.notifications, ...savedPrefs.notifications },
            data: { ...defaultPrefs.data, ...savedPrefs.data },
            accessibility: { ...defaultPrefs.accessibility, ...savedPrefs.accessibility },
            performance: { ...defaultPrefs.performance, ...savedPrefs.performance }
        };
    }

    savePreferences() {
        localStorage.setItem('campusPreferences', JSON.stringify(this.preferences));
        this.applyPreferences();
        this.showNotification('Preferences saved successfully', 'success');
    }

    initializePreferenceSystem() {
        this.createPreferencePanel();
        this.applyPreferences();
        this.setupKeyboardShortcuts();
    }

    createPreferencePanel() {
        const preferencePanel = document.createElement('div');
        preferencePanel.className = 'preference-panel';
        preferencePanel.innerHTML = `
            <div class="preference-header">
                <h2><i class="fas fa-cog"></i> User Preferences</h2>
                <button class="close-btn" onclick="userPreferences.togglePanel()">&times;</button>
            </div>
            <div class="preference-content">
                <div class="preference-section">
                    <h3>Dashboard Layout</h3>
                    <div class="preference-group">
                        <label class="preference-label">
                            <span>Layout Style</span>
                            <select id="dashboard-layout" class="preference-select">
                                <option value="grid">Grid View</option>
                                <option value="list">List View</option>
                                <option value="compact">Compact View</option>
                            </select>
                        </label>
                        <label class="preference-label">
                            <span>Refresh Interval (ms)</span>
                            <input type="number" id="refresh-interval" class="preference-input" 
                                   value="${this.preferences.dashboard.refreshInterval}" min="1000" max="60000" step="1000">
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="show-animations" ${this.preferences.dashboard.showAnimations ? 'checked' : ''}>
                            <span>Show Animations</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="compact-mode" ${this.preferences.dashboard.compactMode ? 'checked' : ''}>
                            <span>Compact Mode</span>
                        </label>
                    </div>
                </div>

                <div class="preference-section">
                    <h3>Notifications</h3>
                    <div class="preference-group">
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="notifications-enabled" ${this.preferences.notifications.enabled ? 'checked' : ''}>
                            <span>Enable Notifications</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="sound-notifications" ${this.preferences.notifications.sound ? 'checked' : ''}>
                            <span>Sound Effects</span>
                        </label>
                        <label class="preference-label">
                            <span>Position</span>
                            <select id="notification-position" class="preference-select">
                                <option value="top-right">Top Right</option>
                                <option value="top-left">Top Left</option>
                                <option value="bottom-right">Bottom Right</option>
                                <option value="bottom-left">Bottom Left</option>
                            </select>
                        </label>
                        <label class="preference-label">
                            <span>Duration (ms)</span>
                            <input type="number" id="notification-duration" class="preference-input" 
                                   value="${this.preferences.notifications.duration}" min="1000" max="10000" step="500">
                        </label>
                    </div>
                </div>

                <div class="preference-section">
                    <h3>Data Units</h3>
                    <div class="preference-group">
                        <label class="preference-label">
                            <span>Energy Unit</span>
                            <select id="energy-unit" class="preference-select">
                                <option value="kWh">kWh</option>
                                <option value="MWh">MWh</option>
                                <option value="GJ">GJ</option>
                            </select>
                        </label>
                        <label class="preference-label">
                            <span>Temperature Unit</span>
                            <select id="temperature-unit" class="preference-select">
                                <option value="Celsius">Celsius</option>
                                <option value="Fahrenheit">Fahrenheit</option>
                            </select>
                        </label>
                        <label class="preference-label">
                            <span>Currency</span>
                            <select id="currency-unit" class="preference-select">
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div class="preference-section">
                    <h3>Accessibility</h3>
                    <div class="preference-group">
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="high-contrast" ${this.preferences.accessibility.highContrast ? 'checked' : ''}>
                            <span>High Contrast</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="large-text" ${this.preferences.accessibility.largeText ? 'checked' : ''}>
                            <span>Large Text</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="reduced-motion" ${this.preferences.accessibility.reducedMotion ? 'checked' : ''}>
                            <span>Reduced Motion</span>
                        </label>
                    </div>
                </div>

                <div class="preference-section">
                    <h3>Performance</h3>
                    <div class="preference-group">
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="chart-animations" ${this.preferences.performance.chartAnimations ? 'checked' : ''}>
                            <span>Chart Animations</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="data-refresh" ${this.preferences.performance.dataRefresh ? 'checked' : ''}>
                            <span>Auto Data Refresh</span>
                        </label>
                        <label class="preference-label checkbox-label">
                            <input type="checkbox" id="cache-data" ${this.preferences.performance.cacheData ? 'checked' : ''}>
                            <span>Cache Data</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="preference-actions">
                <button class="btn btn-primary" onclick="userPreferences.savePreferences()">
                    <i class="fas fa-save"></i>
                    Save Preferences
                </button>
                <button class="btn btn-secondary" onclick="userPreferences.resetPreferences()">
                    <i class="fas fa-undo"></i>
                    Reset to Default
                </button>
                <button class="btn btn-secondary" onclick="userPreferences.exportPreferences()">
                    <i class="fas fa-download"></i>
                    Export Settings
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(preferencePanel);
        this.addPreferenceStyles();
        this.setupPreferenceEventListeners();
    }

    addPreferenceStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .preference-panel {
                position: fixed;
                top: 0;
                right: -400px;
                width: 400px;
                height: 100vh;
                background: var(--card-bg);
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                transition: right 0.3s ease;
                overflow-y: auto;
            }

            .preference-panel.show {
                right: 0;
            }

            .preference-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                background: var(--primary-color);
                color: white;
            }

            .preference-header h2 {
                margin: 0;
                font-size: 1.2rem;
            }

            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .preference-content {
                padding: 1.5rem;
                max-height: calc(100vh - 200px);
                overflow-y: auto;
            }

            .preference-section {
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }

            .preference-section:last-child {
                border-bottom: none;
            }

            .preference-section h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .preference-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .preference-label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }

            .preference-select,
            .preference-input {
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                border-radius: 6px;
                background: var(--card-bg);
                color: var(--text-primary);
            }

            .preference-select {
                min-width: 150px;
            }

            .preference-input {
                width: 120px;
            }

            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
            }

            .checkbox-label input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .preference-actions {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid var(--border-color);
                justify-content: center;
            }

            .preference-panel.high-contrast {
                filter: contrast(1.5);
            }

            .preference-panel.large-text {
                font-size: 18px;
            }

            .preference-panel.reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            @media (max-width: 768px) {
                .preference-panel {
                    width: 100vw;
                    right: -100vw;
                }
                
                .preference-panel.show {
                    right: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupPreferenceEventListeners() {
        // Setup change listeners for all preference inputs
        const inputs = document.querySelectorAll('.preference-input, .preference-select, .preference-label input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updatePreferenceFromInput(input);
            });
        });
    }

    updatePreferenceFromInput(input) {
        const id = input.id;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        
        switch (id) {
            case 'dashboard-layout':
                this.preferences.dashboard.layout = value;
                break;
            case 'refresh-interval':
                this.preferences.dashboard.refreshInterval = parseInt(value);
                break;
            case 'show-animations':
                this.preferences.dashboard.showAnimations = value;
                break;
            case 'compact-mode':
                this.preferences.dashboard.compactMode = value;
                break;
            case 'notifications-enabled':
                this.preferences.notifications.enabled = value;
                break;
            case 'sound-notifications':
                this.preferences.notifications.sound = value;
                break;
            case 'notification-position':
                this.preferences.notifications.position = value;
                break;
            case 'notification-duration':
                this.preferences.notifications.duration = parseInt(value);
                break;
            case 'energy-unit':
                this.preferences.data.units.energy = value;
                break;
            case 'temperature-unit':
                this.preferences.data.units.temperature = value;
                break;
            case 'currency-unit':
                this.preferences.data.units.currency = value;
                break;
            case 'high-contrast':
                this.preferences.accessibility.highContrast = value;
                break;
            case 'large-text':
                this.preferences.accessibility.largeText = value;
                break;
            case 'reduced-motion':
                this.preferences.accessibility.reducedMotion = value;
                break;
            case 'chart-animations':
                this.preferences.performance.chartAnimations = value;
                break;
            case 'data-refresh':
                this.preferences.performance.dataRefresh = value;
                break;
            case 'cache-data':
                this.preferences.performance.cacheData = value;
                break;
        }
    }

    applyPreferences() {
        // Apply dashboard layout
        this.applyDashboardLayout();
        
        // Apply accessibility settings
        this.applyAccessibilitySettings();
        
        // Apply performance settings
        this.applyPerformanceSettings();
        
        // Apply data units
        this.applyDataUnits();
    }

    applyDashboardLayout() {
        const container = document.querySelector('.main');
        if (!container) return;
        
        container.className = `main ${this.preferences.dashboard.layout}-layout`;
        
        if (this.preferences.dashboard.compactMode) {
            container.classList.add('compact-mode');
        }
    }

    applyAccessibilitySettings() {
        const panel = document.querySelector('.preference-panel');
        if (panel) {
            if (this.preferences.accessibility.highContrast) {
                panel.classList.add('high-contrast');
            }
            if (this.preferences.accessibility.largeText) {
                panel.classList.add('large-text');
            }
            if (this.preferences.accessibility.reducedMotion) {
                panel.classList.add('reduced-motion');
            }
        }
    }

    applyPerformanceSettings() {
        if (!this.preferences.performance.chartAnimations) {
            document.documentElement.style.setProperty('--transition-normal', '0s');
            document.documentElement.style.setProperty('--transition-fast', '0s');
        }
        
        if (!this.preferences.performance.dataRefresh) {
            // Stop real-time updates
            if (window.dataFix) {
                clearInterval(window.dataFix.updateInterval);
            }
        }
    }

    applyDataUnits() {
        // Update energy display based on unit preference
        const energyElements = document.querySelectorAll('[data-energy]');
        energyElements.forEach(element => {
            const baseValue = parseFloat(element.dataset.energy);
            let displayValue = baseValue;
            
            switch (this.preferences.data.units.energy) {
                case 'MWh':
                    displayValue = (baseValue / 1000).toFixed(3);
                    break;
                case 'GJ':
                    displayValue = (baseValue * 0.0036).toFixed(3);
                    break;
            }
            
            element.textContent = displayValue + ' ' + this.preferences.data.units.energy;
        });
    }

    togglePanel() {
        const panel = document.querySelector('.preference-panel');
        if (panel) {
            panel.classList.toggle('show');
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + , to open preferences
            if ((e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                this.togglePanel();
            }
            
            // Ctrl/Cmd + S to save preferences
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.savePreferences();
            }
        });
    }

    resetPreferences() {
        if (confirm('Are you sure you want to reset all preferences to default values?')) {
            localStorage.removeItem('campusPreferences');
            location.reload();
        }
    }

    exportPreferences() {
        const dataStr = JSON.stringify(this.preferences, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'campus-preferences.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showNotification('Preferences exported successfully', 'success');
    }

    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        }
    }
}

// Create preferences button in header
function createPreferencesButton() {
    const header = document.querySelector('.header .container');
    if (header) {
        const prefButton = document.createElement('button');
        prefButton.className = 'preferences-btn';
        prefButton.innerHTML = '<i class="fas fa-cog"></i>';
        prefButton.title = 'User Preferences (Ctrl+,)';
        prefButton.onclick = () => userPreferences.togglePanel();
        header.appendChild(prefButton);
        
        // Add styles for the button
        const style = document.createElement('style');
        style.textContent = `
            .preferences-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                padding: 0.5rem 0.75rem;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-left: 1rem;
            }
            
            .preferences-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize preferences system
window.userPreferences = new UserPreferences();

// Add preferences button when DOM is ready
document.addEventListener('DOMContentLoaded', createPreferencesButton);

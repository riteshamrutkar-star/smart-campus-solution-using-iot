// Data Persistence and Storage Management
class StorageManager {
    constructor() {
        this.storageKey = 'smartCampusData';
        this.maxStorageSize = 5 * 1024 * 1024; // 5MB limit
        this.dataRetentionDays = 30;
        this.initializeStorage();
    }

    initializeStorage() {
        // Initialize storage structure if not exists
        if (!localStorage.getItem(this.storageKey)) {
            const initialData = {
                version: '1.0',
                created: Date.now(),
                historicalData: {
                    energy: [],
                    occupancy: [],
                    alerts: [],
                    deviceHealth: []
                },
                userPreferences: {
                    theme: 'light',
                    notifications: true,
                    autoRefresh: true,
                    refreshInterval: 5000
                },
                deviceSettings: {},
                lastBackup: null
            };
            this.saveData(initialData);
        }
        
        // Clean old data periodically
        this.cleanupOldData();
        
        // Setup automatic backup
        this.setupAutoBackup();
    }

    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading storage:', e);
            return null;
        }
    }

    saveData(data) {
        try {
            const jsonString = JSON.stringify(data);
            
            // Check storage size
            if (jsonString.length > this.maxStorageSize) {
                this.cleanupOldData();
                // Try again after cleanup
                if (jsonString.length > this.maxStorageSize) {
                    console.warn('Storage size exceeded, performing aggressive cleanup');
                    this.aggressiveCleanup();
                }
            }
            
            localStorage.setItem(this.storageKey, jsonString);
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    }

    // Historical data management
    addEnergyData(energyData) {
        const data = this.getData();
        if (data) {
            const entry = {
                timestamp: Date.now(),
                ...energyData
            };
            
            data.historicalData.energy.push(entry);
            this.saveData(data);
        }
    }

    addOccupancyData(occupancyData) {
        const data = this.getData();
        if (data) {
            const entry = {
                timestamp: Date.now(),
                ...occupancyData
            };
            
            data.historicalData.occupancy.push(entry);
            this.saveData(data);
        }
    }

    addAlert(alertData) {
        const data = this.getData();
        if (data) {
            const entry = {
                id: this.generateId(),
                timestamp: Date.now(),
                ...alertData
            };
            
            data.historicalData.alerts.push(entry);
            this.saveData(data);
            
            // Trigger notification if enabled
            if (data.userPreferences.notifications) {
                this.triggerNotification(entry);
            }
        }
    }

    addDeviceHealth(deviceId, healthData) {
        const data = this.getData();
        if (data) {
            const entry = {
                timestamp: Date.now(),
                deviceId,
                ...healthData
            };
            
            data.historicalData.deviceHealth.push(entry);
            this.saveData(data);
        }
    }

    // Data retrieval methods
    getEnergyData(timeRange = 'day') {
        const data = this.getData();
        if (!data) return [];
        
        const now = Date.now();
        const ranges = {
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            month: 30 * 24 * 60 * 60 * 1000
        };
        
        const cutoff = now - (ranges[timeRange] || ranges.day);
        
        return data.historicalData.energy.filter(entry => entry.timestamp > cutoff);
    }

    getOccupancyData(timeRange = 'day') {
        const data = this.getData();
        if (!data) return [];
        
        const now = Date.now();
        const ranges = {
            day: 24 * 60 * 60 * 1000,
            week: 7 * 24 * 60 * 60 * 1000,
            month: 30 * 24 * 60 * 60 * 1000
        };
        
        const cutoff = now - (ranges[timeRange] || ranges.day);
        
        return data.historicalData.occupancy.filter(entry => entry.timestamp > cutoff);
    }

    getAlerts(filter = 'all', limit = 50) {
        const data = this.getData();
        if (!data) return [];
        
        let alerts = data.historicalData.alerts;
        
        if (filter !== 'all') {
            alerts = alerts.filter(alert => alert.severity === filter);
        }
        
        return alerts.slice(-limit).reverse();
    }

    getDeviceHealth(deviceId = null) {
        const data = this.getData();
        if (!data) return [];
        
        let health = data.historicalData.deviceHealth;
        
        if (deviceId) {
            health = health.filter(entry => entry.deviceId === deviceId);
        }
        
        return health.slice(-100); // Last 100 entries
    }

    // User preferences
    updatePreferences(preferences) {
        const data = this.getData();
        if (data) {
            data.userPreferences = { ...data.userPreferences, ...preferences };
            this.saveData(data);
        }
    }

    getPreferences() {
        const data = this.getData();
        return data ? data.userPreferences : {};
    }

    // Device settings
    saveDeviceSettings(deviceId, settings) {
        const data = this.getData();
        if (data) {
            data.deviceSettings[deviceId] = settings;
            this.saveData(data);
        }
    }

    getDeviceSettings(deviceId) {
        const data = this.getData();
        return data && data.deviceSettings[deviceId] ? data.deviceSettings[deviceId] : {};
    }

    // Data cleanup
    cleanupOldData() {
        const data = this.getData();
        if (!data) return;
        
        const cutoff = Date.now() - (this.dataRetentionDays * 24 * 60 * 60 * 1000);
        
        Object.keys(data.historicalData).forEach(key => {
            data.historicalData[key] = data.historicalData[key].filter(
                entry => entry.timestamp > cutoff
            );
        });
        
        this.saveData(data);
    }

    aggressiveCleanup() {
        const data = this.getData();
        if (!data) return;
        
        // Keep only last 24 hours of data
        const cutoff = Date.now() - (24 * 60 * 60 * 1000);
        
        Object.keys(data.historicalData).forEach(key => {
            data.historicalData[key] = data.historicalData[key].filter(
                entry => entry.timestamp > cutoff
            );
        });
        
        this.saveData(data);
    }

    // Backup and restore
    exportData() {
        const data = this.getData();
        if (!data) return null;
        
        const exportData = {
            ...data,
            exportedAt: Date.now(),
            version: '1.0'
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    importData(jsonString) {
        try {
            const importData = JSON.parse(jsonString);
            
            // Validate data structure
            if (!this.validateImportData(importData)) {
                throw new Error('Invalid data format');
            }
            
            // Create backup before import
            this.createBackup();
            
            // Import data
            this.saveData(importData);
            
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }

    validateImportData(data) {
        const requiredFields = ['version', 'historicalData', 'userPreferences'];
        return requiredFields.every(field => data.hasOwnProperty(field));
    }

    createBackup() {
        const data = this.getData();
        if (data) {
            const backupKey = `${this.storageKey}_backup_${Date.now()}`;
            localStorage.setItem(backupKey, JSON.stringify(data));
            
            // Keep only last 5 backups
            const keys = Object.keys(localStorage).filter(key => 
                key.startsWith(`${this.storageKey}_backup_`)
            ).sort();
            
            while (keys.length > 5) {
                localStorage.removeItem(keys.shift());
            }
        }
    }

    setupAutoBackup() {
        // Backup every 24 hours
        setInterval(() => {
            this.createBackup();
        }, 24 * 60 * 60 * 1000);
    }

    // Analytics and statistics
    getStatistics(timeRange = 'day') {
        const energyData = this.getEnergyData(timeRange);
        const occupancyData = this.getOccupancyData(timeRange);
        const alerts = this.getAlerts('all', 1000);
        
        if (energyData.length === 0) return null;
        
        const totalEnergy = energyData.reduce((sum, entry) => sum + (entry.usage || 0), 0);
        const avgEnergy = totalEnergy / energyData.length;
        const peakEnergy = Math.max(...energyData.map(entry => entry.usage || 0));
        
        const totalOccupancy = occupancyData.reduce((sum, entry) => sum + (entry.count || 0), 0);
        const avgOccupancy = totalOccupancy / occupancyData.length;
        const peakOccupancy = Math.max(...occupancyData.map(entry => entry.count || 0));
        
        const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
        const warningAlerts = alerts.filter(alert => alert.severity === 'warning').length;
        
        return {
            energy: {
                total: totalEnergy,
                average: avgEnergy,
                peak: peakEnergy
            },
            occupancy: {
                total: totalOccupancy,
                average: avgOccupancy,
                peak: peakOccupancy
            },
            alerts: {
                critical: criticalAlerts,
                warning: warningAlerts,
                total: alerts.length
            }
        };
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    triggerNotification(alert) {
        if (window.notificationSystem) {
            window.notificationSystem.show(alert.message, alert.severity);
        }
    }

    // Storage optimization
    optimizeStorage() {
        const data = this.getData();
        if (!data) return;
        
        // Compress historical data by aggregating hourly
        const compressed = this.compressData(data.historicalData);
        data.historicalData = compressed;
        
        this.saveData(data);
    }

    compressData(historicalData) {
        const compressed = {};
        
        Object.keys(historicalData).forEach(key => {
            const data = historicalData[key];
            const hourlyData = {};
            
            data.forEach(entry => {
                const hour = Math.floor(entry.timestamp / (60 * 60 * 1000));
                if (!hourlyData[hour]) {
                    hourlyData[hour] = {
                        timestamp: hour * 60 * 60 * 1000,
                        count: 0,
                        sum: 0,
                        min: Infinity,
                        max: -Infinity
                    };
                }
                
                const value = entry.usage || entry.count || 0;
                hourlyData[hour].count++;
                hourlyData[hour].sum += value;
                hourlyData[hour].min = Math.min(hourlyData[hour].min, value);
                hourlyData[hour].max = Math.max(hourlyData[hour].max, value);
            });
            
            compressed[key] = Object.values(hourlyData).map(hour => ({
                timestamp: hour.timestamp,
                average: hour.sum / hour.count,
                min: hour.min,
                max: hour.max,
                count: hour.count
            }));
        });
        
        return compressed;
    }
}

// Initialize storage manager
window.storageManager = new StorageManager();

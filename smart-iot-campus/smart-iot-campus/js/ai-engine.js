// AI Engine for Smart Campus Analytics and Predictions
class AIEngine {
    constructor() {
        this.models = {
            energy: new EnergyPredictionModel(),
            occupancy: new OccupancyPredictionModel(),
            anomaly: new AnomalyDetectionModel(),
            optimization: new OptimizationEngine()
        };
        this.recommendations = [];
        this.isInitialized = false;
        this.initializeAI();
    }

    async initializeAI() {
        // Load trained models (simulated)
        await this.loadModels();
        this.isInitialized = true;
        console.log('AI Engine initialized successfully');
    }

    async loadModels() {
        // Simulate model loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Initialize with historical data
        const historicalData = window.storageManager?.getEnergyData('month') || [];
        this.models.energy.train(historicalData);
        this.models.anomaly.train(historicalData);
    }

    // Generate AI recommendations
    generateRecommendations() {
        const recommendations = [];
        
        // Energy optimization recommendations
        const energyRecs = this.models.optimization.generateEnergyRecommendations();
        recommendations.push(...energyRecs);
        
        // Occupancy optimization
        const occupancyRecs = this.models.optimization.generateOccupancyRecommendations();
        recommendations.push(...occupancyRecs);
        
        // Maintenance predictions
        const maintenanceRecs = this.generateMaintenanceRecommendations();
        recommendations.push(...maintenanceRecs);
        
        // Sort by priority
        recommendations.sort((a, b) => this.getPriorityScore(b.priority) - this.getPriorityScore(a.priority));
        
        this.recommendations = recommendations;
        this.updateRecommendationsUI();
        
        return recommendations;
    }

    getPriorityScore(priority) {
        const scores = { critical: 3, high: 2, medium: 1, low: 0 };
        return scores[priority] || 0;
    }

    // Predict energy consumption
    predictEnergyConsumption(hoursAhead = 24) {
        if (!this.isInitialized) return null;
        
        const prediction = this.models.energy.predict(hoursAhead);
        return {
            predicted: prediction.value,
            confidence: prediction.confidence,
            range: {
                min: prediction.value * 0.9,
                max: prediction.value * 1.1
            },
            factors: prediction.factors
        };
    }

    // Predict occupancy patterns
    predictOccupancy(location, timeAhead = 8) {
        if (!this.isInitialized) return null;
        
        const prediction = this.models.occupancy.predict(location, timeAhead);
        return {
            predicted: prediction.value,
            confidence: prediction.confidence,
            peakTime: prediction.peakTime,
            factors: prediction.factors
        };
    }

    // Detect anomalies
    detectAnomalies(data) {
        if (!this.isInitialized) return [];
        
        const anomalies = this.models.anomaly.detect(data);
        return anomalies.map(anomaly => ({
            type: anomaly.type,
            severity: anomaly.severity,
            description: anomaly.description,
            confidence: anomaly.confidence,
            timestamp: anomaly.timestamp,
            recommendations: anomaly.recommendations
        }));
    }

    // Generate maintenance recommendations
    generateMaintenanceRecommendations() {
        const recommendations = [];
        const deviceHealth = window.storageManager?.getDeviceHealth() || [];
        
        // Analyze device health patterns
        const deviceAnalysis = this.analyzeDeviceHealth(deviceHealth);
        
        Object.entries(deviceAnalysis).forEach(([deviceId, analysis]) => {
            if (analysis.healthScore < 0.7) {
                recommendations.push({
                    id: `maintenance-${deviceId}`,
                    type: 'maintenance',
                    priority: analysis.healthScore < 0.4 ? 'critical' : 'high',
                    title: `Maintenance Required: ${deviceId}`,
                    description: `Device health score: ${(analysis.healthScore * 100).toFixed(1)}%. ${analysis.reason}`,
                    action: 'Schedule maintenance',
                    deviceId: deviceId
                });
            }
        });
        
        return recommendations;
    }

    analyzeDeviceHealth(deviceHealth) {
        const analysis = {};
        
        // Group by device
        const devices = {};
        deviceHealth.forEach(entry => {
            if (!devices[entry.deviceId]) {
                devices[entry.deviceId] = [];
            }
            devices[entry.deviceId].push(entry);
        });
        
        // Analyze each device
        Object.entries(devices).forEach(([deviceId, entries]) => {
            const recentEntries = entries.slice(-10); // Last 10 entries
            const avgHealth = recentEntries.reduce((sum, entry) => sum + (entry.health || 0.5), 0) / recentEntries.length;
            const trend = this.calculateTrend(recentEntries.map(e => e.health || 0.5));
            
            analysis[deviceId] = {
                healthScore: avgHealth,
                trend: trend,
                reason: trend < -0.1 ? 'Declining performance detected' : 'Below optimal health'
            };
        });
        
        return analysis;
    }

    calculateTrend(values) {
        if (values.length < 2) return 0;
        
        const n = values.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = values.reduce((sum, val, i) => sum + (i * val), 0);
        const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return slope;
    }

    // Update UI with recommendations
    updateRecommendationsUI() {
        const container = document.getElementById('energy-recommendations');
        if (!container) return;
        
        const energyRecs = this.recommendations.filter(rec => rec.type === 'energy');
        
        container.innerHTML = energyRecs.slice(0, 3).map(rec => `
            <div class="recommendation-item">
                <span class="priority ${rec.priority}">${rec.priority.toUpperCase()}</span>
                <p>${rec.description}</p>
                <button class="btn btn-sm btn-primary" onclick="aiEngine.applyRecommendation('${rec.id}')">
                    Apply
                </button>
            </div>
        `).join('');
    }

    // Apply recommendation
    async applyRecommendation(recommendationId) {
        const recommendation = this.recommendations.find(rec => rec.id === recommendationId);
        if (!recommendation) return;
        
        try {
            await this.executeRecommendation(recommendation);
            
            // Update UI
            this.showNotification(`Applied: ${recommendation.title}`, 'success');
            
            // Remove applied recommendation
            this.recommendations = this.recommendations.filter(rec => rec.id !== recommendationId);
            this.updateRecommendationsUI();
            
        } catch (error) {
            this.showNotification(`Failed to apply recommendation: ${error.message}`, 'error');
        }
    }

    async executeRecommendation(recommendation) {
        switch (recommendation.type) {
            case 'energy':
                return this.executeEnergyRecommendation(recommendation);
            case 'occupancy':
                return this.executeOccupancyRecommendation(recommendation);
            case 'maintenance':
                return this.executeMaintenanceRecommendation(recommendation);
            default:
                throw new Error('Unknown recommendation type');
        }
    }

    executeEnergyRecommendation(recommendation) {
        // Simulate applying energy optimization
        return new Promise(resolve => {
            setTimeout(() => {
                // Update campus state
                if (window.campusState) {
                    window.campusState.energyUsage *= 0.95; // 5% reduction
                }
                resolve();
            }, 1000);
        });
    }

    executeOccupancyRecommendation(recommendation) {
        // Simulate applying occupancy optimization
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    executeMaintenanceRecommendation(recommendation) {
        // Simulate scheduling maintenance
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    // Update forecast display
    updateForecastDisplay() {
        const forecast = this.predictEnergyConsumption(24);
        if (!forecast) return;
        
        const forecastElement = document.getElementById('energy-forecast');
        if (forecastElement) {
            forecastElement.textContent = `${Math.round(forecast.predicted)} kWh`;
        }
    }

    // Update anomaly alerts
    updateAnomalyAlerts() {
        const currentData = this.getCurrentData();
        const anomalies = this.detectAnomalies(currentData);
        
        const container = document.getElementById('anomaly-alerts');
        if (!container) return;
        
        container.innerHTML = anomalies.map(anomaly => `
            <div class="alert-item ${anomaly.severity}">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${anomaly.description}</span>
                <small>Confidence: ${(anomaly.confidence * 100).toFixed(1)}%</small>
            </div>
        `).join('');
    }

    getCurrentData() {
        // Get current campus data for anomaly detection
        return {
            energy: window.campusState?.energyUsage || 0,
            occupancy: window.campusState?.totalPeople || 0,
            temperature: window.campusState?.avgTemperature || 20,
            timestamp: Date.now()
        };
    }

    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        }
    }
}

// Energy Prediction Model
class EnergyPredictionModel {
    constructor() {
        this.weights = null;
        this.bias = null;
        this.isTrained = false;
    }

    train(data) {
        // Simple linear regression model (simulated)
        if (data.length < 10) {
            // Use default weights if insufficient data
            this.weights = [0.7, 0.2, 0.1];
            this.bias = 50;
        } else {
            // Train on historical data
            this.weights = this.calculateWeights(data);
            this.bias = this.calculateBias(data);
        }
        this.isTrained = true;
    }

    calculateWeights(data) {
        // Simplified weight calculation
        return [0.6, 0.3, 0.1]; // [time, occupancy, temperature]
    }

    calculateBias(data) {
        return Math.random() * 20 + 40;
    }

    predict(hoursAhead) {
        if (!this.isTrained) {
            return { value: 500, confidence: 0.5, factors: [] };
        }
        
        const time = new Date().getHours();
        const occupancy = window.campusState?.totalPeople || 100;
        const temperature = window.campusState?.avgTemperature || 22;
        
        const prediction = (
            this.weights[0] * time +
            this.weights[1] * occupancy +
            this.weights[2] * temperature +
            this.bias
        );
        
        return {
            value: Math.max(0, prediction),
            confidence: 0.85,
            factors: ['time_of_day', 'occupancy', 'temperature']
        };
    }
}

// Occupancy Prediction Model
class OccupancyPredictionModel {
    constructor() {
        this.patterns = {};
        this.isTrained = false;
    }

    train(data) {
        // Extract patterns from historical data
        this.patterns = this.extractPatterns(data);
        this.isTrained = true;
    }

    extractPatterns(data) {
        // Simplified pattern extraction
        return {
            hourly: [30, 45, 60, 80, 120, 150, 180, 200, 180, 150, 120, 100, 80, 60, 45, 30, 25, 20, 15, 10, 8, 5, 3, 2],
            daily: [200, 250, 300, 280, 320, 350, 180]
        };
    }

    predict(location, hoursAhead) {
        if (!this.isTrained) {
            return { value: 50, confidence: 0.4, peakTime: null, factors: [] };
        }
        
        const currentHour = new Date().getHours();
        const targetHour = (currentHour + hoursAhead) % 24;
        
        const prediction = this.patterns.hourly[targetHour] || 50;
        
        return {
            value: prediction,
            confidence: 0.75,
            peakTime: this.findPeakTime(),
            factors: ['historical_patterns', 'day_of_week', 'time_of_day']
        };
    }

    findPeakTime() {
        const maxIndex = this.patterns.hourly.indexOf(Math.max(...this.patterns.hourly));
        return `${maxIndex}:00`;
    }
}

// Anomaly Detection Model
class AnomalyDetectionModel {
    constructor() {
        this.thresholds = {};
        this.isTrained = false;
    }

    train(data) {
        // Calculate normal ranges
        this.thresholds = this.calculateThresholds(data);
        this.isTrained = true;
    }

    calculateThresholds(data) {
        if (data.length === 0) {
            return { energy: { min: 100, max: 1000 }, occupancy: { min: 10, max: 500 } };
        }
        
        const energyValues = data.map(d => d.usage || 0);
        const occupancyValues = data.map(d => d.count || 0);
        
        return {
            energy: {
                min: Math.min(...energyValues) * 0.5,
                max: Math.max(...energyValues) * 2
            },
            occupancy: {
                min: Math.min(...occupancyValues) * 0.5,
                max: Math.max(...occupancyValues) * 2
            }
        };
    }

    detect(data) {
        if (!this.isTrained) return [];
        
        const anomalies = [];
        
        // Check energy anomalies
        if (data.energy < this.thresholds.energy.min || data.energy > this.thresholds.energy.max) {
            anomalies.push({
                type: 'energy',
                severity: data.energy > this.thresholds.energy.max ? 'critical' : 'warning',
                description: `Unusual energy consumption: ${data.energy} kWh`,
                confidence: 0.8,
                timestamp: data.timestamp,
                recommendations: ['Check for equipment malfunction', 'Verify sensor accuracy']
            });
        }
        
        // Check occupancy anomalies
        if (data.occupancy < this.thresholds.occupancy.min || data.occupancy > this.thresholds.occupancy.max) {
            anomalies.push({
                type: 'occupancy',
                severity: data.occupancy > this.thresholds.occupancy.max ? 'warning' : 'info',
                description: `Unusual occupancy level: ${data.occupancy} people`,
                confidence: 0.7,
                timestamp: data.timestamp,
                recommendations: ['Verify counting sensors', 'Check for special events']
            });
        }
        
        return anomalies;
    }
}

// Optimization Engine
class OptimizationEngine {
    generateEnergyRecommendations() {
        const recommendations = [];
        const currentState = window.campusState;
        
        if (!currentState) return recommendations;
        
        // Analyze energy usage patterns
        const energyPerPerson = currentState.energyUsage / Math.max(currentState.totalPeople, 1);
        
        if (energyPerPerson > 3) {
            recommendations.push({
                id: 'energy-optimization-1',
                type: 'energy',
                priority: 'high',
                title: 'High Energy Per Person',
                description: `Energy usage per person is ${energyPerPerson.toFixed(2)} kWh. Consider optimizing HVAC systems.`,
                action: 'Optimize HVAC'
            });
        }
        
        // Check building-specific usage
        Object.entries(currentState.buildings).forEach(([buildingId, building]) => {
            const utilization = building.usage / building.capacity;
            if (utilization > 0.9) {
                recommendations.push({
                    id: `building-${buildingId}-optimization`,
                    type: 'energy',
                    priority: 'medium',
                    title: `High Usage in ${buildingId}`,
                    description: `${buildingId} is at ${(utilization * 100).toFixed(1)}% capacity. Consider load balancing.`,
                    action: 'Redistribute Load'
                });
            }
        });
        
        return recommendations;
    }

    generateOccupancyRecommendations() {
        const recommendations = [];
        const currentState = window.campusState;
        
        if (!currentState) return recommendations;
        
        // Analyze room utilization
        Object.entries(currentState.rooms).forEach(([roomId, room]) => {
            const utilization = room.occupancy / room.capacity;
            
            if (utilization < 0.3 && room.lights) {
                recommendations.push({
                    id: `room-${roomId}-lights`,
                    type: 'occupancy',
                    priority: 'medium',
                    title: `Unused Room Lights On`,
                    description: `${roomId} is ${(utilization * 100).toFixed(1)}% occupied but lights are on.`,
                    action: 'Turn off lights'
                });
            }
            
            if (utilization < 0.2 && room.ac) {
                recommendations.push({
                    id: `room-${roomId}-ac`,
                    type: 'occupancy',
                    priority: 'low',
                    title: `Unused Room AC On`,
                    description: `${roomId} is ${(utilization * 100).toFixed(1)}% occupied but AC is running.`,
                    action: 'Turn off AC'
                });
            }
        });
        
        return recommendations;
    }
}

// Initialize AI Engine
window.aiEngine = new AIEngine();

// Advanced Charts and Data Visualization
// Multiple chart types with enhanced interactivity

class AdvancedCharts {
    constructor() {
        this.chartInstances = {};
        this.chartTypes = ['line', 'bar', 'doughnut', 'radar', 'polarArea', 'scatter', 'bubble'];
        this.initializeAdvancedCharts();
    }

    initializeAdvancedCharts() {
        this.createAdvancedEnergyChart();
        this.createOccupancyHeatmap();
        this.createDeviceTimeline();
        this.createCostBreakdown();
        this.createPerformanceMetrics();
        this.startRealTimeUpdates();
    }

    createAdvancedEnergyChart() {
        const ctx = document.getElementById('advanced-energy-chart');
        if (!ctx) return;

        this.chartInstances.energy = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.generateTimeLabels(24),
                datasets: [
                    {
                        label: 'Current Usage',
                        data: this.generateRandomData(24, 200, 600),
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Predicted Usage',
                        data: this.generateRandomData(24, 180, 550),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Optimal Usage',
                        data: this.generateRandomData(24, 150, 400),
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderDash: [2, 2],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Energy (kWh)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time (Hours)'
                        }
                    }
                }
            }
        });
    }

    createOccupancyHeatmap() {
        const ctx = document.getElementById('occupancy-heatmap');
        if (!ctx) return;

        // Generate heatmap data
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
        const data = days.map(() => 
            hours.map(() => Math.floor(Math.random() * 100))
        );

        this.chartInstances.heatmap = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    label: 'Occupancy Rate',
                    data: this.generateBubbleData(data, days, hours),
                    backgroundColor: 'rgba(37, 99, 235, 0.6)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const day = days[context.raw.x];
                                const hour = hours[context.raw.y];
                                const value = context.raw.v;
                                return `${day} ${hour}: ${value}% occupancy`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: days,
                        title: {
                            display: true,
                            text: 'Day of Week'
                        }
                    },
                    y: {
                        type: 'category',
                        labels: hours,
                        title: {
                            display: true,
                            text: 'Hour of Day'
                        }
                    }
                }
            }
        });
    }

    createDeviceTimeline() {
        const ctx = document.getElementById('device-timeline');
        if (!ctx) return;

        this.chartInstances.timeline = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Active Devices',
                        data: this.generateTimelineData('active'),
                        backgroundColor: '#10b981'
                    },
                    {
                        label: 'Maintenance Required',
                        data: this.generateTimelineData('maintenance'),
                        backgroundColor: '#f59e0b'
                    },
                    {
                        label: 'Offline Devices',
                        data: this.generateTimelineData('offline'),
                        backgroundColor: '#ef4444'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'hour',
                            displayFormats: {
                                hour: 'HH:mm'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Device Count'
                        }
                    }
                }
            }
        });
    }

    createCostBreakdown() {
        const ctx = document.getElementById('cost-breakdown');
        if (!ctx) return;

        this.chartInstances.costBreakdown = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['HVAC', 'Lighting', 'Equipment', 'Security', 'Other'],
                datasets: [{
                    label: 'Daily Cost Breakdown',
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.6)',
                        'rgba(16, 185, 129, 0.6)',
                        'rgba(245, 158, 11, 0.6)',
                        'rgba(239, 68, 68, 0.6)',
                        'rgba(107, 114, 128, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    createPerformanceMetrics() {
        const ctx = document.getElementById('performance-metrics');
        if (!ctx) return;

        this.chartInstances.performance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Energy Efficiency', 'Occupancy Rate', 'Device Health', 'Security Score', 'Cost Savings', 'User Satisfaction'],
                datasets: [
                    {
                        label: 'Current Month',
                        data: [85, 72, 90, 88, 78, 92],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#2563eb'
                    },
                    {
                        label: 'Previous Month',
                        data: [78, 68, 85, 82, 72, 88],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#10b981'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    // Utility functions
    generateTimeLabels(count) {
        return Array.from({length: count}, (_, i) => `${i}:00`);
    }

    generateRandomData(count, min, max) {
        return Array.from({length: count}, () => 
            Math.floor(Math.random() * (max - min) + min)
        );
    }

    generateBubbleData(data, days, hours) {
        const bubbleData = [];
        for (let day = 0; day < days.length; day++) {
            for (let hour = 0; hour < hours.length; hour++) {
                bubbleData.push({
                    x: day,
                    y: hour,
                    v: data[day][hour]
                });
            }
        }
        return bubbleData;
    }

    generateTimelineData(type) {
        const now = Date.now();
        const day = 24 * 60 * 60 * 1000; // 24 hours in ms
        
        return Array.from({length: 10}, (_, i) => ({
            x: now - (i * day / 10),
            y: Math.floor(Math.random() * 20) + 5
        }));
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateChartsWithNewData();
        }, 3000);
    }

    updateChartsWithNewData() {
        // Update energy chart
        if (this.chartInstances.energy) {
            this.chartInstances.energy.data.datasets.forEach(dataset => {
                dataset.data.shift();
                dataset.data.push(Math.floor(Math.random() * 400) + 200);
            });
            this.chartInstances.energy.update('none');
        }

        // Update performance metrics
        if (this.chartInstances.performance) {
            this.chartInstances.performance.data.datasets[0].data = 
                this.chartInstances.performance.data.datasets[0].data.map(val => 
                    Math.max(60, Math.min(100, val + (Math.random() - 0.5) * 10))
                );
            this.chartInstances.performance.update('none');
        }
    }

    // Export chart as image
    exportChart(chartId, filename) {
        const chart = this.chartInstances[chartId];
        if (chart) {
            const url = chart.toBase64Image();
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            link.click();
        }
    }

    // Switch chart type
    switchChartType(chartId, newType) {
        const chart = this.chartInstances[chartId];
        if (chart) {
            chart.config.type = newType;
            chart.update();
        }
    }
}

// Initialize advanced charts
window.advancedCharts = new AdvancedCharts();

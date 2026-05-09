// Chart Fix for Smart IoT Campus
// Add this script to ensure charts work properly

// Global chart instances
let chartInstances = {
    energy: null,
    utilization: null,
    cost: null,
    health: null
};

// Enhanced chart initialization with proper error handling
function initializeChartsFixed() {
    console.log('Initializing charts...');
    
    // Wait for Chart.js to be available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded!');
        setTimeout(initializeChartsFixed, 1000);
        return;
    }
    
    // Energy Chart
    const energyCtx = document.getElementById('energy-chart');
    if (energyCtx && !chartInstances.energy) {
        try {
            chartInstances.energy = new Chart(energyCtx, {
                type: 'line',
                data: {
                    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: [150, 280, 450, 380, 520, 320],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
            console.log('Energy chart created successfully');
        } catch (error) {
            console.error('Error creating energy chart:', error);
        }
    }

    // Utilization Chart
    const utilizationCtx = document.getElementById('utilization-chart');
    if (utilizationCtx && !chartInstances.utilization) {
        try {
            chartInstances.utilization = new Chart(utilizationCtx, {
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
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: false,
                        duration: 1000
                    }
                }
            });
            console.log('Utilization chart created successfully');
        } catch (error) {
            console.error('Error creating utilization chart:', error);
        }
    }

    // Cost Chart
    const costCtx = document.getElementById('cost-chart');
    if (costCtx && !chartInstances.cost) {
        try {
            chartInstances.cost = new Chart(costCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Energy Cost ($)',
                        data: [120, 150, 180, 160, 200, 80, 60],
                        backgroundColor: '#10b981',
                        borderColor: '#059669',
                        borderWidth: 2,
                        borderRadius: 8
                    }]
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
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
            console.log('Cost chart created successfully');
        } catch (error) {
            console.error('Error creating cost chart:', error);
        }
    }

    // Device Health Chart
    const healthCtx = document.getElementById('health-chart');
    if (healthCtx && !chartInstances.health) {
        try {
            chartInstances.health = new Chart(healthCtx, {
                type: 'radar',
                data: {
                    labels: ['Temperature Sensors', 'Motion Sensors', 'Smart Lights', 'AC Controllers', 'Security Cameras'],
                    datasets: [{
                        label: 'Device Health (%)',
                        data: [95, 88, 92, 90, 85],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#2563eb'
                    }]
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
                                stepSize: 20,
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
            console.log('Health chart created successfully');
        } catch (error) {
            console.error('Error creating health chart:', error);
        }
    }
}

// Update charts with real-time data
function updateChartsWithRealTimeData() {
    if (!chartInstances.energy) return;

    // Update energy chart with new data point
    const currentHour = new Date().getHours();
    const newEnergyValue = Math.floor(Math.random() * 200) + 100;
    
    if (chartInstances.energy.data.labels.length > 10) {
        chartInstances.energy.data.labels.shift();
        chartInstances.energy.data.datasets[0].data.shift();
    }
    
    chartInstances.energy.data.labels.push(currentHour + ':00');
    chartInstances.energy.data.datasets[0].data.push(newEnergyValue);
    chartInstances.energy.update('none');

    // Update utilization chart with random variations
    if (chartInstances.utilization) {
        const utilizationData = [
            35 + Math.random() * 10,
            25 + Math.random() * 10,
            20 + Math.random() * 10,
            15 + Math.random() * 10,
            5 + Math.random() * 5
        ];
        chartInstances.utilization.data.datasets[0].data = utilizationData;
        chartInstances.utilization.update('none');
    }

    // Update health chart with slight variations
    if (chartInstances.health) {
        const healthData = [
            95 - Math.random() * 5,
            88 - Math.random() * 5,
            92 - Math.random() * 5,
            90 - Math.random() * 5,
            85 - Math.random() * 5
        ];
        chartInstances.health.data.datasets[0].data = healthData;
        chartInstances.health.update('none');
    }
}

// Initialize charts when DOM is ready and Chart.js is loaded
function initializeChartsWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChartsFixed);
    } else {
        initializeChartsFixed();
    }
    
    // Start real-time updates
    setInterval(updateChartsWithRealTimeData, 5000);
}

// Auto-initialize
initializeChartsWhenReady();

// Export for global access
window.chartManager = {
    updateCharts: updateChartsWithRealTimeData,
    instances: chartInstances
};

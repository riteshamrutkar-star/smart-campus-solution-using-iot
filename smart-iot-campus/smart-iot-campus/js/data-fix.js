// Data Fix for Smart IoT Campus Dashboard
// Ensures data displays immediately on page load

// Immediate data initialization
function initializeDataImmediately() {
    console.log('Initializing dashboard data...');
    
    // Set initial values immediately
    campusState.totalPeople = 342;
    campusState.energyUsage = 487;
    campusState.avgTemperature = 22;
    campusState.securityStatus = 'Secure';
    
    // Update DOM immediately
    const peopleElement = document.getElementById('total-people');
    const energyElement = document.getElementById('energy-usage');
    const tempElement = document.getElementById('avg-temp');
    const securityElement = document.getElementById('security-status');
    
    if (peopleElement) peopleElement.textContent = '342';
    if (energyElement) energyElement.textContent = '487 kWh';
    if (tempElement) tempElement.textContent = '22°C';
    if (securityElement) securityElement.textContent = 'Secure';
    
    // Initialize building data
    Object.keys(campusState.buildings).forEach(building => {
        campusState.buildings[building].usage = Math.floor(Math.random() * 150) + 50;
        
        const meterElement = document.getElementById(`${building}-meter`);
        const usageElement = document.getElementById(`${building}-usage`);
        
        if (meterElement && usageElement) {
            const percentage = (campusState.buildings[building].usage / campusState.buildings[building].capacity) * 100;
            meterElement.style.width = `${Math.min(percentage, 100)}%`;
            usageElement.textContent = `${campusState.buildings[building].usage} kWh`;
        }
    });
    
    // Initialize room data
    Object.keys(campusState.rooms).forEach(roomId => {
        campusState.rooms[roomId].occupancy = Math.floor(Math.random() * campusState.rooms[roomId].capacity);
        campusState.rooms[roomId].occupied = campusState.rooms[roomId].occupancy > 0;
        
        const statusElement = document.getElementById(`${roomId}-status`);
        const occupancyElement = document.getElementById(`${roomId}-occupancy`);
        
        if (statusElement && occupancyElement) {
            const newStatus = campusState.rooms[roomId].occupied ? 'Occupied' : 'Available';
            statusElement.textContent = newStatus;
            statusElement.className = campusState.rooms[roomId].occupied ? 'status-indicator occupied' : 'status-indicator';
            occupancyElement.textContent = `${campusState.rooms[roomId].occupancy}/${campusState.rooms[roomId].capacity}`;
        }
    });
    
    console.log('Dashboard data initialized successfully');
}

// Enhanced update function with immediate display
function updateDataWithImmediateDisplay() {
    // Update people count
    const newPeople = Math.floor(Math.random() * 500) + 100;
    campusState.totalPeople = newPeople;
    const peopleElement = document.getElementById('total-people');
    if (peopleElement) {
        animateValueSimple('total-people', newPeople, '');
    }
    
    // Update energy usage
    const newEnergy = Math.floor(Math.random() * 1000) + 200;
    campusState.energyUsage = newEnergy;
    const energyElement = document.getElementById('energy-usage');
    if (energyElement) {
        animateValueSimple('energy-usage', newEnergy, ' kWh');
    }
    
    // Update temperature
    const newTemp = Math.floor(Math.random() * 8) + 18;
    campusState.avgTemperature = newTemp;
    const tempElement = document.getElementById('avg-temp');
    if (tempElement) {
        animateValueSimple('avg-temp', newTemp, '°C');
    }
    
    // Update energy meters
    Object.keys(campusState.buildings).forEach(building => {
        const usage = Math.floor(Math.random() * 200) + 50;
        campusState.buildings[building].usage = usage;
        
        const meterElement = document.getElementById(`${building}-meter`);
        const usageElement = document.getElementById(`${building}-usage`);
        
        if (meterElement && usageElement) {
            const percentage = (usage / campusState.buildings[building].capacity) * 100;
            meterElement.style.transition = 'width 1s ease-out';
            meterElement.style.width = `${Math.min(percentage, 100)}%`;
            usageElement.textContent = `${usage} kWh`;
        }
    });
    
    // Update room status
    Object.keys(campusState.rooms).forEach(roomId => {
        const room = campusState.rooms[roomId];
        const newOccupancy = Math.floor(Math.random() * room.capacity);
        room.occupancy = newOccupancy;
        room.occupied = newOccupancy > 0;
        room.lastActivity = Date.now();
        
        const statusElement = document.getElementById(`${roomId}-status`);
        const occupancyElement = document.getElementById(`${roomId}-occupancy`);
        
        if (statusElement && occupancyElement) {
            const newStatus = room.occupied ? 'Occupied' : 'Available';
            statusElement.textContent = newStatus;
            statusElement.className = room.occupied ? 'status-indicator occupied' : 'status-indicator';
            occupancyElement.textContent = `${newOccupancy}/${room.capacity}`;
        }
    });
}

// Simple animation function
function animateValueSimple(elementId, endValue, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = parseInt(element.textContent) || 0;
    const duration = 500;
    const startTime = performance.now();
    const range = endValue - startValue;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + range * progress);
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Initialize immediately when DOM is ready
function initializeWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDataImmediately);
    } else {
        initializeDataImmediately();
    }
    
    // Start real-time updates after 2 seconds
    setTimeout(() => {
        setInterval(updateDataWithImmediateDisplay, 3000);
    }, 2000);
}

// Auto-initialize
initializeWhenReady();

// Export for debugging
window.dataFix = {
    initialize: initializeDataImmediately,
    update: updateDataWithImmediateDisplay
};

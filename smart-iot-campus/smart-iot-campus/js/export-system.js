// Export System for Smart IoT Campus
// PDF, CSV, Excel export functionality

class ExportSystem {
    constructor() {
        this.exportFormats = ['csv', 'pdf', 'excel', 'json'];
        this.initializeExportSystem();
    }

    initializeExportSystem() {
        this.createExportInterface();
        this.setupExportEventListeners();
    }

    createExportInterface() {
        // Create export controls
        const exportControls = document.createElement('div');
        exportControls.className = 'export-controls';
        exportControls.innerHTML = `
            <div class="export-header">
                <h3><i class="fas fa-download"></i> Export Data</h3>
                <p>Download campus data in various formats</p>
            </div>
            <div class="export-options">
                <div class="export-section">
                    <h4>Data Range</h4>
                    <select id="export-range" class="export-select">
                        <option value="day">Last 24 Hours</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                        <option value="all">All Data</option>
                    </select>
                </div>
                <div class="export-section">
                    <h4>Export Format</h4>
                    <div class="format-buttons">
                        <button class="export-btn" onclick="exportSystem.exportData('csv')" data-format="csv">
                            <i class="fas fa-file-csv"></i>
                            <span>CSV</span>
                        </button>
                        <button class="export-btn" onclick="exportSystem.exportData('pdf')" data-format="pdf">
                            <i class="fas fa-file-pdf"></i>
                            <span>PDF</span>
                        </button>
                        <button class="export-btn" onclick="exportSystem.exportData('excel')" data-format="excel">
                            <i class="fas fa-file-excel"></i>
                            <span>Excel</span>
                        </button>
                        <button class="export-btn" onclick="exportSystem.exportData('json')" data-format="json">
                            <i class="fas fa-file-code"></i>
                            <span>JSON</span>
                        </button>
                    </div>
                </div>
                <div class="export-section">
                    <h4>Data Types</h4>
                    <div class="data-checkboxes">
                        <label class="checkbox-label">
                            <input type="checkbox" id="export-energy" checked>
                            <span>Energy Data</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="export-occupancy" checked>
                            <span>Occupancy Data</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="export-alerts" checked>
                            <span>Alerts</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="export-devices" checked>
                            <span>Device Health</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="export-analytics" checked>
                            <span>Analytics</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="export-actions">
                <button class="btn btn-primary" onclick="exportSystem.performExport()">
                    <i class="fas fa-download"></i>
                    Export Selected Data
                </button>
                <button class="btn btn-secondary" onclick="exportSystem.scheduleExport()">
                    <i class="fas fa-clock"></i>
                    Schedule Export
                </button>
            </div>
        `;

        // Add to analytics section
        const analyticsSection = document.querySelector('#analytics .container');
        if (analyticsSection) {
            const existingControls = analyticsSection.querySelector('.analytics-controls');
            if (existingControls) {
                analyticsSection.insertBefore(exportControls, existingControls.nextSibling);
            } else {
                analyticsSection.appendChild(exportControls);
            }
        }

        // Add export styles
        this.addExportStyles();
    }

    addExportStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .export-controls {
                background: var(--card-bg);
                padding: 2rem;
                border-radius: 12px;
                box-shadow: var(--shadow);
                margin-bottom: 2rem;
            }

            .export-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .export-header h3 {
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }

            .export-header p {
                color: var(--text-secondary);
                margin: 0;
            }

            .export-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .export-section h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 1.1rem;
            }

            .export-select {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                background: var(--card-bg);
                color: var(--text-primary);
                font-size: 1rem;
            }

            .format-buttons {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.75rem;
            }

            .export-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                border: 2px solid var(--border-color);
                border-radius: 8px;
                background: var(--card-bg);
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .export-btn:hover {
                border-color: var(--primary-color);
                background: var(--light-bg);
                transform: translateY(-2px);
            }

            .export-btn i {
                font-size: 1.5rem;
                color: var(--primary-color);
            }

            .data-checkboxes {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 6px;
                transition: background 0.2s ease;
            }

            .checkbox-label:hover {
                background: var(--light-bg);
            }

            .checkbox-label input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .export-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            @media (max-width: 768px) {
                .export-options {
                    grid-template-columns: 1fr;
                }
                
                .format-buttons {
                    grid-template-columns: 1fr;
                }
                
                .export-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupExportEventListeners() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.performExport();
            }
        });
    }

    async exportData(format) {
        const selectedData = this.getSelectedData();
        const dataRange = document.getElementById('export-range').value;
        
        try {
            switch (format) {
                case 'csv':
                    await this.exportToCSV(selectedData, dataRange);
                    break;
                case 'pdf':
                    await this.exportToPDF(selectedData, dataRange);
                    break;
                case 'excel':
                    await this.exportToExcel(selectedData, dataRange);
                    break;
                case 'json':
                    await this.exportToJSON(selectedData, dataRange);
                    break;
            }
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Export failed: ' + error.message, 'error');
        }
    }

    getSelectedData() {
        const dataTypes = {
            energy: document.getElementById('export-energy').checked,
            occupancy: document.getElementById('export-occupancy').checked,
            alerts: document.getElementById('export-alerts').checked,
            devices: document.getElementById('export-devices').checked,
            analytics: document.getElementById('export-analytics').checked
        };

        const data = {};
        
        if (dataTypes.energy && window.campusState) {
            data.energy = {
                currentUsage: window.campusState.energyUsage,
                buildings: window.campusState.buildings,
                timestamp: Date.now()
            };
        }

        if (dataTypes.occupancy && window.campusState) {
            data.occupancy = {
                totalPeople: window.campusState.totalPeople,
                rooms: window.campusState.rooms,
                timestamp: Date.now()
            };
        }

        if (dataTypes.alerts && window.campusState) {
            data.alerts = window.campusState.alerts;
        }

        if (dataTypes.devices && window.campusState) {
            data.devices = window.campusState.devices;
        }

        if (dataTypes.analytics && window.storageManager) {
            data.analytics = window.storageManager.getStatistics();
        }

        return data;
    }

    async exportToCSV(data, range) {
        let csv = '# Smart IoT Campus Data Export\n';
        csv += `# Export Range: ${range}\n`;
        csv += `# Export Date: ${new Date().toLocaleString()}\n\n`;

        Object.entries(data).forEach(([key, value]) => {
            csv += `# ${key.toUpperCase()}\n`;
            
            if (key === 'energy') {
                csv += 'Building,Usage (kWh),Capacity,Health (%)\n';
                Object.entries(value.buildings).forEach(([building, data]) => {
                    csv += `${building},${data.usage},${data.capacity},${(data.health * 100).toFixed(1)}\n`;
                });
            } else if (key === 'occupancy') {
                csv += 'Room,Occupancy,Capacity,Status\n';
                Object.entries(value.rooms).forEach(([room, data]) => {
                    csv += `${room},${data.occupancy},${data.capacity},${data.occupied ? 'Occupied' : 'Available'}\n`;
                });
            } else if (key === 'alerts') {
                csv += 'ID,Type,Severity,Message,Timestamp\n';
                value.forEach(alert => {
                    csv += `${alert.id},${alert.type},${alert.severity},"${alert.message}",${new Date(alert.timestamp).toLocaleString()}\n`;
                });
            }
            
            csv += '\n';
        });

        this.downloadFile(csv, `campus-data-${range}.csv`, 'text/csv');
        this.showNotification('CSV export completed successfully', 'success');
    }

    async exportToPDF(data, range) {
        // Simple PDF generation using browser print
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Smart IoT Campus Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #2563eb; }
                        h2 { color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
                        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>Smart IoT Campus Report</h1>
                    <p><strong>Export Range:</strong> ${range}</p>
                    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
                    ${this.generatePDFContent(data)}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        this.showNotification('PDF export ready for printing', 'success');
    }

    generatePDFContent(data) {
        let content = '';
        
        Object.entries(data).forEach(([key, value]) => {
            content += `<h2>${key.charAt(0).toUpperCase() + key.slice(1)} Data</h2>`;
            
            if (key === 'energy') {
                content += '<table><tr><th>Building</th><th>Usage (kWh)</th><th>Capacity</th><th>Health (%)</th></tr>';
                Object.entries(value.buildings).forEach(([building, data]) => {
                    content += `<tr><td>${building}</td><td>${data.usage}</td><td>${data.capacity}</td><td>${(data.health * 100).toFixed(1)}</td></tr>`;
                });
                content += '</table>';
            } else if (key === 'occupancy') {
                content += '<table><tr><th>Room</th><th>Occupancy</th><th>Capacity</th><th>Status</th></tr>';
                Object.entries(value.rooms).forEach(([room, data]) => {
                    content += `<tr><td>${room}</td><td>${data.occupancy}</td><td>${data.capacity}</td><td>${data.occupied ? 'Occupied' : 'Available'}</td></tr>`;
                });
                content += '</table>';
            }
        });
        
        return content;
    }

    async exportToExcel(data, range) {
        // Generate Excel-compatible HTML table
        let excelContent = '<table>';
        
        Object.entries(data).forEach(([key, value]) => {
            excelContent += `<tr><th colspan="4">${key.toUpperCase()} DATA</th></tr>`;
            
            if (key === 'energy') {
                excelContent += '<tr><th>Building</th><th>Usage (kWh)</th><th>Capacity</th><th>Health (%)</th></tr>';
                Object.entries(value.buildings).forEach(([building, data]) => {
                    excelContent += `<tr><td>${building}</td><td>${data.usage}</td><td>${data.capacity}</td><td>${(data.health * 100).toFixed(1)}</td></tr>`;
                });
            }
        });
        
        excelContent += '</table>';
        
        this.downloadFile(excelContent, `campus-data-${range}.xls`, 'application/vnd.ms-excel');
        this.showNotification('Excel export completed successfully', 'success');
    }

    async exportToJSON(data, range) {
        const jsonData = {
            metadata: {
                exportRange: range,
                exportDate: new Date().toISOString(),
                system: 'Smart IoT Campus',
                version: '1.0'
            },
            data: data
        };
        
        const jsonString = JSON.stringify(jsonData, null, 2);
        this.downloadFile(jsonString, `campus-data-${range}.json`, 'application/json');
        this.showNotification('JSON export completed successfully', 'success');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    performExport() {
        const format = this.getSelectedFormat();
        if (format) {
            this.exportData(format);
        } else {
            this.showNotification('Please select an export format', 'warning');
        }
    }

    getSelectedFormat() {
        const buttons = document.querySelectorAll('.export-btn');
        for (let btn of buttons) {
            if (btn.classList.contains('selected')) {
                return btn.dataset.format;
            }
        }
        return null;
    }

    scheduleExport() {
        const schedule = prompt('Enter export schedule (e.g., "daily 9:00", "weekly monday 8:00"):');
        if (schedule) {
            localStorage.setItem('exportSchedule', schedule);
            this.showNotification(`Export scheduled: ${schedule}`, 'success');
        }
    }

    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        }
    }
}

// Initialize export system
window.exportSystem = new ExportSystem();

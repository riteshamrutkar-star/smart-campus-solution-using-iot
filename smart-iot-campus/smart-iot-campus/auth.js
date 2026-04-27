// Authentication and Authorization System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.sessionTimer = null;
        this.initializeAuth();
    }

    initializeAuth() {
        // Check for existing session
        const savedSession = localStorage.getItem('campusSession');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                if (session.expiresAt > Date.now()) {
                    this.currentUser = session.user;
                    this.updateUI();
                    this.startSessionTimer();
                } else {
                    this.logout();
                }
            } catch (e) {
                this.logout();
            }
        }
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const loginForm = document.getElementById('login-form');
        const modal = document.getElementById('login-modal');
        const closeBtn = modal?.querySelector('.close');

        loginBtn?.addEventListener('click', () => this.showLoginModal());
        logoutBtn?.addEventListener('click', () => this.logout());
        loginForm?.addEventListener('submit', (e) => this.handleLogin(e));
        closeBtn?.addEventListener('click', () => this.hideLoginModal());

        // Close modal when clicking outside
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideLoginModal();
            }
        });

        // Reset session timer on user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.resetSessionTimer(), true);
        });
    }

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'block';
            document.getElementById('username').focus();
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('login-form').reset();
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Simulate authentication (in production, this would be an API call)
        const isAuthenticated = await this.authenticateUser(username, password, role);
        
        if (isAuthenticated) {
            this.currentUser = {
                username,
                role,
                permissions: this.getPermissions(role),
                loginTime: Date.now()
            };
            
            this.saveSession();
            this.updateUI();
            this.hideLoginModal();
            this.showNotification('Login successful!', 'success');
            this.startSessionTimer();
            
            // Initialize user-specific features
            this.initializeUserFeatures();
        } else {
            this.showNotification('Invalid credentials', 'error');
        }
    }

    async authenticateUser(username, password, role) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - in production, use proper authentication
        const validCredentials = {
            admin: { password: 'admin123', role: 'admin' },
            staff: { password: 'staff123', role: 'staff' },
            student: { password: 'student123', role: 'student' }
        };

        return validCredentials[username] && 
               validCredentials[username].password === password && 
               validCredentials[username].role === role;
    }

    getPermissions(role) {
        const permissions = {
            admin: [
                'view_dashboard', 'control_devices', 'manage_users', 
                'view_analytics', 'export_data', 'manage_security',
                'ai_insights', 'system_settings'
            ],
            staff: [
                'view_dashboard', 'control_devices', 'view_analytics', 
                'export_data', 'ai_insights'
            ],
            student: [
                'view_dashboard', 'view_analytics', 'ai_insights'
            ]
        };
        return permissions[role] || [];
    }

    hasPermission(permission) {
        return this.currentUser && this.currentUser.permissions.includes(permission);
    }

    saveSession() {
        const session = {
            user: this.currentUser,
            expiresAt: Date.now() + this.sessionTimeout
        };
        localStorage.setItem('campusSession', JSON.stringify(session));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('campusSession');
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
        }
        this.updateUI();
        this.showNotification('Logged out successfully', 'info');
    }

    startSessionTimer() {
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
        }
        
        this.sessionTimer = setTimeout(() => {
            this.showNotification('Session expired. Please login again.', 'warning');
            this.logout();
        }, this.sessionTimeout);
    }

    resetSessionTimer() {
        if (this.currentUser) {
            this.startSessionTimer();
        }
    }

    updateUI() {
        const loginBtn = document.getElementById('login-btn');
        const userProfile = document.getElementById('user-profile');
        const userName = document.getElementById('user-name');

        if (this.currentUser) {
            loginBtn.style.display = 'none';
            userProfile.classList.remove('hidden');
            userName.textContent = `${this.currentUser.username} (${this.currentUser.role})`;
            
            // Show/hide features based on permissions
            this.updateFeatureAccess();
        } else {
            loginBtn.style.display = 'block';
            userProfile.classList.add('hidden');
        }
    }

    updateFeatureAccess() {
        // Hide/show features based on user permissions
        const features = {
            'export-data': 'export_data',
            'login-btn': 'view_dashboard',
            'ai-insights': 'ai_insights'
        };

        Object.entries(features).forEach(([elementId, permission]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.display = this.hasPermission(permission) ? 'block' : 'none';
            }
        });

        // Disable controls for students
        if (this.currentUser.role === 'student') {
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.disabled = true;
                btn.title = 'Requires staff or admin privileges';
            });
        }
    }

    initializeUserFeatures() {
        // Initialize features based on user role
        if (this.hasPermission('ai_insights')) {
            this.initializeAIInsights();
        }
        
        if (this.hasPermission('export_data')) {
            this.initializeExportFeatures();
        }
    }

    initializeAIInsights() {
        // Load AI-specific data and recommendations
        if (window.aiEngine) {
            window.aiEngine.generateRecommendations();
        }
    }

    initializeExportFeatures() {
        const exportBtn = document.getElementById('export-data');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }
    }

    async exportData() {
        if (!this.hasPermission('export_data')) {
            this.showNotification('Permission denied', 'error');
            return;
        }

        const timeRange = document.getElementById('time-range')?.value || 'day';
        const data = await this.gatherExportData(timeRange);
        
        // Create and download CSV
        const csv = this.convertToCSV(data);
        this.downloadFile(csv, `campus-data-${timeRange}.csv`, 'text/csv');
        
        this.showNotification('Data exported successfully', 'success');
    }

    async gatherExportData(timeRange) {
        // Simulate data gathering
        const data = {
            timestamp: new Date().toISOString(),
            timeRange,
            energyUsage: window.campusState?.energyUsage || 0,
            totalPeople: window.campusState?.totalPeople || 0,
            buildings: window.campusState?.buildings || {},
            rooms: window.campusState?.rooms || {}
        };
        return data;
    }

    convertToCSV(data) {
        const headers = ['Timestamp', 'Time Range', 'Energy Usage (kWh)', 'Total People'];
        const rows = [headers];
        
        rows.push([
            data.timestamp,
            data.timeRange,
            data.energyUsage,
            data.totalPeople
        ]);
        
        return rows.map(row => row.join(',')).join('\n');
    }

    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        }
    }
}

// Initialize authentication system
window.authSystem = new AuthSystem();

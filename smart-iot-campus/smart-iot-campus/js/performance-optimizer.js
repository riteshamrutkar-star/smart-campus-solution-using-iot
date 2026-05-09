// Performance Optimization for Smart IoT Campus
// Faster loading, caching, and optimization features

class PerformanceOptimizer {
    constructor() {
        this.cache = new Map();
        this.lazyLoadedElements = new Set();
        this.optimizationSettings = {
            enableLazyLoading: true,
            enableCaching: true,
            enableCompression: true,
            enableMinification: true,
            enableServiceWorker: true
        };
        this.initializeOptimization();
    }

    initializeOptimization() {
        this.setupServiceWorker();
        this.setupLazyLoading();
        this.setupCaching();
        this.setupResourceOptimization();
        this.setupPerformanceMonitoring();
        this.optimizeImages();
        this.optimizeAnimations();
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator && this.optimizationSettings.enableServiceWorker) {
            const swCode = `
                const CACHE_NAME = 'campus-cache-v1';
                const urlsToCache = [
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js',
                    '/auth.js',
                    '/storage.js',
                    '/ai-engine.js',
                    '/data-fix.js',
                    '/chart-fix.js',
                    'https://cdn.jsdelivr.net/npm/chart.js'
                ];

                self.addEventListener('install', event => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(cache => cache.addAll(urlsToCache))
                    );
                });

                self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request)
                            .then(response => {
                                return response || fetch(event.request);
                            })
                    );
                });
            `;

            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);
            
            navigator.serviceWorker.register(swUrl)
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    setupLazyLoading() {
        if (!this.optimizationSettings.enableLazyLoading) return;

        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                    this.lazyLoadedElements.add(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Lazy load charts
        this.lazyLoadCharts();
    }

    lazyLoadCharts() {
        const chartElements = document.querySelectorAll('.chart-container');
        const chartObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    if (!this.lazyLoadedElements.has(container)) {
                        this.initializeChart(container);
                        this.lazyLoadedElements.add(container);
                        observer.unobserve(container);
                    }
                }
            });
        });

        chartElements.forEach(container => chartObserver.observe(container));
    }

    initializeChart(container) {
        // Initialize chart when it comes into view
        const canvas = container.querySelector('canvas');
        if (canvas && window.advancedCharts) {
            // Trigger chart initialization
            setTimeout(() => {
                container.classList.add('chart-loaded');
            }, 100);
        }
    }

    setupCaching() {
        if (!this.optimizationSettings.enableCaching) return;

        // Cache API responses
        this.cacheAPIResponses();
        
        // Cache computed data
        this.cacheComputedData();
        
        // Setup cache cleanup
        setInterval(() => this.cleanupCache(), 300000); // 5 minutes
    }

    cacheAPIResponses() {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const cacheKey = JSON.stringify(args);
            
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < 30000) { // 30 seconds cache
                    return cached.response;
                }
            }

            const response = await originalFetch(...args);
            
            if (response.ok) {
                this.cache.set(cacheKey, {
                    response: response.clone(),
                    timestamp: Date.now()
                });
            }

            return response;
        };
    }

    cacheComputedData() {
        // Cache expensive computations
        const originalDataFix = window.dataFix?.update;
        if (originalDataFix) {
            window.dataFix.update = () => {
                const cacheKey = 'dashboard-update';
                const cached = this.cache.get(cacheKey);
                
                if (cached && Date.now() - cached.timestamp < 3000) { // 3 seconds cache
                    return cached.data;
                }

                const result = originalDataFix.call(window.dataFix);
                
                this.cache.set(cacheKey, {
                    data: result,
                    timestamp: Date.now()
                });

                return result;
            };
        }
    }

    cleanupCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > 300000) { // 5 minutes
                this.cache.delete(key);
            }
        }
    }

    setupResourceOptimization() {
        // Optimize CSS loading
        this.optimizeCSS();
        
        // Optimize JavaScript loading
        this.optimizeJavaScript();
        
        // Optimize font loading
        this.optimizeFonts();
    }

    optimizeCSS() {
        // Critical CSS inlining
        const criticalCSS = `
            .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); }
            .main { min-height: calc(100vh - 80px); }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    optimizeJavaScript() {
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            script.defer = true;
        });
    }

    optimizeFonts() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    optimizeImages() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });

        // Create responsive images
        this.createResponsiveImages();
    }

    createResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        images.forEach(img => {
            const srcset = [
                `${img.src}?w=320 320w`,
                `${img.src}?w=640 640w`,
                `${img.src}?w=1024 1024w`,
                `${img.src}?w=1920 1920w`
            ].join(', ');
            
            img.srcset = srcset;
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        });
    }

    optimizeAnimations() {
        // Reduce animation complexity on low-end devices
        if (this.isLowEndDevice()) {
            document.documentElement.style.setProperty('--transition-fast', '0.1s');
            document.documentElement.style.setProperty('--transition-normal', '0.2s');
            
            // Disable complex animations
            const style = document.createElement('style');
            style.textContent = `
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    isLowEndDevice() {
        // Detect low-end devices
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const isLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        return isSlowConnection || isLowMemory || isLowCores;
    }

    setupPerformanceMonitoring() {
        // Monitor performance metrics
        this.monitorPageLoad();
        this.monitorUserInteractions();
        this.monitorMemoryUsage();
        this.schedulePerformanceReports();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Report slow loads
            if (loadTime > 3000) {
                this.reportPerformanceIssue('slow-page-load', loadTime);
            }
        });
    }

    monitorUserInteractions() {
        let lastInteraction = Date.now();
        
        document.addEventListener('click', () => {
            const now = Date.now();
            const responseTime = now - lastInteraction;
            lastInteraction = now;
            
            if (responseTime > 100) {
                this.reportPerformanceIssue('slow-interaction', responseTime);
            }
        });
    }

    monitorMemoryUsage() {
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMemory = memory.usedJSHeapSize / 1024 / 1024;
                const totalMemory = memory.totalJSHeapSize / 1024 / 1024;
                
                if (usedMemory > totalMemory * 0.8) {
                    this.reportPerformanceIssue('high-memory-usage', usedMemory);
                    this.optimizeMemory();
                }
            }, 10000);
        }
    }

    optimizeMemory() {
        // Clear cache if memory is high
        if (this.cache.size > 100) {
            this.cleanupCache();
        }
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
    }

    schedulePerformanceReports() {
        // Send performance reports every 5 minutes
        setInterval(() => {
            this.sendPerformanceReport();
        }, 300000);
    }

    sendPerformanceReport() {
        const report = {
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            connection: navigator.connection?.effectiveType,
            memory: performance.memory ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize
            } : null,
            cacheSize: this.cache.size,
            performance: performance.timing
        };
        
        console.log('Performance Report:', report);
        
        // Store in localStorage for analysis
        const reports = JSON.parse(localStorage.getItem('performanceReports') || '[]');
        reports.push(report);
        
        // Keep only last 10 reports
        if (reports.length > 10) {
            reports.shift();
        }
        
        localStorage.setItem('performanceReports', JSON.stringify(reports));
    }

    reportPerformanceIssue(type, value) {
        console.warn(`Performance Issue: ${type}`, value);
        
        // Create performance notification
        if (window.notificationSystem) {
            window.notificationSystem.show(
                `Performance issue detected: ${type}`,
                'warning'
            );
        }
    }

    // Public API for manual optimization
    optimize() {
        this.cleanupCache();
        this.optimizeMemory();
        this.optimizeImages();
        
        if (window.notificationSystem) {
            window.notificationSystem.show(
                'Performance optimization completed',
                'success'
            );
        }
    }

    getPerformanceMetrics() {
        return {
            cacheSize: this.cache.size,
            memoryUsage: performance.memory ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize
            } : null,
            loadTime: performance.timing.loadEventEnd - performance.timing.loadEventStart,
            isLowEndDevice: this.isLowEndDevice()
        };
    }
}

// Initialize performance optimizer
window.performanceOptimizer = new PerformanceOptimizer();

// Add performance controls to UI
function addPerformanceControls() {
    const controls = document.createElement('div');
    controls.className = 'performance-controls';
    controls.innerHTML = `
        <button class="btn btn-secondary" onclick="performanceOptimizer.optimize()">
            <i class="fas fa-bolt"></i>
            Optimize Performance
        </button>
        <button class="btn btn-secondary" onclick="showPerformanceMetrics()">
            <i class="fas fa-chart-line"></i>
            Show Metrics
        </button>
    `;

    const header = document.querySelector('.header .container');
    if (header) {
        header.appendChild(controls);
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .performance-controls {
            display: flex;
            gap: 0.5rem;
            margin-left: 1rem;
        }
        
        @media (max-width: 768px) {
            .performance-controls {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
}

function showPerformanceMetrics() {
    const metrics = window.performanceOptimizer.getPerformanceMetrics();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <h2>Performance Metrics</h2>
            <div class="metrics-grid">
                <div class="metric-item">
                    <h4>Cache Size</h4>
                    <p>${metrics.cacheSize} items</p>
                </div>
                <div class="metric-item">
                    <h4>Memory Usage</h4>
                    <p>${metrics.memoryUsage ? 
                        `${(metrics.memoryUsage.used / 1024 / 1024).toFixed(2)} MB / ${(metrics.memoryUsage.total / 1024 / 1024).toFixed(2)} MB` : 
                        'Not available'}</p>
                </div>
                <div class="metric-item">
                    <h4>Page Load Time</h4>
                    <p>${metrics.loadTime}ms</p>
                </div>
                <div class="metric-item">
                    <h4>Device Type</h4>
                    <p>${metrics.isLowEndDevice ? 'Low-end' : 'High-end'}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Add performance controls when DOM is ready
document.addEventListener('DOMContentLoaded', addPerformanceControls);

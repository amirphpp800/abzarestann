// Auto Performance Optimization
// Replaces the need for manual headers and redirects configuration

class AutoOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupPreloading();
        this.setupCompression();
        this.setupCaching();
        this.setupSecurity();
    }

    // Lazy loading for images and iframes
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            // Auto add lazy loading to all images
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Preload critical resources
    setupPreloading() {
        const criticalResources = [
            { href: '/css/main.css', as: 'style' },
            { href: '/js/main.js', as: 'script' },
            { href: '/assets/Font/fontiran.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    // Auto compression detection and handling
    setupCompression() {
        // Check if browser supports modern formats
        this.supportsWebP = this.checkWebPSupport();
        this.supportsAvif = this.checkAvifSupport();
        
        // Auto replace images with optimized versions if available
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.dataset.optimized) {
                this.optimizeImage(img);
            }
        });
    }

    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    checkAvifSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    }

    optimizeImage(img) {
        const originalSrc = img.src;
        const baseName = originalSrc.split('.').slice(0, -1).join('.');
        
        // Try to load optimized versions
        if (this.supportsAvif) {
            this.tryImageFormat(img, baseName + '.avif', originalSrc);
        } else if (this.supportsWebP) {
            this.tryImageFormat(img, baseName + '.webp', originalSrc);
        }
        
        img.dataset.optimized = 'true';
    }

    tryImageFormat(img, newSrc, fallback) {
        const testImg = new Image();
        testImg.onload = () => {
            img.src = newSrc;
        };
        testImg.onerror = () => {
            img.src = fallback;
        };
        testImg.src = newSrc;
    }

    // Auto caching strategies
    setupCaching() {
        // Add cache busting for development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            const timestamp = Date.now();
            document.querySelectorAll('link[rel="stylesheet"], script[src]').forEach(element => {
                if (element.href && !element.href.includes('?')) {
                    element.href += '?v=' + timestamp;
                } else if (element.src && !element.src.includes('?')) {
                    element.src += '?v=' + timestamp;
                }
            });
        }

        // Set up intelligent prefetching
        this.setupIntelligentPrefetch();
    }

    setupIntelligentPrefetch() {
        // Prefetch links on hover
        document.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'A' && e.target.href) {
                this.prefetchLink(e.target.href);
            }
        });

        // Prefetch visible links after page load
        setTimeout(() => {
            document.querySelectorAll('a[href^="/"], a[href^="#"]').forEach(link => {
                if (this.isElementVisible(link)) {
                    this.prefetchLink(link.href);
                }
            });
        }, 2000);
    }

    prefetchLink(href) {
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    }

    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Auto security headers (client-side enforcement)
    setupSecurity() {
        // Prevent clickjacking
        if (window.self !== window.top) {
            document.body.style.display = 'none';
            console.warn('Clickjacking attempt detected');
        }

        // Auto HTTPS redirect in production
        if (location.protocol !== 'https:' && 
            location.hostname !== 'localhost' && 
            location.hostname !== '127.0.0.1' &&
            !location.hostname.includes('192.168.')) {
            
            // Uncomment to enable auto HTTPS redirect
            // location.replace('https:' + window.location.href.substring(window.location.protocol.length));
        }

        // Content Security Policy enforcement (client-side)
        this.enforceCSP();
    }

    enforceCSP() {
        // Block inline scripts that aren't from our domain
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (!script.src && script.innerHTML.trim()) {
                // Allow our own inline scripts
                const allowedPatterns = [
                    /console\.log/,
                    /setupAutoRedirects/,
                    /AutoOptimizer/
                ];
                
                const isAllowed = allowedPatterns.some(pattern => 
                    pattern.test(script.innerHTML)
                );
                
                if (!isAllowed) {
                    console.warn('Blocked potentially unsafe inline script');
                    script.remove();
                }
            }
        });
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                        'TCP Connection': perfData.connectEnd - perfData.connectStart,
                        'Request': perfData.responseStart - perfData.requestStart,
                        'Response': perfData.responseEnd - perfData.responseStart,
                        'DOM Processing': perfData.domContentLoadedEventEnd - perfData.responseEnd,
                        'Total Load Time': perfData.loadEventEnd - perfData.navigationStart
                    });
                }, 0);
            });
        }
    }
}

// Auto initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.autoOptimizer = new AutoOptimizer();
    window.autoOptimizer.monitorPerformance();
});

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoOptimizer;
}

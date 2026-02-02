import { useEffect } from 'react';

/**
 * Performance monitoring hook
 * Tracks Web Vitals and logs performance metrics
 */
export const usePerformanceMonitoring = () => {
    useEffect(() => {
        // Only run in production
        if (import.meta.env.DEV) return;

        // Report Web Vitals
        const reportWebVitals = (metric) => {
            console.log(metric);

            // You can send this to an analytics service
            // Example: sendToAnalytics(metric);
        };

        // Measure First Contentful Paint (FCP)
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    reportWebVitals({
                        name: 'FCP',
                        value: entry.startTime,
                        rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
                    });
                }
            }
        });

        try {
            observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
            // Browser doesn't support this API
        }

        // Measure Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];

            reportWebVitals({
                name: 'LCP',
                value: lastEntry.startTime,
                rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
            });
        });

        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Browser doesn't support this API
        }

        // Measure Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;

                    reportWebVitals({
                        name: 'CLS',
                        value: clsValue,
                        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                    });
                }
            }
        });

        try {
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            // Browser doesn't support this API
        }

        // Cleanup
        return () => {
            observer.disconnect();
            lcpObserver.disconnect();
            clsObserver.disconnect();
        };
    }, []);
};

/**
 * Intersection Observer hook for lazy loading
 * Only loads components when they're about to enter the viewport
 */
export const useIntersectionObserver = (ref, options = {}) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Element is in viewport
                    element.dataset.visible = 'true';
                }
            },
            {
                rootMargin: '50px', // Start loading 50px before element enters viewport
                threshold: 0.01,
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);
};

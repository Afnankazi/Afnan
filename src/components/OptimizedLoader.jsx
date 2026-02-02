import React from 'react';

/**
 * Optimized loading component with minimal re-renders
 * Uses CSS animations instead of JavaScript for better performance
 */
const OptimizedLoader = React.memo(({ message = "Loading..." }) => {
    return (
        <div className="w-full min-h-[400px] flex items-center justify-center bg-transparent">
            <div className="text-center">
                {/* Animated gradient spinner */}
                <div className="relative inline-block">
                    <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500 animate-spin"></div>
                    <div className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-transparent border-b-pink-500 border-l-blue-500 animate-spin-slow"></div>
                </div>

                {/* Loading text with fade animation */}
                <p className="mt-6 text-secondary text-sm font-medium animate-pulse">
                    {message}
                </p>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-4">
                    <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
            </div>
        </div>
    );
});

OptimizedLoader.displayName = 'OptimizedLoader';

export default OptimizedLoader;

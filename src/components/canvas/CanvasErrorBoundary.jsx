import React from 'react';

class CanvasErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Canvas Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-lg">
                    <p className="text-secondary text-sm">Loading...</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default CanvasErrorBoundary;

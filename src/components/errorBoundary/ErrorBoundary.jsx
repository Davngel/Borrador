import React from "react";


class ErrorBoundary extends React.Component{
    state = {error: null };

    static getDerivedStateFromError(error) {
        return {error};
    }

    componentDidCatch(error, errorInfo ) {}

    render() {
        if (this.state.error) {
            return <p>Something went wrong</p>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
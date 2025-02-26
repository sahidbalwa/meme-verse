import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
          <h1 className="text-2xl">Something went wrong. Try refreshing!</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
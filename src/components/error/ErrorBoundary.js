import React from "react";

import SplashScreen from "../ui/SplashScreen";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return <SplashScreen />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

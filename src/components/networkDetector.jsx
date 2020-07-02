import React, { Component } from 'react';

const API_HOST = `${process.env.APP_LINK}`;

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false
    }

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }


    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        const webPing = setInterval(
          () => {
            fetch(API_HOST, {
              method: 'POST',
              body: JSON.stringify({ query: '{online}' }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(() => {
                this.setState({ isDisconnected: false });
                clearInterval(webPing);
              }).catch(() => this.setState({ isDisconnected: true }));
          }, 2000
        );
        return;
      }

      return this.setState({ isDisconnected: true });
    }

    render() {
      const { isDisconnected } = this.state;
      return (
        <ComposedComponent {...this.props} offline={isDisconnected} />
      );
    }
  }

  return NetworkDetector;
}

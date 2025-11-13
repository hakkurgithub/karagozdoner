'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Valami hiba történt</h2>
            <p className="text-gray-600 mb-6">
              Sajnáljuk, de egy váratlan hiba történt. Kérjük, próbálja újra vagy forduljon hozzánk segítségért.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Újrapróbálás
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Vissza a főoldalra
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
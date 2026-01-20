import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
          React Calculator
        </h1>
        <Calculator />
        <div className="text-gray-500 text-sm">
          Built with React, TypeScript & Tailwind
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';

const LayoutLoading = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-6">
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutLoading;
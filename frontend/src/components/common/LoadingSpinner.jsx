import React from "react";

const LoadingSpinner = ({
  size = "medium",
  color = "blue-500",
  text = null,
}) => {
  const sizeClasses = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-${color}`}
        role="status"
        aria-label="Loading"
      />
      {text && <span className="ml-3 text-gray-600">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;

import React from "react";

interface CustomIconProps {
  className?: string;
  size?: number; // Add size prop type
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, size = 25 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      opacity="0.4"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="currentColor"
    />
    <path
      d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z"
      fill="currentColor"
    />
  </svg>
);

export default CustomIcon;

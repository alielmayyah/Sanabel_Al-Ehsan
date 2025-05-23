import React from "react";

interface CustomIconProps {
  className?: string;
  size?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, size = 25 }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 6.375C8 4.93969 8.21141 3.48703 8.75 2.25C5.16734 3.80953 2.75 7.46812 2.75 11.625C2.75 17.2167 7.28328 21.75 12.875 21.75C17.0319 21.75 20.6905 19.3327 22.25 15.75C21.013 16.2886 19.5603 16.5 18.125 16.5C12.5333 16.5 8 11.9667 8 6.375Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default CustomIcon;

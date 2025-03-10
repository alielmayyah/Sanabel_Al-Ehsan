import React from "react";

interface CustomIconProps {
  className?: string;
  size?: number; // Add size prop type
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, size = 25 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.9929 1.16429C19.2341 0.444284 20.7659 0.444285 22.0071 1.16429L28.65 5.01776L35.3087 8.84395C36.5528 9.55886 37.3187 10.8854 37.3158 12.3203L37.3 20L37.3158 27.6797C37.3187 29.1146 36.5528 30.4411 35.3087 31.1561L28.65 34.9822L22.0071 38.8357C20.7659 39.5557 19.2341 39.5557 17.9929 38.8357L11.35 34.9822L4.69135 31.1561C3.4472 30.4411 2.68131 29.1146 2.68425 27.6797L2.7 20L2.68425 12.3203C2.68131 10.8854 3.4472 9.55886 4.69135 8.84395L11.35 5.01776L17.9929 1.16429Z"
      fill="currentColor"
    />
    <g clip-path="url(#clip0_229_4583)">
      <path
        d="M20 15L23.3333 20L27.5 16.6667L25.8333 25H14.1667L12.5 16.6667L16.6667 20L20 15Z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_229_4583">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(10 10)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default CustomIcon;

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
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1066_9803)">
      <path
        d="M12.0008 7.18105C13.0541 7.18091 14.0889 7.45803 15.0011 7.98458C15.9134 8.51113 16.6709 9.26855 17.1976 10.1807C17.7243 11.0928 18.0017 12.1276 18.0017 13.1808C18.0017 14.2341 17.7245 15.2689 17.1978 16.1811H20.0008C20.2661 16.1811 20.5204 16.2864 20.708 16.4739C20.8955 16.6615 21.0008 16.9158 21.0008 17.1811C21.0008 17.4463 20.8955 17.7006 20.708 17.8882C20.5204 18.0757 20.2661 18.1811 20.0008 18.1811H4.00085C3.73563 18.1811 3.48127 18.0757 3.29374 17.8882C3.1062 17.7006 3.00085 17.4463 3.00085 17.1811C3.00085 16.9158 3.1062 16.6615 3.29374 16.4739C3.48127 16.2864 3.73563 16.1811 4.00085 16.1811H6.80385C6.2772 15.2689 5.99996 14.2341 6 13.1808C6.00003 12.1276 6.27735 11.0928 6.80406 10.1807C7.33077 9.26855 8.08831 8.51113 9.00055 7.98458C9.91278 7.45803 10.9476 7.18091 12.0008 7.18105ZM12.0008 9.18105C11.2072 9.181 10.4315 9.41702 9.77239 9.85911C9.11328 10.3012 8.60058 10.9294 8.29952 11.6637C7.99846 12.398 7.92265 13.2053 8.08172 13.9828C8.2408 14.7603 8.62758 15.473 9.19285 16.0301L9.35584 16.1801H14.6458C15.2548 15.6426 15.6857 14.9325 15.8813 14.1442C16.0768 13.3559 16.0278 12.5268 15.7407 11.767C15.4536 11.0073 14.942 10.3529 14.2739 9.89098C13.6059 9.42906 12.813 9.18144 12.0008 9.18105ZM21.0008 12.1811C21.2557 12.1813 21.5009 12.2789 21.6862 12.4539C21.8715 12.6289 21.9831 12.868 21.998 13.1224C22.013 13.3769 21.9302 13.6274 21.7666 13.8229C21.603 14.0183 21.3709 14.144 21.1178 14.1741L21.0008 14.1811H20.0008C19.746 14.1808 19.5008 14.0832 19.3155 13.9082C19.1301 13.7332 19.0186 13.4941 19.0037 13.2397C18.9887 12.9852 19.0715 12.7347 19.2351 12.5392C19.3987 12.3438 19.6307 12.2182 19.8838 12.1881L20.0008 12.1811H21.0008ZM4.00085 12.1811C4.25572 12.1813 4.50088 12.2789 4.68621 12.4539C4.87155 12.6289 4.98308 12.868 4.99802 13.1224C5.01295 13.3769 4.93017 13.6274 4.76658 13.8229C4.60299 14.0183 4.37094 14.144 4.11785 14.1741L4.00085 14.1811H3.00085C2.74597 14.1808 2.50081 14.0832 2.31548 13.9082C2.13014 13.7332 2.01861 13.4941 2.00367 13.2397C1.98874 12.9852 2.07152 12.7347 2.23511 12.5392C2.3987 12.3438 2.63075 12.2182 2.88385 12.1881L3.00085 12.1811H4.00085ZM6.34385 6.11005L7.05085 6.81705C7.233 7.00566 7.3338 7.25826 7.33152 7.52046C7.32924 7.78265 7.22407 8.03346 7.03866 8.21887C6.85326 8.40428 6.60244 8.50945 6.34025 8.51173C6.07805 8.51401 5.82545 8.41321 5.63685 8.23105L4.92985 7.52405C4.74769 7.33545 4.64689 7.08285 4.64917 6.82065C4.65145 6.55846 4.75662 6.30764 4.94203 6.12224C5.12743 5.93683 5.37825 5.83166 5.64044 5.82938C5.90264 5.8271 6.15524 5.9279 6.34385 6.11005ZM17.6578 6.11005C17.8378 5.93071 18.0793 5.82658 18.3332 5.81883C18.5872 5.81107 18.8346 5.90027 19.0251 6.0683C19.2157 6.23634 19.3351 6.47061 19.3592 6.72353C19.3833 6.97645 19.3103 7.22906 19.1548 7.43005L19.0718 7.52405L18.3648 8.23105C18.1849 8.4104 17.9434 8.51453 17.6895 8.52228C17.4355 8.53004 17.1881 8.44084 16.9976 8.27281C16.807 8.10477 16.6875 7.8705 16.6634 7.61758C16.6394 7.36466 16.7124 7.11205 16.8678 6.91105L16.9508 6.81705L17.6578 6.11005Z"
        fill="currentColor"
      />
      <path
        d="M11.2721 3.28322C11.098 3.46828 11.0009 3.71265 11.0005 3.96672L11.0005 4.96657L11.0083 5.09173C11.0405 5.34374 11.1674 5.57404 11.3633 5.73585C11.5592 5.89766 11.8093 5.97884 12.0629 5.96291C12.3165 5.94697 12.5545 5.83512 12.7285 5.65007C12.9026 5.46502 12.9998 5.22064 13.0002 4.96657L13.0002 3.96672L12.9924 3.84156C12.9602 3.58955 12.8332 3.35925 12.6373 3.19744C12.4415 3.03564 12.1913 2.95446 11.9378 2.97039C11.6842 2.98632 11.4462 3.09817 11.2721 3.28322Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1066_9803">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default CustomIcon;

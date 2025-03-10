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
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.47914 0.600117C3.47914 0.472813 3.42857 0.350723 3.33855 0.260706C3.24853 0.170688 3.12644 0.120117 2.99914 0.120117C2.87184 0.120117 2.74975 0.170688 2.65973 0.260706C2.56971 0.350723 2.51914 0.472813 2.51914 0.600117V1.32012H1.79914C1.67184 1.32012 1.54975 1.37069 1.45973 1.46071C1.36971 1.55072 1.31914 1.67281 1.31914 1.80012C1.31914 1.92742 1.36971 2.04951 1.45973 2.13953C1.54975 2.22955 1.67184 2.28012 1.79914 2.28012H2.51914V3.00012C2.51914 3.06315 2.53156 3.12557 2.55568 3.18381C2.5798 3.24204 2.61516 3.29496 2.65973 3.33953C2.7043 3.3841 2.75722 3.41946 2.81545 3.44358C2.87369 3.4677 2.93611 3.48012 2.99914 3.48012C3.06218 3.48012 3.12459 3.4677 3.18283 3.44358C3.24106 3.41946 3.29398 3.3841 3.33855 3.33953C3.38312 3.29496 3.41848 3.24204 3.4426 3.18381C3.46673 3.12557 3.47914 3.06315 3.47914 3.00012V2.28012H4.19914C4.32644 2.28012 4.44853 2.22955 4.53855 2.13953C4.62857 2.04951 4.67914 1.92742 4.67914 1.80012C4.67914 1.67281 4.62857 1.55072 4.53855 1.46071C4.44853 1.37069 4.32644 1.32012 4.19914 1.32012H3.47914V0.600117ZM7.07914 4.20012C7.07914 4.13708 7.06672 4.07467 7.0426 4.01643C7.01848 3.95819 6.98312 3.90528 6.93855 3.86071C6.89398 3.81613 6.84106 3.78078 6.78283 3.75666C6.72459 3.73253 6.66217 3.72012 6.59914 3.72012C6.53611 3.72012 6.47369 3.73253 6.41545 3.75666C6.35722 3.78078 6.3043 3.81613 6.25973 3.86071C6.21516 3.90528 6.1798 3.95819 6.15568 4.01643C6.13156 4.07467 6.11914 4.13708 6.11914 4.20012V4.92012H5.39914C5.33611 4.92012 5.27369 4.93253 5.21545 4.95666C5.15722 4.98078 5.1043 5.01613 5.05973 5.06071C5.01516 5.10528 4.9798 5.15819 4.95568 5.21643C4.93156 5.27467 4.91914 5.33708 4.91914 5.40012C4.91914 5.46315 4.93156 5.52557 4.95568 5.58381C4.9798 5.64204 5.01516 5.69496 5.05973 5.73953C5.1043 5.7841 5.15722 5.81946 5.21545 5.84358C5.27369 5.8677 5.33611 5.88012 5.39914 5.88012H6.11914V6.60012C6.11914 6.66315 6.13156 6.72557 6.15568 6.78381C6.1798 6.84204 6.21516 6.89496 6.25973 6.93953C6.3043 6.9841 6.35722 7.01946 6.41545 7.04358C6.47369 7.0677 6.53611 7.08012 6.59914 7.08012C6.66217 7.08012 6.72459 7.0677 6.78283 7.04358C6.84106 7.01946 6.89398 6.9841 6.93855 6.93953C6.98312 6.89496 7.01848 6.84204 7.0426 6.78381C7.06672 6.72557 7.07914 6.66315 7.07914 6.60012V5.88012H7.79914C7.92644 5.88012 8.04853 5.82955 8.13855 5.73953C8.22857 5.64951 8.27914 5.52742 8.27914 5.40012C8.27914 5.27281 8.22857 5.15072 8.13855 5.06071C8.04853 4.97069 7.92644 4.92012 7.79914 4.92012H7.07914V4.20012ZM2.27914 7.80012C2.27914 7.67281 2.22857 7.55072 2.13855 7.46071C2.04853 7.37069 1.92644 7.32012 1.79914 7.32012C1.67184 7.32012 1.54975 7.37069 1.45973 7.46071C1.36971 7.55072 1.31914 7.67281 1.31914 7.80012V8.52012H0.599141C0.471837 8.52012 0.349747 8.57069 0.259729 8.66071C0.169712 8.75072 0.119141 8.87281 0.119141 9.00012C0.119141 9.12742 0.169712 9.24951 0.259729 9.33953C0.349747 9.42955 0.471837 9.48012 0.599141 9.48012H1.31914V10.2001C1.31914 10.3274 1.36971 10.4495 1.45973 10.5395C1.54975 10.6295 1.67184 10.6801 1.79914 10.6801C1.92644 10.6801 2.04853 10.6295 2.13855 10.5395C2.22857 10.4495 2.27914 10.3274 2.27914 10.2001V9.48012H2.99914C3.12644 9.48012 3.24853 9.42955 3.33855 9.33953C3.42857 9.24951 3.47914 9.12742 3.47914 9.00012C3.47914 8.87281 3.42857 8.75072 3.33855 8.66071C3.24853 8.57069 3.12644 8.52012 2.99914 8.52012H2.27914V7.80012ZM10.2519 1.17852L9.89434 1.13052C9.63874 1.10172 9.48634 1.39932 9.63394 1.61052C10.5535 2.93436 11.0452 4.50825 11.0427 6.12012C11.0421 8.14623 10.2651 10.0951 8.8717 11.566C7.47827 13.0368 5.57425 13.9179 3.55114 14.0281C3.29434 14.0425 3.15154 14.3449 3.33154 14.5285C3.41375 14.6127 3.49777 14.6951 3.58354 14.7757L3.66994 14.8549L3.98194 15.1261L4.20754 15.3037L4.35274 15.4117L4.57714 15.5689L4.78834 15.7069C4.93234 15.7981 5.08114 15.8857 5.23234 15.9673L5.54914 16.1293L5.86114 16.2733L6.22474 16.4197L6.51754 16.5229C6.94893 16.6649 7.39178 16.7692 7.84114 16.8349L8.22154 16.8829L8.54194 16.9069C9.69382 16.9741 10.8465 16.7889 11.9193 16.3641C12.992 15.9393 13.9591 15.2852 14.7526 14.4476C15.5462 13.61 16.1472 12.6091 16.5136 11.515C16.8799 10.4209 17.0028 9.25989 16.8735 8.11332L16.8291 7.78092C16.7395 7.19947 16.5849 6.62991 16.3683 6.08292L16.2327 5.76132L16.1403 5.56212L16.0515 5.38452C15.8613 5.01467 15.6422 4.66037 15.3963 4.32492L15.2127 4.08492L14.9739 3.79692L14.7783 3.58092L14.6343 3.43212L14.4423 3.24252L14.1747 3.00252L13.7907 2.69052L13.4967 2.47812L13.1463 2.25012L12.7611 2.02692L12.3675 1.82892L12.2319 1.76652L11.9439 1.64532L11.6127 1.52052L11.3103 1.42212L10.9203 1.31412L10.6023 1.24212L10.2519 1.17852ZM12.4839 6.36012C12.4848 5.16873 12.2516 3.98878 11.7975 2.88732C13.4121 3.64287 14.6603 5.00884 15.2677 6.68474C15.8751 8.36064 15.7919 10.2092 15.0363 11.8237C14.2808 13.4382 12.9148 14.6865 11.2389 15.2939C9.56302 15.9013 7.71447 15.8181 6.09994 15.0625C7.83068 14.5172 9.35971 13.4686 10.4919 12.0505C10.6036 12.2042 10.7611 12.3186 10.9418 12.3773C11.1226 12.4359 11.3172 12.4357 11.4979 12.3768C11.6785 12.3179 11.8358 12.2032 11.9472 12.0493C12.0586 11.8954 12.1184 11.7101 12.1179 11.5201C12.1181 11.3159 12.0488 11.1177 11.9215 10.9581C11.7941 10.7985 11.6163 10.6869 11.4171 10.6417C11.4915 10.5025 11.5635 10.3597 11.6307 10.2157C11.8281 10.3378 12.051 10.4124 12.2821 10.4338C12.5132 10.4551 12.746 10.4225 12.9624 10.3386C13.1787 10.2547 13.3726 10.1217 13.5289 9.9502C13.6851 9.77865 13.7995 9.57319 13.8629 9.34997C13.9263 9.12676 13.937 8.89188 13.8943 8.66381C13.8515 8.43573 13.7565 8.22069 13.6165 8.03558C13.4766 7.85047 13.2956 7.70035 13.0879 7.59703C12.8801 7.49371 12.6512 7.43999 12.4191 7.44012C12.4599 7.08612 12.4815 6.72612 12.4815 6.36012H12.4839Z"
      fill="currentColor"
    />
  </svg>
);

export default CustomIcon;

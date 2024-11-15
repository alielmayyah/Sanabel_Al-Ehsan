import React from "react";
import { useTranslation } from "react-i18next";

interface CircularProgressBarProps {
  points: number;
  missions: number;
  maxPoints: number;
  maxMissions: number;
  radius?: number; // Optional radius for customization
  strokeWidth?: number; // Optional stroke width for customization
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  points,
  missions,
  maxPoints,
  maxMissions,
  radius = 80,
  strokeWidth = 12,
}) => {
  const circumference = 2 * Math.PI * radius;

  // Calculate progress as percentages
  const pointsProgress = (points / maxPoints) * 100;
  const missionsProgress = (missions / maxMissions) * 100;

  // Convert percentages to stroke dashoffset values
  const pointsOffset = circumference - (pointsProgress / 100) * circumference;
  const missionsOffset =
    circumference - (missionsProgress / 100) * circumference;

  const { t } = useTranslation();

  return (
    <div className="flex  items-center justify-around w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-end gap-3">
          <div className="flex-center flex-col ">
            <h1 className="text-black">{t("الحسنات")}</h1>

            <h1 className="text-blueprimary">
              {" "}
              {points}/{maxPoints}
            </h1>
          </div>
          <div className="w-4 h-4 rounded-full mt-1 bg-blueprimary" />
        </div>
        <div className="flex items-start justify-end gap-3">
          <div className="flex-center flex-col ">
            <h1 className="text-black"> {t("التحديات")}</h1>

            <h1 className="text-yellowprimary">
              {" "}
              {missions}/{maxMissions}
            </h1>
          </div>
          <div className="w-4 h-4 rounded-full mt-1 bg-yellowprimary" />
        </div>
      </div>
      <svg
        width={radius * 2 + strokeWidth * 2}
        height={radius * 2 + strokeWidth * 2}
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${
          radius * 2 + strokeWidth * 2
        }`}
      >
        {/* Background Circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#D5EBF6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Points Progress */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#4AAAD6"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={pointsOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + strokeWidth} ${
            radius + strokeWidth
          })`}
        />

        {/* Background Circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius - strokeWidth - 15}
          stroke="#FAB700"
          opacity={0.16}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Missions Progress */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius - strokeWidth - 15}
          stroke="#FAB700"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={missionsOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + strokeWidth} ${
            radius + strokeWidth
          })`}
        />
        {/* Points Label */}
      </svg>
    </div>
  );
};

export default CircularProgressBar;

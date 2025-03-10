import React, { useState, useEffect } from "react";

import { medalsImgs } from "../data/Medals";
// Define the props type
interface MedalAndLevelProps {
  level: number;
  color: string;
  dir: string;
}

const MedalAndLevel: React.FC<MedalAndLevelProps> = ({ level, color, dir }) => {
  const [medalImgTracker, setMedalImgTracker] = useState(0);

  useEffect(() => {
    if (level < 5) {
      setMedalImgTracker(0);
    } else if (level >= 5 && level < 10) {
      setMedalImgTracker(1);
    } else if (level >= 10 && level < 25) {
      setMedalImgTracker(2);
    } else if (level >= 25 && level < 50) {
      setMedalImgTracker(3);
    } else if (level >= 50 && level < 75) {
      setMedalImgTracker(4);
    } else if (level >= 75 && level < 100) {
      setMedalImgTracker(5);
    } else if (level >= 100 && level < 150) {
      setMedalImgTracker(6);
    } else if (level >= 150 && level < 200) {
      setMedalImgTracker(7);
    } else {
      setMedalImgTracker(8);
    }
  }, [level]);

  return (
    <div
      className={`w-full h-full flex-center gap-0 ${
        dir === "horizontal" ? "flex" : "flex-col"
      }`}
    >
      <img
        src={medalsImgs[medalImgTracker]}
        alt={`${level}`}
        className="w-16"
      />
      <h1 className={`text-md ${color}`}>المستوي {level}</h1>
    </div>
  );
};

export default MedalAndLevel;

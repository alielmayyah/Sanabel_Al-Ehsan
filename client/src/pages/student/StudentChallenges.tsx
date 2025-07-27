import { IonRouterLink } from "@ionic/react";
import StudentNavbar from "../../components/navbar/StudentNavbar";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import sanabelVideo from "../../assets/sanabelAnimation.mp4";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import Success from "../../assets/Success.json"; // Replace with a To-Do specific animation if desired
import { useRef, useEffect, useState } from "react";

// Pages
import StudentToDoList from "./StudentToDoList";
import ChooseSanabelType from "./challenges/ChooseSanabelType";
import { useUserContext } from "../../context/StudentUserProvider";

const Challenges: React.FC = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<"todo" | "sanabel">("todo");

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // Confetti size
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight * 0.9;

  // Ref to control video playback speed
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  const { user } = useUserContext();

  const grade = String(user?.grade);
  const canAssignTask = user?.canAssignTask;
  return (
    <motion.div
      className="flex flex-col items-center w-full h-full" // Added pb-4 for bottom padding
      id="page-height"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Confetti */}
      {/* <Confetti
        width={windowWidth}
        height={windowHeight}
        numberOfPieces={10}
        recycle={true}
        className="absolute z-0"
      /> */}

      {/* Selection Cards */}
      {/* <div className="z-10 flex items-center justify-around w-11/12 max-w-md p-3 px-4 bg-white border-4 border-gray-100 shadow-lg rounded-2xl">
        <motion.div
          variants={itemVariants}
          className={`w-1/2 cursor-pointer transition-all duration-300 ${
            view === "todo" ? "border-redprimary border-b-4 pb-1" : "" 
          }`}
          onClick={() => setView("todo")}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            {" "}
 
            <div className="w-1/2">
              <Lottie
                animationData={Success}
                loop={true}
                className="w-full h-auto p-1 bg-red-100 rounded-full" 
              />
            </div>
            <h1 className="mt-1 text-xl font-bold text-redprimary">
              {" "}
        
              {t("قائمة المهام")}
            </h1>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`w-1/2 cursor-pointer transition-all duration-300 ${
            view === "sanabel" ? "border-blueprimary border-b-4 pb-1" : "" 
          }`}
          onClick={() => setView("sanabel")}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            {" "}
  
            <div className="w-1/2">
              <video
                ref={videoRef}
                src={sanabelVideo}
                autoPlay
                loop
                muted
                preload="metadata"
                className="w-full h-auto rounded-xl" 
              />
            </div>
            <h1 className="mt-1 text-xl font-bold text-blueprimary">
              {" "}
  
              {t("سنابل")}
            </h1>
          </div>
        </motion.div>
      </div> */}

      {/* Dynamic View Rendering */}
      <div className="w-full max-w-md overflow-y-auto bg-white shadow-md rounded-xl">
        {!grade || canAssignTask ? <StudentToDoList /> : <ChooseSanabelType />}
      </div>

      {/* Navbar */}
      <StudentNavbar />
    </motion.div>
  );
};

export default Challenges;

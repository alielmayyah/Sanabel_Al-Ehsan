import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GoBackButton from "../../../components/GoBackButton";

import Tickcircle from "../../../icons/Sanabel/Tickcircle";
import { FaLocationArrow } from "react-icons/fa";

import sanabelType from "../../../data/SanabelTypeData";
import PrayerTimes from "./PrayerTimes";
import axios from "axios";
import { sanabelImgs } from "../../../data/SanabelImgs";

// Sanabel
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../../assets/resources/اكس بي.png";
import { motion } from "framer-motion";

const SanabelMissionsPage: React.FC = () => {
  const { index, subIndex } = useParams<{ index: any; subIndex: any }>();
  // Ensure index is properly parsed as a number
  const indexAsNumber = parseInt(index, 10);
  // Make sure APIIndex is correctly calculated as a number
  const APIIndex = indexAsNumber + 1;
  // const sanabel = sanabelType[index].sanabel[subIndex];

  const { t } = useTranslation();

  const sanabelIndex = index;

  let colors = [];

  colors = ["bg-blueprimary", "bg-redprimary", "bg-yellowprimary"];

  const colorBG = colors[index % colors.length];
  let colorBorder = [];
  colorBorder = [
    "border-t-blueprimary",
    "border-t-redprimary",
    "border-t-yellowprimary",
  ];

  const colorBorderTop = colorBorder[index % colors.length];

  const [location, setLocation] = useState<string>(
    localStorage.getItem("selectedLocation") || "الإسكندرية"
  );

  // Add a list of available cities
  const availableCities = ["القاهرة", "الإسكندرية"];

  // Save location to localStorage when it changes
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("selectedLocation", newLocation);
  };

  const [categoryName, setCategoryName] = useState("");
  const [sanabel, setSanabel] = useState<string[]>([]);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) return;

      try {
        // Fetch Category Name
        const categoryResponse = await axios.get(
          "http://localhost:3000/students/tasks-category",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (categoryResponse.status === 200) {
          const fetchedCategoryName =
            categoryResponse.data.data[index].category;
          setCategoryName(fetchedCategoryName);

          // Fetch Sanabel
          const sanabelResponse = await axios.get(
            `http://localhost:3000/students/appear-Taskes-Type/${APIIndex}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (sanabelResponse.status === 200) {
            const uniqueTypes: string[] = [];
            sanabelResponse.data.data.forEach((task: { type: string }) => {
              if (!uniqueTypes.includes(task.type)) {
                uniqueTypes.push(task.type);
              }
            });

            setSanabel(uniqueTypes);

            // Fetch Missions
            if (uniqueTypes[subIndex]) {
              const missionsResponse = await axios.get(
                `http://localhost:3000/students/appear-Taskes-Type-Category/${APIIndex}/${sanabel[subIndex]}`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );

              if (missionsResponse.status === 200) {
                console.log(missionsResponse.data.tasks);
                console.log(APIIndex);
                console.log(sanabel);
                console.log(sanabel[subIndex]);

                // Sort missions so completed ones appear first
                const sortedMissions = missionsResponse.data.tasks.sort(
                  (a: any, b: any) => {
                    if (
                      a.completionStatus === "Completed" &&
                      b.completionStatus !== "Completed"
                    ) {
                      return -1; // a comes first
                    }
                    if (
                      a.completionStatus !== "Completed" &&
                      b.completionStatus === "Completed"
                    ) {
                      return 1; // b comes first
                    }
                    return 0; // maintain original order for items with same completion status
                  }
                );

                setMissions(sortedMissions);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [sanabel, index, subIndex]);

  const renderResources = (items: any) =>
    [
      { icon: blueSanabel, value: items.snabelBlue },
      { icon: redSanabel, value: items.snabelRed },
      { icon: yellowSanabel, value: items.snabelYellow },
      { icon: xpIcon, value: items.xp },
    ].map((resource, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={resource.icon}
          alt="icon"
          className="w-auto h-6"
          loading="lazy"
        />
        <h1 className="text-sm text-black">{resource.value}</h1>
      </div>
    ));

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 ">
      <div className="flex items-center justify-between w-full">
        <div className="opacity-0 w-[25px] h-25" />
        <h1 className="self-center text-xl font-bold text-black" dir="ltr">
          {t(sanabel[subIndex])}
        </h1>
        <GoBackButton />
      </div>
      <div
        className={`w-full ${colorBG} flex justify-between items-center  p-5 rounded-lg  mt-8`}
      >
        <img
          src={sanabelImgs[sanabelIndex][subIndex]}
          alt={sanabel[subIndex]}
          className="w-1/3 object-contain drop-shadow-[0_0_1px_rgba(75,75,75,1)]"
        />

        <div className="flex flex-col justify-between gap-3">
          <h1 className="text-lg font-bold text-center text-white ">
            <span>{t("تحديات")}</span>
            <br></br>
            {t(sanabel[subIndex])}
          </h1>
          {index == 0 && subIndex == 0 && (
            <div className="flex flex-col items-center w-full scale-90">
              <div className="flex items-center gap-1 p-1 border-2 border-gray-300 rounded-lg">
                <FaLocationArrow className="text-white" />
                <select
                  className="px-2 py-1 text-white bg-transparent border-none rounded-lg outline-none cursor-pointer "
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                >
                  {availableCities.map((city) => (
                    <option
                      key={city}
                      value={city}
                      className="text-black bg-white"
                    >
                      {t(city)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {index == 0 && subIndex == 0 && <PrayerTimes location={location} />}

      <div className="flex flex-col items-center justify-start w-full gap-5 mt-5 overflow-y-auto h-2/3">
        {missions.map((mission: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex w-full flex-col items-end justify-between sanabel-shadow-bottom h-max rounded-xl p-4 gap-2 border-t-2  ${
              mission.completionStatus !== "Completed"
                ? `${colorBorderTop}`
                : "border-t-[#498200]"
            }`}
          >
            {mission.completionStatus === "Completed" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex justify-between w-full"
              >
                <div className="flex justify-between w-full ">
                  <div className={`flex-center  text-[#498200]`}>
                    <h1> {t("تمت")}</h1>
                    <Tickcircle />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: mission.completionStatus !== "Completed" ? 0.5 : 1,
                }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`flex gap-2`}
              >
                {renderResources(mission)}
              </motion.div>

              <h1 className="w-2/3 text-sm text-black text-end">
                {t(mission.title)}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SanabelMissionsPage;

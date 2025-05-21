import { useEffect, useState } from "react";
import Boy1 from "../../../assets/avatars/Boys/Boy1";
import Boy2 from "../../../assets/avatars/Boys/Boy2";
import Boy3 from "../../../assets/avatars/Boys/Boy3";
import Boy4 from "../../../assets/avatars/Boys/Boy4";
import Boy5 from "../../../assets/avatars/Boys/Boy5";
import Boy6 from "../../../assets/avatars/Boys/Boy6";
import Boy7 from "../../../assets/avatars/Boys/Boy7";
import Boy8 from "../../../assets/avatars/Boys/Boy8";

import Girl1 from "../../../assets/avatars/Girls/Girl1";
import Girl2 from "../../../assets/avatars/Girls/Girl2";
import Girl3 from "../../../assets/avatars/Girls/Girl3";
import Girl4 from "../../../assets/avatars/Girls/Girl4";
import Girl5 from "../../../assets/avatars/Girls/Girl5";
import Girl6 from "../../../assets/avatars/Girls/Girl6";
import Girl7 from "../../../assets/avatars/Girls/Girl7";
import Girl8 from "../../../assets/avatars/Girls/Girl8";
import { useTranslation } from "react-i18next";
import axios from "axios";

const GetAvatar = ({ userAvatarData = {} }) => {
  const defaultAvatarData = {
    avatarId: 0,
    bgColor: "#2196F3",
    bgPattern: "solid",
    gender: "boy",
    hairColor: "",
    skinColor: "",
    tshirtColor: "",
  };

  // Merge default values with props, props take precedence
  const [avatarData, setAvatarData] = useState({
    ...defaultAvatarData,
    ...userAvatarData,
  });

  // Update state when props change
  useEffect(() => {
    setAvatarData({
      ...defaultAvatarData,
      ...userAvatarData,
    });
  }, [userAvatarData]);

  // Map avatar components by gender and index
  const avatarComponents = {
    boy: [Boy1, Boy2, Boy3, Boy4, Boy5, Boy6, Boy7, Boy8],
    girl: [Girl1, Girl2, Girl3, Girl4, Girl5, Girl6, Girl7, Girl8],
  };

  const { t } = useTranslation();

  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex: any, percent: any) => {
    if (!hex || !hex.startsWith("#") || hex.length !== 7) {
      return "#000000"; // Return black as fallback
    }

    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Helper function to generate a gradient string
  const getGradientString = (color: any) => {
    return `linear-gradient(135deg, ${color} 0%, ${adjustColorBrightness(
      color,
      -30
    )} 100%)`;
  };

  // Get the appropriate avatar component based on gender and avatar index
  const getAvatarComponent = () => {
    // Default to "boy" if gender is not valid
    const gender =
      avatarData.gender === "boy" || avatarData.gender === "girl"
        ? avatarData.gender
        : "boy";

    // Ensure avatarId is within bounds of the array (default to 0 if not set)
    const avatarId =
      avatarData.avatarId !== undefined ? avatarData.avatarId : 0;
    const safeAvatarId = Math.min(
      Math.max(0, avatarId),
      avatarComponents[gender].length - 1
    );

    return avatarComponents[gender][safeAvatarId];
  };

  // Get the current avatar component
  const AvatarComponent = getAvatarComponent();

  const updatePhoto = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      if (!avatarData) {
        console.error("No avatar data found in local storage.");
        return;
      }

      const response = await axios.patch(
        "http://localhost:3000/students/update-profile-image",
        {
          profileImg: {
            avatarId: avatarData.avatarId,
            bgColor: avatarData.bgColor,
            bgPattern: avatarData.bgPattern,
            gender: avatarData.gender,
            hairColor: avatarData.hairColor,
            skinColor: avatarData.skinColor,
            tshirtColor: avatarData.tshirtColor,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  updatePhoto();

  return (
    <div
      className="rounded-full overflow-hidden w-full h-full"
      style={{
        background:
          avatarData.bgPattern === "gradient"
            ? getGradientString(avatarData.bgColor)
            : avatarData.bgPattern === "dots"
            ? `radial-gradient(circle, ${
                avatarData.bgColor
              } 2px, ${adjustColorBrightness(
                avatarData.bgColor,
                30
              )} 2px) 0 0 / 10px 10px`
            : avatarData.bgPattern === "lines"
            ? `repeating-linear-gradient(45deg, ${avatarData.bgColor}, ${
                avatarData.bgColor
              } 5px, ${adjustColorBrightness(
                avatarData.bgColor,
                20
              )} 5px, ${adjustColorBrightness(avatarData.bgColor, 20)} 10px)`
            : avatarData.bgColor || "#2196F3",
      }}
    >
      {AvatarComponent && (
        <AvatarComponent
          tshirtColor={avatarData.tshirtColor || undefined}
          hairColor={avatarData.hairColor || undefined}
          skinColor={avatarData.skinColor || undefined}
        />
      )}
    </div>
  );
};

export default GetAvatar;

import React, { useState } from "react";

import EmailOTP from "./EmailOTP";

import axios from "axios";
import { t } from "i18next";
import { toast } from "react-toastify";
import Step1 from "./Step1";
import Password from "./Password";
import { useHistory } from "react-router-dom";

const Signup: React.FC = () => {
  const history = useHistory();
  const [stepIndex, setStepIndex] = useState(0);

  // State for storing data from each step
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Teacher");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const steps = [
    <EmailOTP
      onContinue={() => {
        setStepIndex(stepIndex + 1);
      }}
      email={email}
      setEmail={setEmail}
      onBack={() => setStepIndex(stepIndex - 1)}
      otp={otp}
      setOtp={setOtp}
    />,
    <Password
      onContinue={() => setStepIndex(stepIndex + 1)}
      setPassword={setPassword}
      password={password}
    />,
    <Step1
      onComplete={() => handleSubmit()}
      onBack={() => setStepIndex(stepIndex - 1)}
      name={name}
      setName={setName}
      role={role}
      setRole={setRole}
      setAvatar={setAvatar}
    />,
  ];

  const handleSubmit = async () => {
    // Format name and date of birth
    const formattedName = {
      firstName: name.firstName,
      lastName: name.lastName,
    };

    // Final data structure
    const formData = {
      firstName: formattedName.firstName,
      lastName: formattedName.lastName,
      email,
      password,
      role,
    };

    console.log("Submitting form data:", formData);

    // Handle API submission here
    try {
      const response = await axios.post(
        "http://localhost:3000/users/registration",
        formData
      );
      if (response.status === 200) {
        history.push("/home");
      }
    } catch (error) {
      console.error("Error", error);

    }
  };

  return (
    <div className="w-screen h-screen">
      {steps[stepIndex]}
      {stepIndex > 0 && (
        <button
          onClick={() => setStepIndex(stepIndex - 1)}
          className="back-button"
        >
         {t("الرجوع")}
        </button>
      )}
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Email from "./Email";
import OTP from "./OTP";

const Signup: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  // State for storing data from each step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState({ firstName: "", parentName: "" });
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState({ day: "", month: "", year: "" });
  const [gradeYear, setGradeYear] = useState("");
  const [parentCode, setParentCode] = useState("");
  const [character, setCharacter] = useState("");

  const steps = [
    <Email
      onContinue={() => setStepIndex(stepIndex + 1)}
      setEmail={setEmail}
    />,
    <OTP
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      otp={otp}
      setOtp={setOtp}
    />,
    <Step1
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      name={name}
      setName={setName}
    />,
    <Step2
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      gender={gender}
      setGender={setGender}
    />,
    <Step3
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      birthdate={birthdate}
      setBirthdate={setBirthdate}
    />,
    <Step4
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      gradeYear={gradeYear}
      setGradeYear={setGradeYear}
    />,
    <Step5
      onContinue={() => setStepIndex(stepIndex + 1)}
      onBack={() => setStepIndex(stepIndex - 1)}
      parentCode={parentCode}
      setParentCode={setParentCode}
    />,
    <Step6
      onComplete={() => handleSubmit()}
      onBack={() => setStepIndex(stepIndex - 1)}
      character={character}
      setCharacter={setCharacter}
    />,
  ];

  const handleSubmit = () => {
    // Combine all collected data here
    const formData = {
      email,
      otp,
      name,
      gender,
      birthdate,
      gradeYear,
      parentCode,
      character,
    };
    console.log("Submitting form data:", formData);

    // Call API or handle form data submission
  };

  return (
    <div className="w-screen h-screen">
      {steps[stepIndex]}
      {stepIndex > 0 && (
        <button
          onClick={() => setStepIndex(stepIndex - 1)}
          className="back-button"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Signup;

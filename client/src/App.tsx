import { Redirect, Route, Switch } from "react-router-dom";
import { IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

// PAGES

import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import Leaderboards from "./pages/Leaderboards";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";

import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

// signup steps
import Step1 from "./pages/signup/Step1";
import Step2 from "./pages/signup/Step2";
import Step3 from "./pages/signup/Step3";
import Step4 from "./pages/signup/Step4";
import Step5 from "./pages/signup/Step5";
import Step6 from "./pages/signup/Step6";

import Email from "./pages/signup/Email";
import OTP from "./pages/signup/OTP";

import ForgotPassword from "./pages/login/ForgotPassword";
import ChangePassword from "./pages/login/ChangePassword";
// SUB Pages

import ChooseSignMethod from "./pages/onboarding/ChooseSignMethod";

import OnBoarding from "./pages/onboarding/Onboarding";

import { useTheme } from "./context/ThemeContext";
import { useEffect, useState } from "react";
setupIonicReact();

import { useTranslation } from "react-i18next";
import "./i18n";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const [firstTime, setFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user has opened the app before
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setFirstTime(false);
    } else {
      // Mark that the user has now opened the app
      localStorage.setItem("hasVisited", "true");
    }

    // Check for login token to determine logged-in status
    const token = localStorage.getItem("authToken"); // replace with your actual token check
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <div className="bg-white dark:bg-[#121212]   w-screen h-screen">
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  // Navigate based on user status
                  if (firstTime) {
                    return <OnBoarding />;
                  } else if (isLoggedIn) {
                    return <Redirect to="/home" />;
                  } else {
                    return <Redirect to="/choosesignmethod" />;
                  }
                }}
              />
              <Route
                exact
                path="/choosesignmethod"
                component={ChooseSignMethod}
              />

              {/* //SIGNUP PAGES */}
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/email" component={Email} />
              <Route exact path="/otp" component={OTP} />

              {/* //SIGNUP STEPS */}
              <Route exact path="/step1" component={Step1} />
              <Route exact path="/step2" component={Step2} />
              <Route exact path="/step3" component={Step3} />
              <Route exact path="/step4" component={Step4} />
              <Route exact path="/step5" component={Step5} />
              <Route exact path="/step6" component={Step6} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/changepassword" component={ChangePassword} />

              <Route exact path="/home" component={Home} />
              <Route exact path="/progress" component={Progress} />
              <Route exact path="/challenges" component={Challenges} />
              <Route exact path="/leaderboards" component={Leaderboards} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </IonRouterOutlet>
      </IonReactRouter>
    </ThemeProvider>
  );
};
export default App;

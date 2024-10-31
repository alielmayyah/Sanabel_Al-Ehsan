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

import Signup from "./pages/signup/student/Signup";
import Login from "./pages/login/Login";

import SignupParentOrTeacher from "./pages/signup/parent_teacher/SignupParentOrTeacher";

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
import SplashScreen from "./pages/onboarding/SplashScreen";

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const [firstTime, setFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for login token and "keep me logged in" status

    const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

    if (keepLoggedIn) {
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
                  const hasVisited =
                    localStorage.getItem("hasVisited") === "true";
                  const keepLoggedIn =
                    localStorage.getItem("keepLoggedIn") === "true";

                  if (keepLoggedIn) {
                    // User is logged in, redirect to home
                    return <Redirect to="/home" />;
                  } else if (!hasVisited) {
                    // First time user, show SplashScreen
                    return <SplashScreen />;
                  } else {
                    // If the user has visited before, go to ChooseSignMethod
                    return <Redirect to="/choosesignmethod" />;
                  }
                }}
              />
              <Route exact path="/onboarding" component={OnBoarding} />
              <Route
                exact
                path="/choosesignmethod"
                component={ChooseSignMethod}
              />
              {/* //SIGNUP PAGES */}
              <Route exact path="/signup" component={Signup} />
              <Route
                exact
                path="/signupparentorteacher"
                component={SignupParentOrTeacher}
              />
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

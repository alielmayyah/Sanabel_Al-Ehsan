import { Redirect, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

// PAGES

import SplashScreen from "./pages/common/onboarding/SplashScreen";
import OnBoarding from "./pages/common/onboarding/Onboarding";
import ChooseSignMethod from "./pages/common/onboarding/ChooseSignMethod";

// Student Signup
import SignupStudent from "./pages/common/signup/student/SignupStudent";

// Login
import Login from "./pages/common/login/Login";
3;

// Student
import StudentNavbar from "./components/navbar/StudentNavbar";
import StudentProfile from "./pages/student/profile/StudentProfile";
import StudentProfileEdit from "./pages/student/profile/StudentProfileEdit";
import StudentSettings from "./pages/student/profile/StudentSettings";

// Teacher
import TeacherNavbar from "./components/navbar/TeacherNavbar";
import TeacherHome from "./pages/teacherorparent/teacher/TeacherHome";
import TeacherProfile from "./pages/teacherorparent/profile/Profile";

// Parent
import ParentNavbar from "./components/navbar/ParentNavbar";

import { useTheme } from "./context/ThemeContext";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import "./i18n";
import ForgotPassword from "./pages/common/login/ForgotPassword";
import ChangePassword from "./pages/common/login/ChangePassword";

setupIonicReact();

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
              {/* <Route
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
              /> */}
              {/* Splash Screen */}
              <Route exact path="/" component={SplashScreen} />
              {/* Onboarding */}
              <Route exact path="/onboarding" component={OnBoarding} />
              <Route
                exact
                path="/choosesignmethod"
                component={ChooseSignMethod}
              />
              {/* Signup */}
              <Route exact path="/signupstudent" component={SignupStudent} />

              {/* Login */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/changepassword" component={ChangePassword} />

              {/* Student */}
              <Route exact path="/student/home" component={StudentNavbar} />
              <Route exact path="/student/profile" component={StudentProfile} />
              <Route
                exact
                path="/student/profile/edit"
                component={StudentProfileEdit}
              />
              <Route
                exact
                path="/student/settings"
                component={StudentSettings}
              />

              {/* Teacher */}
              <Route exact path="/teacher/home" component={TeacherHome} />
              <Route exact path="/teacher/profile" component={TeacherProfile} />

              {/* Parent */}
              <Route exact path="/parent/home" component={ParentNavbar} />

              {/* Profile Pages */}

              {/* Sanabel Pages */}

              {/* Student */}

              {/* Teacher */}

              {/* Teacher */}
            </Switch>
          </div>
        </IonRouterOutlet>
      </IonReactRouter>
    </ThemeProvider>
  );
};
export default App;

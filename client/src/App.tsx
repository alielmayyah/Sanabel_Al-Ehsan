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

// Notifications

import Notifications from "./pages/common/Notifications";

// Student
import StudentNavbar from "./components/navbar/StudentNavbar";
import StudentHome from "./pages/student/StudentHome";
import StudentProfile from "./pages/student/StudentProfile";
import StudentProfileEdit from "./pages/student/profile/StudentProfileEdit";
import StudentSettings from "./pages/student/profile/StudentSettings";
import StudentPrivacyPolicy from "./pages/student/profile/StudentPrivacyPolicy";
import StudentHelpCenter from "./pages/student/profile/StudentHelpCenter";
import StudentLeaderboards from "./pages/student/StudentLeaderboards";
import StudentTutorial from "./pages/student/tutorial/StudentTutorial";

import StudentChallenges from "./pages/student/StudentChallenges";
import ChooseSanabelType from "./pages/student/challenges/ChooseSanabelType";
import ChooseSanabel from "./pages/student/challenges/ChooseSanabel";
import SanabelMissionsPage from "./pages/student/challenges/SanabelMissionsPage";

import SanabelReminder from "./pages/student/challenges/SanabelReminder";

import StudentProgress from "./pages/student/StudentProgress";

// Teacher
import TeacherNavbar from "./components/navbar/TeacherNavbar";
import TeacherHome from "./pages/teacherorparent/teacher/TeacherHome";
import TeacherProfile from "./pages/teacherorparent/profile/Profile";
import TeacherChooseSanabelType from "./pages/teacherorparent/challenges/ChooseSanabelType";
import TeacherChooseSanabel from "./pages/teacherorparent/challenges/ChooseSanabel";
import TeacherSanabelMissionsPage from "./pages/teacherorparent/challenges/SanabelMissionsPage";
import TeacherView from "./pages/teacherorparent/TeacherView";

// Teacher View Details
import TeamsDetails from "./pages/teacherorparent/teacherviewdetails/TeamsDetails";
import StudentDetails from "./pages/teacherorparent/teacherviewdetails/StudentDetails";
import ClassDetails from "./pages/teacherorparent/teacherviewdetails/ClassDetails";

// Registration
// Teacher Lists
import StudentsList from "./pages/teacherorparent/pointsregistration/StudentsList";
import TeamsList from "./pages/teacherorparent/pointsregistration/TeamsList";
import ClassList from "./pages/teacherorparent/pointsregistration/ClassList";

import RegistrationProcess from "./pages/teacherorparent/pointsregistration/registrationprocess/RegistrationProcess";

import ClassRegistrationDetails from "./pages/teacherorparent/pointsregistration/pointsregistrationdetails/ClassRegistrationDetails";

// Parent
import ParentNavbar from "./components/navbar/ParentNavbar";

import { useTheme } from "./context/ThemeContext";
import { UserProvider } from "./context/StudentUserProvider";

import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import "./i18n";
import ForgotPassword from "./pages/common/login/ForgotPassword";
import ChangePassword from "./pages/common/login/ChangePassword";

import Leaderboards from "./pages/student/StudentLeaderboards";

setupIonicReact();

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <UserProvider>
      <ThemeProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <div className="bg-white dark:bg-[#121212]  w-screen h-screen">
              {/*  UNCOMMENT*/}
              <Switch>
                {/* // Splash Screen */}
                {/* <Route exact path="/" component={StudentHome} /> */}
                <Route exact path="/" component={SplashScreen} />

                {/*  UNCOMMENT*/}
                {/* Onboarding */}
                <Route exact path="/onboarding" component={OnBoarding} />
                <Route
                  exact
                  path="/choosesignmethod"
                  component={ChooseSignMethod}
                />
                <Route
                  exact
                  path="/student/tutorial"
                  component={StudentTutorial}
                />
                {/* Signup */}
                <Route exact path="/signupstudent" component={SignupStudent} />
                {/* Login */}
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgotpassword"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/changepassword"
                  component={ChangePassword}
                />
                {/* Notifications */}
                <Route exact path="/notifications" component={Notifications} />
                {/* Student */}
                <Route exact path="/student/home" component={StudentHome} />
                <Route
                  exact
                  path="/student/profile"
                  component={StudentProfile}
                />
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
                <Route
                  exact
                  path="/student/settings/privacypolicy"
                  component={StudentPrivacyPolicy}
                />
                <Route
                  exact
                  path="/student/settings/helpcenter"
                  component={StudentHelpCenter}
                />
                <Route
                  exact
                  path="/student/challenges"
                  component={ChooseSanabelType}
                />
                <Route
                  exact
                  path="/student/progress"
                  component={StudentProgress}
                />
                <Route
                  exact
                  path="/student/leaderboards"
                  component={StudentLeaderboards}
                />
                <Route
                  path="/student/sanabel/:index/:subIndex"
                  component={SanabelMissionsPage}
                />
                <Route
                  path="/student/sanabel/:index"
                  component={ChooseSanabel}
                />

                {/* Teacher */}
                <Route exact path="/teacher/home" component={TeacherHome} />
                <Route
                  exact
                  path="/teacher/profile"
                  component={TeacherProfile}
                />

                <Route
                  exact
                  path="/teacher/challenges"
                  component={TeacherChooseSanabelType}
                />
                <Route
                  path="/teacher/sanabel/:index/:subIndex"
                  component={TeacherSanabelMissionsPage}
                />
                <Route
                  path="/teacher/sanabel/:index"
                  component={TeacherChooseSanabel}
                />

                <Route
                  path="/teacher/leaderboards/"
                  component={StudentLeaderboards}
                />

                <Route exact path="/teacher/view" component={TeacherView} />
                <Route
                  exact
                  path="/teacher/classdetails"
                  component={ClassDetails}
                />
                <Route
                  exact
                  path="/teacher/teamsdetails"
                  component={TeamsDetails}
                />
                <Route
                  exact
                  path="/teacher/studentdetails"
                  component={StudentDetails}
                />
                {/* Registration */}
                <Route
                  exact
                  path="/teacher/studentslist"
                  component={StudentsList}
                />
                <Route exact path="/teacher/classlist" component={ClassList} />
                <Route exact path="/teacher/teamslist" component={TeamsList} />
                <Route
                  exact
                  path="/teacher/classregistrationdetails"
                  component={ClassRegistrationDetails}
                />
                {/* Registration */}
                {/* Teacher Sanabel */}
                {/* <Route
                  exact
                  path="/Teacher/sanabel"
                  component={TeacherSanabel}
                />

                <Route
                  path="/Teacher/sanabel/:index"
                  component={TeacherSanabelPage}
                /> */}
                {/* <Route
                  path="/Teacher/sanabel/0"
                  component={TeacherSanabelPrayer}
                /> */}
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
    </UserProvider>
  );
};
export default App;

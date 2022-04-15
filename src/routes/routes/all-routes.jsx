import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import NotFound from "../../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Forgot from "../../pages/forgot/forgot";
import Contacts from "../../pages/Contacts";
import Team from "../../pages/team/team";
import Salaries from "../../pages/team/salaries";
import Money from "../../pages/team/money";
import Reminders from "../../pages/Reminders/Reminders";
import Starred from "../../pages/Starred/Starred";
import Alerts from "../../pages/Alerts/Alerts";
import Tasks from "../../pages/Tasks/Tasks";
import Clients from "../../pages/Contacts/Clients";
import Partners from "../../pages/Contacts/Partners";
import Vacations from "../../pages/team/vacations";
import Projects from "../../pages/Projects/Projects";
import News from "../../pages/News/News";
import { tokenForgotPassword } from "../../settings/tokens";
import RestorePassword from "../../pages/restore-password/restore-password";
import { team } from "../../settings/routing";
import TeamTree from "../../pages/team/team-tree/TeamTree";
import Nav from "../../components/nav/nav";
import WindowProfile from "../../windows/profile/WindowProfile";
import TeamMain from "../../pages/team/team-main/TeamMain";

/**
 *TODO: исправить наслоение фоновой страницы (когда создается модалка с профилем сотрудников при переходе с treeList)
 */
const AllRouters = ({ window }) => {
  let location = useLocation();
  let state = location.state; // откуда user перешел на страницу, предыдущий адрес
  return (
    <>
      <Nav window={window} />
      <Routes location={state?.backgroundLocation || location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/login/" element={<Login />} />
        <Route
          path={"/restore_password/" + tokenForgotPassword}
          element={<RestorePassword />}
        />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route
          path={team}
          element={
            <PrivateRoute>
              <Team window={window} />
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <PrivateRoute>
                <TeamMain />
              </PrivateRoute>
            }
          />
          <Route
            path="departments"
            element={
              <PrivateRoute>
                <TeamTree />
              </PrivateRoute>
            }
          />
          <Route
            path="salaries"
            element={
              <PrivateRoute>
                <Salaries />
              </PrivateRoute>
            }
          />
          <Route
            path="money"
            element={
              <PrivateRoute>
                <Money />
              </PrivateRoute>
            }
          />
          <Route
            path="vacations"
            element={
              <PrivateRoute>
                <Vacations />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path={team + "/departments"}
          element={
            <PrivateRoute>
              <TeamTree />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects window={window} />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/partners"
          element={
            <PrivateRoute>
              <Partners />
            </PrivateRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <PrivateRoute>
              <Reminders />
            </PrivateRoute>
          }
        />
        <Route
          path="/starred"
          element={
            <PrivateRoute>
              <Starred />
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <Alerts />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/news"
          element={
            <PrivateRoute>
              <News />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* фоновая страница */}
      <Routes>
        <Route
          path="/team/departments/:id"
          element={<WindowProfile page="TeamTree" />}
        />
        <Route
          path="/team/users/:id"
          element={<WindowProfile page="TeamList" />}
        />
      </Routes>
    </>
  );
};

export default AllRouters;

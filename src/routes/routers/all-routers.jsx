import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Profile from "../../pages/Profile";
import useAuth from "../../hooks/use-auth/use-auth";
import PrivateRoute from "../components/PrivateRoute";
import Forgot from "../../pages/forgot/forgot";
import Contacts from "../../pages/Contacts";
import Team from "../../pages/Team";
import Departments from "../../pages/Team/Departments";
import Salaries from "../../pages/Team/Salaries";
import Money from "../../pages/Team/Money";
import Reminders from "../../pages/Reminders/Reminders";
import Starred from "../../pages/Starred/Starred";
import Alerts from "../../pages/Alerts/Alerts";
import Tasks from "../../pages/Tasks/Tasks";
import Clients from "../../pages/Contacts/Clients";
import Partners from "../../pages/Contacts/Partners";
import Vacations from "../../pages/Team/Vacations";
import Projects from "../../pages/Projects/Projects";
import News from "../../pages/News/News";
import {tokenForgotPassword} from "../../variables/tokens";
import RestorePassword from "../../pages/restore-password/restore-password";

const AllRouters = () => {
  const auth = useAuth();

  return auth.isLoaded ? (
    <Routes>
      <Route path="/login/" element={<Login />} />

      <Route
        path={"/restore_password/" + tokenForgotPassword}
        element={<RestorePassword />}
      />

      <Route exact path="/forgot" element={<Forgot />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
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
            <Projects />
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
        path="/team"
        element={
          <PrivateRoute>
            <Team />
          </PrivateRoute>
        }
      />
      <Route
        path="/team/departments"
        element={
          <PrivateRoute>
            <Departments />
          </PrivateRoute>
        }
      />
      <Route
        path="/team/salaries"
        element={
          <PrivateRoute>
            <Salaries />
          </PrivateRoute>
        }
      />
      <Route
        path="/team/money"
        element={
          <PrivateRoute>
            <Money />
          </PrivateRoute>
        }
      />
      <Route
        path="/team/vacations"
        element={
          <PrivateRoute>
            <Vacations />
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

      {/* <Routes path="/not-found-404" element={<NotFound />} /> */}
    </Routes>
  ) : (
    <p>Загружаем информацию ... </p>
  );
};

export default AllRouters;

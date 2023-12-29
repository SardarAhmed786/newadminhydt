import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import useEagerConnect from './hooks/useEagerConnect'
import AdminLayout from "layouts/Admin.js";
import Login from "components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEagerConnect();
  return (
    <>
      <BrowserRouter>
      <ToastContainer
        position="bottom-left"
        theme="dark"
        style={{ fontSize: 20 }}
      />
        <Switch>
          <Route path="/adminlogin" render={(props) => <Login {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PointingPoker from "./components/PointingPoker/index";
import CreateSession from "./components/PointingPoker/CreateSession";
import { _fetch, _account } from "./ABI-connect/MessangerABI/connect";

export const AccountContext = createContext({
  account: "",
});

const App = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const account = await _account();
    if (account) {
      const user = await _fetch("users", account);
      setAccount(user);
    } else {
      setAccount("");
    }
  }

  return (
    <>
      {/* <NavigationBar /> */}
      <AccountContext.Provider value={{ account, fetchUserData }}>
        <Layout
          body={() => {
            return (
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} />

                <Route path="/pointing" element={<PointingPoker />} />
                <Route path="/create" element={<CreateSession />} />
              </Routes>
            );
          }}
        />
      </AccountContext.Provider>
    </>
  );
};
export default App;

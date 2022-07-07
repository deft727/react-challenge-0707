/* eslint-disable no-console */
import React, { useEffect } from "react";
// hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "hooks";
import { AUTH_ROUTES } from "utils/constants";
import json_users from 'assets/users.json';
import json_emails from 'assets/leads.json';

const Ctx = React.createContext();

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [users, setUsers] = useLocalStorage("users", undefined);
  const [emails, setEmails] = useLocalStorage("Emails", undefined);
  const [user, setUser] = useLocalStorage("user", undefined);
  const [checkedEmails, setCheckedEmails] = useLocalStorage("checkedEmails", []);

  const initialize = () => {
    setUsers(json_users);
    setEmails(json_emails);
  }

  useEffect(() => {
    if (user) {
      const expired = user.expired;
      const current = Math.floor(Date.now() / 1000);
      if (current - Number(expired) < 0) {
        if (AUTH_ROUTES.includes(pathname)) {
          const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
          setUser({
            ...user,
            expired,
          });
        } else {
          navigate("/dashboard");
        }
      } else {
        if (AUTH_ROUTES.includes(pathname)) {
          navigate("/login");
        }
      }
    } else {
      if (AUTH_ROUTES.includes(pathname)) {
        navigate("/login");
      }
    }
    /* eslint-disable-next-line */
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const expired = user.expired;
      const current = Math.floor(Date.now() / 1000);
      if (current - Number(expired) > 0) {
        if (AUTH_ROUTES.includes(pathname)) {
          navigate("/login");
        }
      }
    }else{
      navigate("/login");
    }
    /* eslint-disable-next-line */
  }, [user]);

  useEffect(() => {
    initialize();
    navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = (username, expired) => {
    console.log({username})
    return setUser({ username, expired });
  };

  const logoutUser = () => {
    return setUser(undefined);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        users,
        emails,
        login: loginUser,
        logout: logoutUser,
        checkedEmails,
        setCheckedEmails,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useLogin must be used inside LoginProvider`);
  }
  return context;
}

export { ContextProvider as LoginProvider, useContext as useLogin };

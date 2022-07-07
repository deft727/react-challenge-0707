import { Routes, Route, Navigate } from "react-router-dom";
// pages
import {
  // auth
  Login,
  Logout,
  // login user
  Dashboard,
  Overview,
  // other
  Page404,
} from "pages";

export const PublicRoutes = () => {
  return (
    <Routes>
      {/* landing */}
      <Route path="/" element={<Navigate to="Dashboard" />} />
      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      {/* login user */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/overview" element={<Overview />} />
      
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

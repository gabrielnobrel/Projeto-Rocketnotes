import { Routes, Route } from "react-router-dom";

import { SignIn } from "../pages/Singnin";
import { SingUp } from "../pages/SignUp";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SingUp />} />
    </Routes>
  );
}

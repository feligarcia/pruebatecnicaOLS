"use client";

import Home from "./Home";
import Login from "./Login";

import { useAuth } from "./AuthContext";

function LoginPage() {
  const { isLogin } = useAuth();

  return <>{isLogin ? <Home /> : <Login />}</>;
}

export default LoginPage;

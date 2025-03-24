"use client";

import Home from "./Home";
import Login from "./Login";

import { useAuth } from "./AuthContext";

//Pendiente usar redux para manejo global de estado

export default function LoginPage({ children }) {
  const { isLogin } = useAuth();

  return <div>{isLogin ? <Home /> : <Login />}</div>;
}

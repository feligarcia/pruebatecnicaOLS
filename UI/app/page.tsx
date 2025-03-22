"use client";


import { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <Header isLogin={isLogin}/>
      {isLogin ? <Home /> : <Login />}
    </div>
  );
}

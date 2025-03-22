"use client";

import { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import { GlobalProps } from "./types";

//Pendiente usar redux para manejo global de estado

export default function LoginPage({children}) {
  const [isLogin, setIsLogin] = useState<GlobalProps['isLogin']>(true);
  const [role, setRole] = useState<GlobalProps['role']>("administrador");
  return (
    <div>
      <Header isLogin={isLogin} role={role} />
      {children}      
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLogin: boolean;
  rol: string;
  correo: string;
  token: string;
  login: (rol: string, correo: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const tokenlocal = JSON.parse(localStorage.getItem("token") || '');
  const [isLogin, setIsLogin] = useState(false);
  const [rol, setRol] = useState("");
  const [correo, setCorreo] = useState("");
  const [token, setToken] = useState('');

  const login = (rol: string, correo: string, token: string) => {
    setIsLogin(true);
    setRol(rol);
    setCorreo(correo);
    setToken(token);
    JSON.stringify(localStorage.setItem("token", token))
  };

  const logout = () => {
    setIsLogin(false);
    setRol("");
    setCorreo("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, rol, correo, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

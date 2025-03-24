"use client";

import Header from "./Header";

//Pendiente usar redux para manejo global de estado

export default function LoginPage({children} : {children: React.ReactNode }) {
 
  return (
    <div>
      <Header />
      {children}      
    </div>
  );
}

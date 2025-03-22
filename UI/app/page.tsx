"use client";


import Header from "./Header";
import Login from "./Login";

export default function LoginPage() {
  return (
    <div>
      <Header isLogin={true}/>
      <Login />
    </div>
  );
}

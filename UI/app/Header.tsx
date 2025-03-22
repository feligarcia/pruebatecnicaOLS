import Image from "next/image";
import UserCard from "./components/UserCard";
import { GlobalProps } from "./types";
import Link from "next/link";


function Header( {isLogin, role} : GlobalProps) {
  
  return (
    <div className="h-20 bg-white flex flex-row items-center justify-between px-5 shadow-md">
        <Link href='/' className="w-15 flex items-center justify-center my-auto">
          <Image src="/logo.png" alt="logo" height={60} width={45} />
        </Link>
        <div className="text-center text-sm text-stone-700 font-bold">
          Beneficios por renovar
        </div>
        {isLogin && <UserCard />}
      </div>
  )
}

export default Header
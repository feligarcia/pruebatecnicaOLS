import Image from "next/image";
import UserCard from "./components/UserCard";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import SubHeader from "./components/SubHeader";

function Header() {
  const { isLogin } = useAuth();

  return (
    <div className="h-20 bg-white flex flex-row items-center justify-between px-5 shadow-md">
      <Link href="/" className="w-15 flex items-center justify-center my-auto">
        <Image src="/logo.png" alt="logo" height={60} width={45} />
      </Link>
      {isLogin && <SubHeader />}
      <div className="flex flex-row items-center justify-center space-x-4">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon bg-stone-700 text-white rounded-full w-7 h-7 flex items-center justify-center"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
        </svg>
        <div className="text-center text-sm text-stone-700 font-bold">
          Beneficios por renovar
        </div>
      </div>

      {isLogin && <UserCard />}
    </div>
  );
}

export default Header;

import { LogoutIcon } from "./Icons";
import { useAuth } from "../AuthContext";
function UserCard() {
  const { rol, correo, logout } = useAuth();

  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <div className="flex items-center justify-center border-2 border-gray-300 rounded-full h-10 w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-blue-900 text-sm">Bienvenido!</h4>
        <h4 className="text-sm">{correo}</h4>
        <h4 className="text-sm">{rol}</h4>
      </div>
      <div
        className="cursor-pointer hover:text-red-500"
        onClick={() => logout()}
      >
        <LogoutIcon />
      </div>
    </div>
  );
}

export default UserCard;

import { useState } from "react";
function UserCard() {
  const [role, setRole] = useState("Administrador");
  const [name, setName] = useState("John Doe");
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <div className="flex items-center justify-center border-2 border-gray-300 rounded-full h-15 w-15">
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
        <h4 className="font-bold text-blue-900">Bienvenido!</h4>
        <h4>{name}</h4>
        <h4>{role}</h4>
      </div>
    </div>
  );
}

export default UserCard;

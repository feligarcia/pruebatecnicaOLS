export interface rol_usuario {
  role: "administrador" | "auxiliar";
}
export interface GlobalProps {
  isLogin: boolean;
  role: rol_usuario["role"];
}


export interface rol_usuario {
  role: "administrador" | "auxiliar";
}
export interface GlobalProps {
  isLogin: boolean;
  role: rol_usuario["role"];
}

export interface newEmpresa {
  nombre: string;
  municipio: string;
  telefono: string;
  correo: string;
  fecha_registro: string;
  estado: string;
}

export interface EmpresaBD {
  comid?: number;
  nombre: string;
  municipio: string;
  telefono?: string;
  correo?: string;
  fecha_registro: string; 
  estado: "activo" | "inactivo";
  fecha_actualizacion?: string; 
  userid?: number;
}


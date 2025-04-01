export interface rol_usuario {
  role: "administrador" | "auxiliar";
}
export interface GlobalProps {
  isLogin: boolean;
  role: rol_usuario["role"];
}

export interface FormProps {
  id: string;
  children?: never; 
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
  departamento?: string;
  fecha_registro: string; 
  estado: "activo" | "inactivo";
  fecha_actualizacion?: string; 
  userid?: number;
}

export interface getEmpresas {
  comid?: number;
  nombre: string;
  municipio: string;
  telefono?: string;
  correo?: string;
  fecha_registro: string; 
  estado: "activo" | "inactivo";
  fecha_actualizacion?: string; 
  userid?: number;
  establecimientos?: []
}

export interface updateEmpresa {
  comid?: number;
  nombre?: string;
  municipio?: string;
  telefono?: string;
  correo?: string;
  fecha_registro?: string; 
  estado?: "activo" | "inactivo";
  fecha_actualizacion?: string; 
  userid?: number;
  establecimientos?: []
}

export interface Establecimiento {
  comid: string;
  totalIngresos: number;
  totalEmpleados: number;
  totalEstablecimientos: number;
}

export interface LoginProps {
  correo: string;
 contrasena: string;
 terms: boolean;
}
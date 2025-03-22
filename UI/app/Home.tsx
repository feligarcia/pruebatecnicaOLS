import { useState } from "react";
export const TrashIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon-tabler-trash ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
};

export const EditIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
  );
};

const CheckIcon = ({ size = 24, color = "currentColor", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zM15.707 9.293a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>
  );
};
const CloseIcon = ({ size = 24, color = "currentColor", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4" />
    </svg>
  );
};

const DownloadIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4l0 12" />
    </svg>
  );
};

const empresas = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nombre: `Empresa ${i + 1}`,
  telefono: `+57 ${Math.floor(1000000000 + Math.random() * 900000000)}`,
  email: `empresa${i + 1}@example.com`,
  fecha: `2024-06-${String(i + 1).padStart(2, "0")}`,
  establecimientos: i + 2,
  estado: i % 3 === 0 ? "Activo" : "Inactivo",
}));

export default function Home() {
  const [pagina, setPagina] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b border-gray-300">
        <h2 className="text-lg font-bold text-blue-900 p-4">
          Lista Formularios Creados
        </h2>
      </div>
      <div className="px-15">
      <div className="flex flex-row justify-end align-center mb-4">
        <div>
          <button className="mr-2 bg-pink-600 text-white border rounded-md p-1 px-2">
            Crear Formulario Nuevo
          </button>
          <button className="text-pink-600 bg-white border rounded-md p-1 px-2">
            Descargar Reporte en CSV
          </button>
        </div>
      </div>
      <table className="w-full border border-gray-500 border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr className="[&>th]:px-4 [&>th]:py-2 border border-gray-500">
            <th>Razón Social</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Fecha Registro</th>
            <th>No. Establecimientos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.nombre}</td>
              <td>{empresa.telefono}</td>
              <td>{empresa.email}</td>
              <td>{empresa.fecha}</td>
              <td>{empresa.establecimientos}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    empresa.estado === "Activo"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {empresa.estado}
                </span>
              </td>
              <td className="flex gap-2">
                <button>
                  <EditIcon size={16} />
                </button>
                {empresa.estado === "Activo" ? (
                  <button className="text-green-600">
                    <CheckIcon size={16} />
                  </button>
                ) : (
                  <button className="text-red-600">
                    <CloseIcon size={16} />
                  </button>
                )}

                <button className="text-gray-600">
                  <TrashIcon size={16} />
                </button>
                <button className="text-gray-600">
                  <DownloadIcon size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button onClick={() => setPagina((p) => Math.max(p - 1, 1))}>«</button>
        <span className="px-4">Página {pagina}</span>
        <button onClick={() => setPagina((p) => p + 1)}>»</button>
      </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  TrashIcon,
  DownloadIcon,
} from "./components/Icons";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import {
  deleteComerciante,
  getComerciantes,
  updateComerciante,
} from "./api/comerciante";
import { useRouter } from "next/navigation";
import { generateAllCSV } from "./api/csv";
import { getEmpresas, updateEmpresa } from "./types";
import Loader from "./components/Loader";



// Generar empresas mock
// const empresas = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   nombre: `Empresa ${i + 1}`,
//   telefono: `+57 ${Math.floor(1000000000 + Math.random() * 900000000)}`,
//   email: `empresa${i + 1}@example.com`,
//   fecha: `2024-06-${String(i + 1).padStart(2, "0")}`,
//   establecimientos: i + 2,
//   estado: i % 3 === 0 ? "Activo" : "Inactivo",
// }));

function Home() {
  const router = useRouter();
  const { rol, token } = useAuth();
  const [pagina, setPagina] = useState(1);
  const itemsxpage = [5, 10, 15];
  const [itemspagina, setItemsxpage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [indicepagina, setIndicepagina] = useState(0);
  const [empresas, setEmpresas] = useState<getEmpresas[]>([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchComerciantes = async () => {
      setIsLoading(true);
      if (!token) return;
      try {
        const data = await getComerciantes(token);
        setEmpresas(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error trayendo los comerciantes:", error);
      }
    };

    fetchComerciantes();
  }, [token]);

  const handlePageChange = (page: number) => {
    page = Math.max(1, page);
    page = Math.min(page, Math.ceil(empresas.length / itemspagina));
    setPagina(page);
    setIndicepagina((page - 1) * itemspagina);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = async (empresa: updateEmpresa) => {
    try {
      setIsLoading(true);
      await updateComerciante(
        token,
        {
          estado:
            empresa.estado === "activo"
              ? "inactivo"
              : "activo",
        },
        String(empresa.comid!)
      );

      setEmpresas((prevEmpresas) =>
        prevEmpresas.map((e) =>
          e.comid === empresa.comid
            ? {
              ...e,
              estado:
                e.estado === "activo"
                  ? "inactivo"
                  : "activo",
            }
            : e
        )
      );
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      // Para revertir el cambio de estilo
      // setEmpresas((prevEmpresas) =>
      //   prevEmpresas.map((e) =>
      //     e.comid === empresa.comid ? empresa : e
      //   )
      // );   
      router.refresh();
      console.error("Error al actualizar comerciante:", error);
    }
  }
  const handleDeleteComercio = async (empresa: updateEmpresa) => {
    setIsLoading(true);
    try {
      await deleteComerciante(token, String(empresa.comid!));
      setEmpresas((prevEmpresas) =>
        prevEmpresas.filter(
          (e) => e.comid !== empresa.comid
        )
      );
    } catch (error) {
      console.error(
        "Error eliminando la empresa:",
        error
      );
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }
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
            <Link href="/form/new">
              <button className="mr-2 bg-pink-600 text-white border rounded-md p-1 px-2 cursor-pointer">
                Crear Formulario Nuevo
              </button>
            </Link>
            {rol === "administrador" && (
              <button className="text-pink-600 bg-white border rounded-md p-1 px-2 cursor-pointer" onClick={() => generateAllCSV(token)}>
                Descargar Reporte en CSV
              </button>
            )}
          </div>
        </div>
        <table className="w-full border border-gray-500 border-collapse overflow-scroll">
          <thead className="bg-blue-500 text-white">
            <tr className="[&>th]:px-4 [&>th]:py-2 border border-gray-500 [&>th]:border [&>th]:border-gray-500 text-sm">
              <th>Razón Social</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Fecha Registro</th>
              <th>No. Establecimientos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {isloading ? <tbody><tr><td><Loader /></td></tr></tbody> : <tbody>
            {empresas
              .slice(indicepagina, indicepagina + itemspagina)
              .map((empresa) => (
                <tr
                  key={empresa.comid}
                  className="[&>td]:border [&>td]:border-neutral-300 [&>td]:px-4 [&>td]:py-2 odd:bg-white even:bg-zinc-100 text-sm"
                >
                  <td>{empresa.nombre}</td>
                  <td>{empresa.telefono}</td>
                  <td>{empresa.correo}</td>
                  <td>{empresa.fecha_registro}</td>
                  <td>{empresa.establecimientos || ''}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${empresa.estado === "activo"
                        ? "border border-green-700 text-green-700"
                        : "border border-red-700 text-red-700"
                        }`}
                    >
                      {empresa.estado}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-row justify-evenly align-center gap-2">
                      <button
                        className="hover:opacity-80 cursor-pointer"
                        onClick={async () => {
                          router.push(`/form/${empresa.comid}/?edit`);
                        }}
                      >
                        <EditIcon size={16} />
                      </button>
                      {empresa.estado === "activo" ? (
                        <button
                          className="text-red-600 hover:opacity-80 cursor-pointer"
                          onClick={() => handleStatusChange(empresa)}
                        >
                          <CloseIcon size={16} />
                        </button>
                      ) : (
                        <button
                          className="text-green-600 hover:opacity-80 cursor-pointer"
                          onClick={() => handleStatusChange(empresa)}
                        >
                          <CheckIcon size={16} />
                        </button>
                      )}
                      {rol === "administrador" && (
                        <button
                          className="text-gray-600 hover:opacity-80 cursor-pointer"
                          onClick={() => handleDeleteComercio(empresa)}
                        >
                          <TrashIcon size={16} />
                        </button>
                      )}

                      <button className="text-gray-600 hover:opacity-80 cursor-pointer">
                        <DownloadIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>}
        </table>
        <div className="flex flex-row gap-4 pt-4">
          <p>Item:</p>
          {/* ---- */}
          <div className="relative">
            <button
              className="py-1 px-2 rounded border border-gray-400 hover:bg-gray-100 cursor-pointer"
              onClick={toggleDropdown}
            >
              {" "}
              {itemspagina}
            </button>
            {isOpen && (
              <div className="absolute flex flex-col border border-gray-400 rounded ">
                {itemsxpage.map((item) => (
                  <button
                    key={item}
                    className="px-2 border-b border-gray-400 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setItemsxpage(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* ---- */}`
          <div className="flex flex-row border border-gray-400">
            <button
              className="py-1 px-2  border-r border-gray-400 hover:bg-blue-400 hover:text-white hover:font-bold cursor-pointer"
              onClick={() => handlePageChange(pagina - 1)}
            >
              «
            </button>
            {empresas.length > 0 &&
              empresas.map((empresa, index) =>
                index % itemspagina === 0 ? (
                  <button
                    key={index}
                    className="py-1 px-2  border-r border-gray-400 hover:bg-blue-400 hover:text-white hover:font-bold cursor-pointer"
                    onClick={() => handlePageChange(index / itemspagina + 1)}
                  >
                    {index / itemspagina + 1}
                  </button>
                ) : null
              )}
            <button
              className="py-1 px-2  border-r border-gray-400 hover:bg-blue-400 hover:text-white hover:font-bold cursor-pointer"
              onClick={() => handlePageChange(pagina + 1)}
            >
              {" "}
              »{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row align-center justify-center text-white mt-20 h-10 bg-slate-950">
        <p className="m-auto">Prueba Tecnica</p>
      </div>
    </div>
  );
}
export default Home;

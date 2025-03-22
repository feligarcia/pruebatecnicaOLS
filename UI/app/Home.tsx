"use client";
import { useState } from "react";
import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  TrashIcon,
  DownloadIcon,
} from "./components/Icons";
import { GlobalProps } from "./types";
import Link from "next/link";

const empresas = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  nombre: `Empresa ${i + 1}`,
  telefono: `+57 ${Math.floor(1000000000 + Math.random() * 900000000)}`,
  email: `empresa${i + 1}@example.com`,
  fecha: `2024-06-${String(i + 1).padStart(2, "0")}`,
  establecimientos: i + 2,
  estado: i % 3 === 0 ? "Activo" : "Inactivo",
}));

export default function Home({ isLogin, role }: GlobalProps) {
  const [pagina, setPagina] = useState(1);
  const itemsxpage = [5, 10, 15];
  const [itemspagina, setItemsxpage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [indicepagina, setIndicepagina] = useState(0);

  const handlePageChange = (page: number) => {
    page = Math.max(1, page);
    page = Math.min(page, Math.ceil(empresas.length / itemspagina));
    setPagina(page);
    setIndicepagina((page - 1) * itemspagina);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
            <Link href="/form">
            <button className="mr-2 bg-pink-600 text-white border rounded-md p-1 px-2 cursor-pointer" >
              Crear Formulario Nuevo
            </button>
            </Link>
            {role === "administrador" && (
              <button className="text-pink-600 bg-white border rounded-md p-1 px-2 cursor-pointer">
                Descargar Reporte en CSV
              </button>
            )}
          </div>
        </div>
        <table className="w-full border border-gray-500 border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr className="[&>th]:px-4 [&>th]:py-2 border border-gray-500 [&>th]:border [&>th]:border-gray-500">
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
            {empresas
              .slice(indicepagina, indicepagina + itemspagina)
              .map((empresa) => (
                <tr
                  key={empresa.id}
                  className="[&>td]:border [&>td]:border-neutral-300 [&>td]:px-4 [&>td]:py-2 odd:bg-white even:bg-zinc-100"
                >
                  <td>{empresa.nombre}</td>
                  <td>{empresa.telefono}</td>
                  <td>{empresa.email}</td>
                  <td>{empresa.fecha}</td>
                  <td>{empresa.establecimientos}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        empresa.estado === "Activo"
                          ? "border border-green-700 text-green-700"
                          : "border border-red-700 text-red-700"
                      }`}
                    >
                      {empresa.estado}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-row justify-evenly align-center gap-2">
                      <button className="hover:opacity-80 cursor-pointer">
                        <EditIcon size={16} />
                      </button>
                      {empresa.estado === "Activo" ? (
                        <button className="text-red-600 hover:opacity-80 cursor-pointer">
                          <CloseIcon size={16} />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:opacity-80 cursor-pointer">
                          <CheckIcon size={16} />
                        </button>
                      )}
                      {role === "administrador" && (
                        <button className="text-gray-600 hover:opacity-80 cursor-pointer">
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
          </tbody>
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

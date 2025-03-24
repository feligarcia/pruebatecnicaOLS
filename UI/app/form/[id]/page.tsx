"use client";
import { ErrorMessage, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { object, string, date } from "yup";
import { createComerciante, getComerciantebyId } from "../../api/comerciante";
import { useAuth } from "../../AuthContext";
import { useRouter } from "next/navigation";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { token, isLogin } = useAuth();
  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin, router]);
  const { id } = React.use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [empresa, setEmpresa] = useState({});

  useEffect(() => {
    const fetchComerciantesbyID = async () => {
      if (id === "new") return;
      setIsLoading(true);
      if (!token) return;
      try {
        const data = await getComerciantebyId(token, id);
        setEmpresa(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error trayendo el comerciantes", error);
      }
    };

    fetchComerciantesbyID();
  }, [token, id]);
  let initialValues = {};
  if (id === "new") {
    initialValues = {
      nombre: "",
      municipio: "",
      telefono: "",
      correo: "",
      fecha_registro: "",
      estado: "",
    };
  } else {
    initialValues = {
      ...empresa,
    };
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: object({
      nombre: string().required("El nombre es requerido"),
      municipio: string().required("El municipio es requerido"),
      telefono: string().required("El telefono es requerido"),
      correo: string()
        .email("Correo invalido")
        .required("El correo es requerido"),
      fecha_registro: date().required("La fecha de registro es requerida"),
      estado: string().oneOf(["activo", "inactivo"]).required(),
    }),
    enableReinitialize: true,
    onSubmit: async (formData, { resetForm }) => {
      if (id === "new") {
        const formDataWithUTC = {
          ...formData,
          fecha_registro: new Date(formData.fecha_registro).toISOString(), // Convertir a formato UTC
        };
        setIsLoading(true);
        createComerciante(token, formDataWithUTC);
        resetForm();
        setIsLoading(false);
        router.push("/");
      } else {
        setIsLoading(true);
        getComerciantebyId(token, id);
        resetForm();
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex border-b border-gray-300 bg-blue-50">
        <h2 className="text-lg font-bold text-blue-900 p-4 ">Empresa 1</h2>
      </div>
      <div className="bg-blue-200 flex-1">
        <form
          className="flex flex-col shadow-lg bg-white mx-20 rounded-xl border border-gray-400 my-10"
          onSubmit={formik.handleSubmit}
          id="form"
        >
          <div className="flex border-b border-gray-300">
            <h2 className="text-lg font-bold text-blue-900 p-4 ">
              Datos generales {isLoading && "Cargando..."}
            </h2>
          </div>
          <div className="text-center flex flex-row py-10 align-center justify-between">
            <div className="flex flex-col gap-6  border-r border-gray-400  justify-start flex-1/2 px-8">
              <div className="relative w-full">
                <label
                  htmlFor="nombre"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Razón social
                </label>
                <input
                  required
                  id="nombre"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                />
                {formik.touched.nombre && formik.errors.nombre && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.nombre}
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="departamento"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Departamento
                </label>
                <input
                  required
                  id="departamento"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  //   onChange={formik.handleChange}
                  //   onBlur={formik.handleBlur}
                  //   value={formik.values.departamento}
                />
                {/* {formik.touched.nombre && formik.errors.nombre && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.nombre}
                  </div>
                )} */}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="municipio"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Municipio
                </label>
                <input
                  required
                  id="municipio"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.municipio}
                />
                {formik.touched.municipio && formik.errors.municipio && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.municipio}
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="telefono"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                />
                {formik.touched.telefono && formik.errors.telefono && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.telefono}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6  flex-1/2 px-8">
              <div className="relative w-full">
                <label
                  htmlFor="correo"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Correo eléctronico
                </label>
                <input
                  id="correo"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.correo}
                />
                {formik.touched.correo && formik.errors.correo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.correo}
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="fecha_registro"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Fecha de registro
                </label>
                <input
                  required
                  id="fecha_registro"
                  type="datetime"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fecha_registro}
                />
                {formik.touched.fecha_registro &&
                  formik.errors.fecha_registro && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.fecha_registro}
                    </div>
                  )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="estado"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                >
                  Estado
                </label>
                <select
                  id="estado"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.estado}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                {formik.touched.estado && formik.errors.estado && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.estado}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-left">
                <input type="checkbox" id="conestableci" className="w-4 h-4" />
                <label htmlFor="conestableci" className="text-sm text-gray-800">
                  Posee establecimientos?
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-row align-center justify-center px-9 bg-blue-200">
        <div className="flex flex-row flex-1 align-center justify-center text-white h-20 bg-blue-900 rounded-t-xl mt-20 gap-4 space-x-1 px-4">
          <div className="flex flex-col justify-center">
            <p className="text-white text-sm">Total ingresos formulario:</p>
            <p className=" text-blue-300 font-bold">$100.000.000</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white text-sm">Cantidad empleados:</p>
            <p className=" text-blue-300 font-bold">999</p>
          </div>
          <div className="flex flex-row flex-1 border border-gray-600 rounded-md gap-1 justify-center align-center my-4">
            <p className="block text-white text-xs m-auto p-2">
              Si ya ingresaste todos los datos, crea tu formulario aquí:
            </p>
            <button
              className="bg-pink-600 text-white border border-gray-600 rounded-md p-1 px-2 cursor-pointer text-sm flex-1 h-6/10 my-auto mr-3 hover:opacity-90"
              type="submit"
              form="form"
            >
              Enviar Formulario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

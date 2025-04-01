"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { object, string, date } from "yup";
import {
  createComerciante,
  getComerciantebyId,
  updateComerciante,
} from "../../api/comerciante";
import { useAuth } from "../../AuthContext";
import { useRouter } from "next/navigation";
import { EmpresaBD, Establecimiento, FormProps } from "@/app/types";
import { getEstablecimientosAll } from "@/app/api/csv";
import Loader from "@/app/components/Loader";
import { DepartamentosField } from "../../components/Departamentos";
import { MunicipiosField } from "@/app/components/Municipios";



function FormComerciante({ id }: FormProps) {
  const router = useRouter();
  const { token, isLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [send, setSend] = useState(false)
  const [empresa, setEmpresa] = useState<EmpresaBD>({
    nombre: "",
    municipio: "",
    telefono: "",
    correo: "",
    fecha_registro: "",
    estado: "inactivo",
  });
  const [totales, setTotales] = useState<Establecimiento[]>([]);


  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin, router]);


  useEffect(() => {
    const fetchComerciantesbyID = async () => {
      if (id === "new") return;
      setIsLoading(true);
      if (!token) return;
      try {
        const data = await getComerciantebyId(token, id);
        const totales = await getEstablecimientosAll(token);
        setEmpresa(data);
        setTotales(totales);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error trayendo el comerciantes", error);
      }
    };
    fetchComerciantesbyID();
  }, [token, id]);

  const initialValues: EmpresaBD = id === "new" ? {
    nombre: "",
    municipio: "",
    telefono: "",
    correo: "",
    fecha_registro: "",
    estado: "inactivo",
  } : {
    ...empresa,
    fecha_registro: empresa.fecha_registro
      ? new Date(empresa.fecha_registro).toISOString().slice(0, 16)
      : "",
  };

  const validationSchema = object({
    nombre: string().required("El nombre es requerido"),
    municipio: string().required("El municipio es requerido"),
    telefono: string().required("El teléfono es requerido"),
    correo: string().email("Correo inválido").required("El correo es requerido"),
    fecha_registro: date().required("La fecha de registro es requerida"),
    estado: string().oneOf(["activo", "inactivo"]).required(),
  });


  const handleSubmit = async (formData: EmpresaBD, { resetForm }: { resetForm: () => void }) => {
    setSend(true)
    const formDataWithUTC = {
      ...formData,
      fecha_registro: new Date(formData.fecha_registro).toISOString(),
    };

    try {
      if (id === "new") {
        await createComerciante(token!, formDataWithUTC);
      } else {
        await updateComerciante(token!, formDataWithUTC, id);
      }
      resetForm();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setSend(false)
    }
  };



  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex border-b border-gray-300 bg-blue-50">
        <h2 className="text-lg font-bold text-blue-900 p-4 ">{isLoading ? <Loader /> : empresa.nombre || 'Nuevo comerciante'}</h2>
      </div>
      <div className="bg-blue-200 flex-1">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >

          {({ isSubmitting, values, setFieldValue }) =>


          (
            <div className="flex flex-col min-h-screen">

              <div className="bg-blue-200 flex-1">
                <Form
                  className="flex flex-col shadow-lg bg-white mx-20 rounded-xl border border-gray-400 my-10"
                  id="comercianteForm"
                >
                  <div className="flex border-b border-gray-300">
                    <h2 className="text-lg font-bold text-blue-900 p-4 ">
                      Datos generales
                    </h2>
                  </div>

                  <div className="text-center flex flex-col md:flex-row py-10 align-start justify-between">
                    <div className="flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-400 justify-start flex-1 px-8 pb-6 md:pb-0">
                      <div className="relative w-full">
                        <label
                          htmlFor="nombre"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Razón social
                        </label>

                        <Field
                          required
                          id="nombre"
                          name="nombre"
                          type="text"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                        />

                        <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
                      </div>



                      <DepartamentosField name='departamento' label='Departamento' />
                      <MunicipiosField name='municipio' label='Municipio' token={token} />

                      <div className="relative w-full">
                        <label
                          htmlFor="municipio"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Municipio
                        </label>
                        <Field
                          required
                          id="municipio"
                          name="municipio"
                          type="text"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                        />
                        <ErrorMessage name="municipio" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="relative w-full">
                        <label
                          htmlFor="telefono"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Teléfono
                        </label>
                        <Field
                          id="telefono"
                          name="telefono"
                          type="text"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                        />
                        <ErrorMessage name="telefono" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>


                    <div className="flex flex-col gap-6 flex-1 px-8 pt-6 md:pt-0">
                      <div className="relative w-full">
                        <label
                          htmlFor="correo"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Correo eléctronico
                        </label>
                        <Field
                          required
                          id="correo"
                          name="correo"
                          type="email"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                        />
                        <ErrorMessage name="correo" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="relative w-full">
                        <label
                          htmlFor="fecha_registro"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Fecha de registro
                        </label>
                        <Field
                          required
                          id="fecha_registro"
                          name="fecha_registro"
                          type="datetime-local"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                        />
                        <ErrorMessage name="fecha_registro" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="relative w-full">
                        <label
                          htmlFor="estado"
                          className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                        >
                          Estado
                        </label>

                        <Field
                          as="select"
                          id="estado"
                          name="estado"
                          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600 bg-white" // Añadido bg-white para mejor visibilidad
                        >
                          <option value="activo">Activo</option>
                          <option value="inactivo">Inactivo</option>
                        </Field>
                        <ErrorMessage name="estado" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div className="flex items-center gap-2 text-left">
                        {/* Considera manejar este checkbox con Formik también si su valor debe guardarse */}
                        <Field type="checkbox" id="conestableci" name="posee_establecimientos" className="w-4 h-4" />
                        <label htmlFor="conestableci" className="text-sm text-gray-800">
                          Posee establecimientos?
                        </label>
                        {/* Añadir ErrorMessage si es necesario */}
                      </div>
                    </div>
                  </div>

                </Form>
              </div>

            </div>
          )}
        </Formik>


      </div>
      <div className="flex flex-row align-center justify-center px-9 bg-blue-200">
        <div className="flex flex-row flex-1 align-center justify-center text-white h-20 bg-blue-900 rounded-t-xl gap-4 space-x-1 px-4">
          <div className="flex flex-col justify-center">
            <p className="text-white text-sm">Total ingresos formulario:</p>
            <p className=" text-blue-300 font-bold">
              $
              {
                !empresa.comid
                  ? 0
                  : totales.find((est) => String(est.comid) === String(empresa.comid))?.totalIngresos || 0
              }
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white text-sm">Cantidad empleados:</p>
            <p className=" text-blue-300 font-bold">
              {
                !empresa.comid
                  ? 0
                  : totales.find((est) => String(est.comid) === String(empresa.comid))?.totalEmpleados || 0
              }
            </p>
          </div>
          <div className="flex flex-row flex-1 border border-gray-600 rounded-md gap-1 justify-center align-center my-4">
            <p className="block text-white text-xs m-auto p-2">
              Si ya ingresaste todos los datos, crea tu formulario aquí:
            </p>
            <button
              className="bg-pink-600 text-white border border-gray-600 rounded-md p-1 px-2 cursor-pointer text-sm flex-1 h-6/10 my-auto mr-3 hover:opacity-90"
              type="submit"
              form="comercianteForm"
            >
              {send
                ? <Loader color='bg-neutral-50' />
                : id === "new"
                  ? "Crear formulario"
                  : "Actualizar formulario"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormComerciante;

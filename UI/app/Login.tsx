import React from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getLogin } from "./api/usuario";
import { useAuth } from "./AuthContext";
import { LoginProps } from "./types";

function Login() {
  const { login } = useAuth();
  const initialValues = {
    correo: "",
    contrasena: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    correo: Yup.string().email().required("El correo es obligatorio"),
    contrasena: Yup.string().required("La contraseña es obligatoria"),
    terms: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones"
    ),
  });

  const handleSubmit = async (values: LoginProps) => {
    await getLogin(values)
      .then((response) => {
        if (response.access_token) {
          // router.push('/form');
          login(response.rol, response.correo, response.access_token);
        } else {
          console.error("Correo o contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      <div className="relative shadow-lg w-96 text-center">
        <h2 className="text-md font-semibold text-white mb-4">
          Debes iniciar sesión para acceder a la plataforma
        </h2>
        <div className="bg-white rounded-lg shadow-lg text-center flex flex-col">
          <p className="text-sm text-gray-600 mb-4 border-b px-8 py-4">
            Digita tu correo electronico del propietario o representante legal y
            la contraseña
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 p-8">
                <div className="relative w-full">
                  <label
                    htmlFor="correo"
                    className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                  >
                    Correo electrónico
                  </label>
                  <Field
                    id="correo"
                    name="correo"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  />
                  <ErrorMessage
                    name="correo"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="contrasena"
                    className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1"
                  >
                    Contraseña
                  </label>
                  <Field
                    id="contrasena"
                    name="contrasena"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  />
                  <ErrorMessage
                    name="contrasena"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-center gap-2 text-left">
                  <Field
                    type="checkbox"
                    id="terms"
                    name="terms"
                    className="w-4 h-4"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-800">
                    Acepto términos y condiciones
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Cargando..." : "Iniciar sesión"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;

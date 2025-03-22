import React from "react";
import { useState } from "react";
import Image from "next/image";

function Login() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ document, password, acceptedTerms });
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
            Digita tu documento de identidad del propietario o representante
            legal y la contraseña
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 p-8">
            <div className="relative w-full">
              <label
                htmlFor="documento"
                className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
              >
                Documento
              </label>
              <input
                id="documento"
                type="text"
                className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="password"
                className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 text-left">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="w-4 h-4"
              />
              <label htmlFor="terms" className="text-sm text-gray-800">
                Acepto términos y condiciones
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

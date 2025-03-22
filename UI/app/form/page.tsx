function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex border-b border-gray-300 bg-blue-50">
        <h2 className="text-lg font-bold text-blue-900 p-4 ">Empresa 1</h2>
      </div>
      <div className="bg-blue-200 flex-1">
        <form className="flex flex-col shadow-lg bg-white mx-20 rounded-xl border border-gray-400 my-10">
          <div className="flex border-b border-gray-300">
            <h2 className="text-lg font-bold text-blue-900 p-4 ">
              Datos generales
            </h2>
          </div>
          <div className="text-center flex flex-row py-10 align-center justify-between">
            <div className="flex flex-col gap-6  border-r border-gray-400  justify-start flex-1/2 px-8">
              <div className="relative w-full">
                <label
                  htmlFor="razonsocial"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Razón social
                </label>
                <input
                  id="razonsocial"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="departamento"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Departamento
                </label>
                <input
                  id="departamento"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="ciudad"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  Ciudad
                </label>
                <input
                  id="ciudad"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="telefono"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  telefono
                </label>
                <input
                  id="telefono"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6  flex-1/2 px-8">
              <div className="relative w-full">
                <label
                  htmlFor="correo"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  correo
                </label>
                <input
                  id="correo"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="fecharegistro"
                  className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1"
                >
                  fecharegistro
                </label>
                <input
                  id="fecharegistro"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600"
                  // onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-left">
                <input
                  type="checkbox"
                  id="conestableci"
                  // checked={estable}
                  // onChange={() => setAcceptedTerms(!estable)}
                  className="w-4 h-4"
                />
                <label htmlFor="conestableci" className="text-sm text-gray-800">
                  Posee establecimientos?
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;

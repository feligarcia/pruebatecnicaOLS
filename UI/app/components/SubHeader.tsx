import Link from "next/link";

function SubHeader() {
  return (
    <>
      <Link
        href="/"
        className="flex flex-row items-center justify-center space-x-4 border-r border-gray-300 pr-4"
      >
        <p className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center">
          1
        </p>
        <p className="text-sm">Lista Formulario</p>
      </Link>
      <Link
        href="/form/new"
        className="flex flex-row items-center justify-center space-x-4"
      >
        <p className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center">
          2
        </p>
        <p className="text-sm">Crear Formulario</p>
      </Link>
    </>
  );
}

export default SubHeader;

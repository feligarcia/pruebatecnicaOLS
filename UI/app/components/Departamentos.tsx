
import { useField } from 'formik';

const listDepartamentos = [
  "Amazonas",
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada"
]

export const DepartamentosField = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (

    <div className="relative w-full">

      <label htmlFor={props.name} className="absolute -top-3 left-3 text-sm font-medium text-gray-700  bg-white px-1">
        {props.label}
      </label>

      <select id={props.name} {...field} {...props} className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600">
        <option value="">Selecciona un departamento</option>
        {listDepartamentos.map((departamento) => (
          <option key={departamento} value={departamento}>
            {departamento}
          </option>
        ))}
      </select>

      {meta.touched && meta.error ? (
        <div className="error text-red-500 text-sm mt-1">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
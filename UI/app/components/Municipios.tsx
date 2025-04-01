import { useField, useFormikContext } from "formik";
import { getMunicipios } from "../api/municipio";
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";

interface MunicipiosFieldProps {
  label: string;
  name: string;
  token: string;
  [key: string]: any;
}

const municipiosCache = new Map<string, string[]>();

export const MunicipiosField: React.FC<MunicipiosFieldProps> = ({
  label,
  token,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const { values } = useFormikContext<{ departamento: string }>();

  const [municipiosList, setMunicipiosList] = useState<string[]>([]);
  const [isMunicipiosLoading, setIsMunicipiosLoading] = useState(false);

  const prevDepartamento = useRef<string | null>(null);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (!values.departamento || prevDepartamento.current === values.departamento) return;
   
      if (municipiosCache.has(values.departamento)) {
        setMunicipiosList(municipiosCache.get(values.departamento) || []);
        return;
      }

      setIsMunicipiosLoading(true);
      try {
        const data = await getMunicipios(token, values.departamento);
        municipiosCache.set(values.departamento, data);
        setMunicipiosList(data);
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setMunicipiosList([]);
      } finally {
        setIsMunicipiosLoading(false);
      }
    };

    fetchMunicipios();
    prevDepartamento.current = values.departamento;
  }, [values.departamento, token]);

  return (
    <div className="relative w-full">
      <label htmlFor="municipio" className="absolute -top-3 left-3 text-sm font-medium text-gray-700 bg-white px-1">
        {label}
      </label>
      {isMunicipiosLoading ? (
        <Loader />
      ) : (
        <select
          id="municipio"
          {...field}
          {...props}
          disabled={!values.departamento}
          className="w-full px-4 py-2 border border-gray-600 rounded-md text-black focus:ring-2 focus:ring-pink-600 disabled:bg-gray-200"
        >
          <option value="">
            {isMunicipiosLoading ? "Cargando municipios..." : "Selecciona un municipio"}
          </option>
          {!isMunicipiosLoading &&
            !props.disabled &&
            municipiosList.map((municipio, index) => (
              <option key={index} value={municipio}>
                {municipio}
              </option>
            ))}
        </select>
      )}
      {meta.touched && meta.error ? <div className="text-red-500 text-sm mt-1">{meta.error}</div> : null}
    </div>
  );
};

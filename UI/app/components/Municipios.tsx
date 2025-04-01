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
  const { values, setFieldValue } = useFormikContext<{ departamento: string; municipio?: string }>();

  const [municipiosList, setMunicipiosList] = useState<string[]>([]);
  const [isMunicipiosLoading, setIsMunicipiosLoading] = useState(false);
  const prevDepartamento = useRef<string | null>(null);

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (!values.departamento || prevDepartamento.current === values.departamento) return;

      if (municipiosCache.has(values.departamento)) {
        const cachedMunicipios = municipiosCache.get(values.departamento) || [];
        setMunicipiosList(cachedMunicipios);
        
        // Si el municipio actual no está en la lista, lo limpiamos
        if (values.municipio && !cachedMunicipios.includes(values.municipio)) {
          setFieldValue(props.name, "");
        }
        return;
      }

      setIsMunicipiosLoading(true);
      try {
        const data = await getMunicipios(token, values.departamento);
        municipiosCache.set(values.departamento, data);
        setMunicipiosList(data);

        // Si el municipio actual no está en la nueva lista, lo limpiamos
        if (values.municipio && !data.includes(values.municipio)) {
          setFieldValue(props.name, "");
        }
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setMunicipiosList([]);
      } finally {
        setIsMunicipiosLoading(false);
      }
    };

    fetchMunicipios();
    prevDepartamento.current = values.departamento;
  }, [values.departamento, token, values.municipio, setFieldValue, props.name]);

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
          {field.value && !municipiosList.includes(field.value) && (
            <option value={field.value}>{field.value}</option>
          )}
          
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

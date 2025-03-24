const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

export async function generateAllCSV(token: string) {
  const response = await fetch(`${BASEURL}/csv/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al generar o descargar el archivo CSV");
  }
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "comerciantes.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export async function getEstablecimientosAll(token: string) {
  const response = await fetch(`${BASEURL}/csv/establecimientos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los establecimientos");
  }

  return response.json();
}

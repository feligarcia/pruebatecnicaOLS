const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000';

export async function getMunicipios(token: string, departamento: string) {
  const response = await fetch(`${BASEURL}/municipios/${departamento}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  return await response.json();
}
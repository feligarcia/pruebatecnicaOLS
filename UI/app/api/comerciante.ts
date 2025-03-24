const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

export async function getComerciantes(token: string) {
  const response = await fetch(`${BASEURL}/comerciantes/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store"
  });
  return await response.json();
}

export async function updateComerciante(token: string, data: any, id: string) {
    const response = await fetch(`${BASEURL}/comerciantes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }


  export async function createComerciante(token: string, data: any) {
    const response = await fetch(`${BASEURL}/comerciantes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  export async function getComerciantebyId(token: string, id: string) {
    const response = await fetch(`${BASEURL}/comerciantes/${id}`, {    
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store"
    });
    return await response.json();
  }
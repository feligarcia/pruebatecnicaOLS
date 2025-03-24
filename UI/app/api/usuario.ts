import { LoginProps } from "../Login";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000';

export async function getLogin(data: LoginProps) {
  const response = await fetch(`${BASEURL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
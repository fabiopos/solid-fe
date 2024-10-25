// fetch client
export const makeRequest = async (resource: string, config?: RequestInit) => {
  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  const client = await fetch(`http://localhost:3000/${resource}`, {
    ...config,
    headers: defaultHeaders,
  });

  return await client.json();
};

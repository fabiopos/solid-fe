// fetch client
export const makeRequest = async (resource: string, config?: RequestInit) => {
  const baseApi: string =
  process.env.NEXT_PUBLIC_BASE_API ?? "http://localhost:3000";

  const defaultHeaders = new Headers();
  defaultHeaders.append("Content-Type", "application/json");
  const client = await fetch(`${baseApi}/${resource}`, {
    ...config,
    headers: defaultHeaders,
  });

  return await client.json();
};

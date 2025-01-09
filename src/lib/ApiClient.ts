export class ApiClient {
  constructor() {}

  GET = async (resource: string, access_token: string) => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");
    defaultHeaders.append("Authorization", `Bearer ${access_token}`);
    const uri = `http://localhost:3000${resource}`;
    return await fetch(uri, {
      headers: defaultHeaders,
      method: "GET",
    });
  };

  POST = async <T>(
    resource: string,
    body: T,
    access_token?: string
  ): Promise<Response> => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");

    if (access_token)
      defaultHeaders.append("Authorization", `Bearer ${access_token}`);

    const uri = `http://localhost:3000${resource}`;

    return await fetch(uri, {
      headers: defaultHeaders,
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  PATCH = async <T>(
    resource: string,
    body: T,
    access_token?: string
  ): Promise<Response> => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");

    if (access_token)
      defaultHeaders.append("Authorization", `Bearer ${access_token}`);

    const uri = `http://localhost:3000${resource}`;

    return await fetch(uri, {
      headers: defaultHeaders,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  DELETE = (resource: string, access_token?: string) => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");

    if (access_token)
      defaultHeaders.append("Authorization", `Bearer ${access_token}`);

    const uri = `http://localhost:3000${resource}`;

    return fetch(uri, {
      headers: defaultHeaders,
      method: "DELETE",
    });
  };
}

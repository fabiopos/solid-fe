export class ApiClient {
  constructor() {}

  GET = async (resource: string, access_token: string) => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");
    defaultHeaders.append("Authorization", `Bearer ${access_token}`);

    return await fetch(`${process.env.BASE_API}${resource}`, {
      headers: defaultHeaders,
      method: "GET",
    });
  };

  POST = async (
    resource: string,
    body: any,
    access_token?: string
  ) => {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");

    if (access_token)
      defaultHeaders.append("Authorization", `Bearer ${access_token}`);

    const uri = `http://localhost:3000${resource}`;
    console.log(uri);

    return await fetch(uri, {
      headers: defaultHeaders,
      method: "POST",
      body: JSON.stringify(body),
    });
  };
}

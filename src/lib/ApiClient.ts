import { auth } from "@/auth";

export class ApiClient {
  
  constructor() {    
  }

  
  GET = async (resource: string) => {
    const session = await auth();
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");
    defaultHeaders.append("Authorization", `Bearer ${session?.user?.access_token}`);
    
    return await fetch(`${process.env.BASE_API}${resource}`, {
        headers: defaultHeaders,
        method: 'GET'
      })
  };
}

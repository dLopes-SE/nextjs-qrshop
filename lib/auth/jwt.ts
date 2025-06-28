import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  role?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

export function isAdmin(jwt: string | undefined | null): boolean {
  return getUserRole(jwt) === "Administrator";
}

export function getUserRole(jwt: string | undefined | null): string | undefined {
  if (!jwt) {
    return undefined;
  }
  
  try {
    const decoded = jwtDecode<JwtPayload>(jwt);
    return decoded.role;
  } catch {
    return undefined;
  }
}
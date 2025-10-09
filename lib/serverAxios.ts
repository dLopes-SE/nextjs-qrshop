import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7256';

async function serverAxiosRequest<T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.jwt || (session as any)?.accessToken;

  return axios({
    baseURL,
    withCredentials: true,
    ...config,
    headers: {
      ...(config.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

const serverAxios = {
  get: <T = any>(url: string, config: AxiosRequestConfig = {}) =>
    serverAxiosRequest<T>({ ...config, method: "get", url }),
  post: <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) =>
    serverAxiosRequest<T>({ ...config, method: "post", url, data }),
  put: <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) =>
    serverAxiosRequest<T>({ ...config, method: "put", url, data }),
  delete: <T = any>(url: string, config: AxiosRequestConfig = {}) =>
    serverAxiosRequest<T>({ ...config, method: "delete", url }),
};

export default serverAxios;
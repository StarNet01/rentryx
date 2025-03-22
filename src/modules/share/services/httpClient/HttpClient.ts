/* eslint-disable no-unused-vars */
import axois, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export type QueryResponse<T> = AxiosResponse<T>;

export default class HttpClient {
  // eslint-disable-next-line no-use-before-define
  private static instance: HttpClient;
  private baseURL!: string;
  private instance: AxiosInstance;

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL as string;
    this.instance = axois.create({
      withCredentials: true,
      baseURL: this.baseURL,
      // headers: {
      //   Authorization:
      //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RlY2hibGVuZHN0dWRpby5jb20iLCJhdWQiOiJodHRwczovL3RlY2hibGVuZHN0dWRpby5jb20iLCJpYXQiOjE3NDI2Mzc0ODEsImV4cCI6MTc0MjY0MTA4MSwidXNlcl9pZCI6IjEiLCJlbWFpbCI6ImNvbXBhbnlAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkifQ.LgD4oDfCGU4P2EHU5dtC43oUhkYoEzyzvaAi1hbBTCE",
      // },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        if (!response) return error;
        //  return this.HandleHttpError.handleError(response)
      }
    );
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  setToken(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  setBaseUrl(baseUrl: string) {
    this.baseURL = baseUrl;
    this.instance.defaults.baseURL = baseUrl;
  }

  getBaseUrl() {
    return this.instance.defaults.baseURL;
  }

  get<T, R = AxiosResponse<T>>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(endpoint, config);
  }

  post<T, B = any, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(endpoint, data, config);
  }

  put<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(endpoint, data, config);
  }

  patch<T, B = {}, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(endpoint, data, config);
  }

  delete<T, R = AxiosResponse<T>>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(endpoint, config);
  }

  fetcher = async (url: string) => {
    try {
      const response = await this.get<any>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

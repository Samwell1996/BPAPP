import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import RNConfig, { NativeConfig } from 'react-native-config';

const { API_URL }: NativeConfig = RNConfig;

export class Api {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL!,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get<TResponse, TConfig extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    config?: TConfig,
  ): Promise<TResponse> {
    return this.client.get(url, config).then(res => res.data);
  }

  post<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(url: string, data?: TBody, config?: TConfig): Promise<TResponse> {
    return this.client.post(url, data, config).then(res => res.data);
  }

  put<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(url: string, data?: TBody, config?: TConfig): Promise<TResponse> {
    return this.client.put(url, data, config).then(res => res.data);
  }

  patch<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(url: string, data?: TBody, config?: TConfig): Promise<TResponse> {
    return this.client.patch(url, data, config).then(res => res.data);
  }

  delete<TResponse, TConfig extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    config?: TConfig,
  ): Promise<TResponse> {
    return this.client.delete(url, config).then(res => res.data);
  }
}

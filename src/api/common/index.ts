import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.get(url, config);
  }

  post<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(
    url: string,
    data?: TBody,
    config?: TConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.post(url, data, config);
  }

  put<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(
    url: string,
    data?: TBody,
    config?: TConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.put(url, data, config);
  }

  patch<
    TResponse,
    TBody = unknown,
    TConfig extends AxiosRequestConfig = AxiosRequestConfig,
  >(
    url: string,
    data?: TBody,
    config?: TConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.patch(url, data, config);
  }

  delete<TResponse, TConfig extends AxiosRequestConfig = AxiosRequestConfig>(
    url: string,
    config?: TConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.delete(url, config);
  }
}

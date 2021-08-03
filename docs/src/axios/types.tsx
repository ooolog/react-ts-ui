import { AxiosInterceptorManager } from "./AxiosInterceptorManager";


export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'PUT' | 'put' | 'delete' | 'DELETE' | 'options'
    | 'OPTIONS';

export interface AxiosRequestConfig {
    url?: string;
    method?: Methods;
    params?: any;// Record<string, any> //[key:string]: any
    headers?: any;
    data?: Record<string, any>;
    timeout?: number;
}

//Axiios.prototype.request 这个方法
export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>
    }
}

//泛型T代表响应体的类型
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, any>;
    config?: AxiosRequestConfig;
    request?: XMLHttpRequest
}
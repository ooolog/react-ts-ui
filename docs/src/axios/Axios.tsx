
import { AxiosRequestConfig, AxiosResponse } from './types'
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'
import qs from 'qs';
import parseHeader from 'parse-headers'
class Axios<T> {
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>(),
    }
    request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        // return this.dispatchRequest<T>(config)

        const chain: Interceptor<AxiosRequestConfig | AxiosResponse<T>>[] = [
            {
                onFulfilled: this.dispatchRequest,
                onRejected: (error: any) => error
            }
        ]
        // this.interceptors.response.interceptors
    }
    //定义一个派发请求的方法
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(function (resolve, reject) {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params && typeof params == 'object') {
                params = qs.stringify(params)
            }
            if (!data) {
                url += (((url!.indexOf('?') == -1) ? '?' : '&') + params);
            }

            request.open(method!, url!, true);
            request.responseType = 'json';
            //指定一个状态变更函数
            request.onreadystatechange = function () {
                // 0 1 2 3 4 4 表示完成
                if (request.readyState === 4 && request.status != 0) {
                    if (request.status >= 100 && request.status < 300) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeader(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        resolve(response);
                    } else {
                        reject('error require')
                    }
                }
            }
            if (headers) {
                for (let key in headers) {
                    request.setRequestHeader(key, headers[key]);
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(data)
            }

            request.onerror = function () {
                reject('net:: ERR_INTERNET_DISCONNECTED')
            }
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = function () {
                    reject(`net:: timout of ${timeout} ms exceeded`)
                }
            }
            request.send(body);
        })
    }


}

export default Axios;
import { AxiosRequestConfig } from "./types";

interface IOnFulfilled<V>{
    (value: V): V | Promise<V>
}
interface IOnRejected{
    (error: any) : any
}

export interface Interceptor<V> { //某一个拦截器
    onFulfilled: IOnFulfilled<V>; //成功后的回掉
    onRejected?: IOnRejected; //失败后的回调
}

export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: IOnFulfilled<V>, onRejected?: IOnRejected): number;
    eject(id: number): void;
}
class InterceptorManager<V>{
    public interceptors: Array<Interceptor<V> | null> = []
    //每当调用 use的时候可以向拦截器
    use(onFulfilled?: IOnFulfilled<V>, onRejected?: IOnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return this.interceptors.length - 1;
    }
    eject(index:number) {
        if(this.interceptors[index]){
            this.interceptors[index] = null
        }
    }
}
export default InterceptorManager
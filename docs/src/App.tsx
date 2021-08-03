import React, { Component } from 'react'
import './app.scss'
import Home from './home/Home'
import Axios from './axios/index'
import { AxiosRequestConfig, AxiosResponse } from './axios/types';
export default class App extends Component {
    componentDidMount() {
        console.time('const');
        // Axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{
        //     config.headers.name += '1'
        //     console.timeEnd('const');
        //     return config
        // })
        // let requset = Axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig=>{
        //     config.headers.name += '2'
        //     return config
        // })
        // Axios.interceptors.request.use((config:AxiosRequestConfig):AxiosRequestConfig | Promise<AxiosRequestConfig>=>{
        //     // return new Promise(function(reslove){
        //     //     setTimeout(()=>{
        //     //         config.headers.name += '3'
        //     //         return reslove(config)
        //     //     },3000)
        //     // })
        //     return Promise.reject('请求失败了')
        // })
        // Axios.interceptors.request.eject(requset);
        // Axios.interceptors.response.use((response:AxiosResponse)=>{
        //     response.data.name += '1';
        //     return response
        // })
        // Axios.interceptors.response.use((response:AxiosResponse)=>{
        //     response.data.name += '2';
        //     return response
        // })
        // Axios.interceptors.response.use((response:AxiosResponse)=>{
        //     response.data.name += '3';
        //     return response
        // })
        // Axios({
        //     url: 'http://baidu.com',
        //     timeout: 200,
        //     //    method:'get',
        //     //    params:{
        //     //        title:'3',
        //     //        age:33
        //     //    }
        //     method: 'post',
        //     data: {
        //         name:'str',
        //         title: '3',
        //         age: 33
        //     },
        //     headers: {
        //         'content-type': 'application/json',
        //         'content-type111': 'application/json22',
        //     }
        // }).then((response) => {
        //     console.log(response)
        //     return response.data;
        // }).then((data) => {
        //     console.log(data)
        // }).catch((error: any) => {
        //     console.warn(error, 'error')
        // })

    }
    render() {
        return (
            <div className="app-button">
                <Home />
            </div >
        )
    }
}


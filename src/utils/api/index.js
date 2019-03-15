import axios from 'axios'
import SERVER from './config'
axios.defaults.baseURL = SERVER.URL + SERVER.PATH
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求前做什么
    return config
}, function (error) {
    // 请求错误处理
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 响应数据处理
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default axios

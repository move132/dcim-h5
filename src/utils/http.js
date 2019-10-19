import axios from "axios";
import qs from "qs";
// import store from 'store/index';
import { Toast } from "vant";

/* axios.defaults.timeout = 12000; // 请求超时时间
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"; // post请求头的设置
*/
const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 10,
    withCredentials: true,
    crossDomain: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        'Accept': 'application/json'
    }
})

// axios 请求拦截器
http.interceptors.request.use(
    config => {
        // 可在此设置要发送的token
        let token = localStorage.getItem("token"); // store.getters['login/token'];
        token && (config.headers.token = token);
        if (config.params && !config.params.isnoloading) { // 是否显示loading 效果
            Toast.loading({
                className: "http-toast",
                duration: 0, // 持续展示 toast
                forbidClick: true // 禁用背景点击
            });
        }
        return config;
    },
    error => {
        return Promise.error(error);
    }
);
// axios respone拦截器
http.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
        Toast.clear();
        if (response.status === 200 && response.data.code === 200) {
            return Promise.resolve(response);
        } else {
            Toast({
                message: response.data.msg,
                duration: 2000
            });
            return Promise.reject(response);
        }
    },
    error => {
        Toast.clear();
        const responseCode = error.response.status;
        switch (responseCode) {
        // 401：未登录
        case 401:
            break;
            // 404请求不存在
        case 404:
            Toast({
                message: "网络请求不存在",
                duration: 2000
            });
            break;
        default:
            Toast({
                message: "异常，网络错误",
                duration: 2000
            });
        }

        return Promise.reject(error.response);
    }
);
/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        http
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
    // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params) {
    return new Promise((resolve, reject) => {
        http
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
    //  或者return axios.post();
}

export { get, post };

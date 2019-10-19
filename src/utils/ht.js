import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

// var serverPort = server_config.URL + ":" + server_config.PORT;
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20000,
    validateStatus: function(status) {
        return status < 500;
    },
    headers: {
        // 跨域请求 这个配置不能少
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json"
    }
});

function get(url, params = {}) {
    /* return instance.get(url, { params: params }).then(res => {
        return res.data;
    }); */
    return new Promise((resolve, reject) => {
        Toast.loading({
            className: "http-toast",
            duration: 0, // 持续展示 toast
            forbidClick: true // 禁用背景点击
        });
        return instance.get(url, { params: params }).then(res => {
            Toast.clear();
            resolve(res.data);
        }).catch(err => {
            Toast.clear();
            reject(err);
        });
    });
}

function post(url, params = {}) {
    /*  return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(params)).then(res => {
            resolve(res.data);
        });
    }); */
    return new Promise((resolve, reject) => {
        Toast.loading({
            className: "http-toast",
            duration: 0, // 持续展示 toast
            forbidClick: true // 禁用背景点击
        });
        return instance.post(url, qs.stringify(params)).then(res => {
            resolve(res.data);
            Toast.clear();
        }).catch(err => {
            reject(err);
            Toast.clear();
        });
    });
}
export { get, post };

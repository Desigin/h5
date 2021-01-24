import axios from 'axios'
import qs from 'qs'
import storage from './storage'

// 环境的切换
let apiUrl = ``;
switch (process.env.NODE_ENV) {
    case 'development':
        apiUrl = `https://api.wangyaow.com/`
        break;
    case 'production':
        apiUrl = `https://api.wangyaow.com/`
        break;
}

axios.defaults.baseURL = apiUrl;
axios.defaults.timeout = 60000; //请求超时时间
// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const memberid = storage.get('memberId')



// 请求拦截器
axios.interceptors.request.use(function (config) {
    if (!memberid) {
        if (config.method === 'post') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        } else {
            config.headers = {
                'Content-Type': 'application/json',
            }
        }
    } else {
        if (config.data == '') {
            config.data = `memberid=${memberid}`;
        } else {
            config.data = config.data.concat(`&memberid=${memberid}`)
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * upload方法，对应post请求用于上传图片
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function upload(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
import './rem.js'
import storage from './storage.js'
export { default as storage } from "./storage.js"
export { post } from './axios.js'
// export { default as qs } from "qs"

class Base {
    constructor(memberid) {
        // 获取用户id
        if (this.getUrlParam('memberId') != '' && this.getUrlParam('memberId') != null) {
            storage.set("memberId", this.getUrlParam('memberId'));
        }

        if (this.getUrlParam('openId') != '' && this.getUrlParam('openId') != null) {
            storage.set("openId", this.getUrlParam('openId'))
        }

        if (this.getUrlParam('appid') != '' && this.getUrlParam('appid') != null) {
            alert('appid', this.getUrlParam('appid'))
        }
        this.memberid = storage.get('memberId');


        // 获取到路由地址
        let path = window.location.pathname;
        let pathname = path.split(".")[0];
        // if(memberid == null && !memberid || memberid == ''){
        //     return location.href='login.html';
        // }
        // 如果已经登录
        // if (memberid) {
        //     if(pathname === '/login'){
        //         console.warn('请不要重复登录');
        //         return location.href='index.html';
        //     }
        // }else{
        //     location.href='login.html';
        // }
    }
}

    /**
     * 获取url参数
     * @param {*} name 
     */
    Base.prototype.getUrlParam = (name)  =>  {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

    /**
     * 找到目标元素的具有className的祖先元素
     * @param {*} target 
     * @param {*} className 
     */
    Base.prototype.findParentNode = (target,  className)  =>  {
        while (!target.className.contains(className))  {
            if (target == document.body)  {
                throw new Error(`没有找到${className}的祖先元素`)
        }
        target = target.parentNode;
    }
    return target;
}

/**
 * 懒加载
 * @param {*} imgs 
 * @param {*} index 
 */
Base.prototype.lazyLoad = (imgs, index) => {

}

/**
 * 格式化参数
 * @param {*} data 
 */
Base.prototype.formatParams = (data) => {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v" + Math.random()).replace(".", ""));
    return arr.join("&");
}

/**
 * JS对象转formData对象
 * @param {*} data 
 */
Base.prototype.toFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).map(key => {
        formData.append(key, data[key]);
    });
    return formData;
}

/**
 * 防抖处理
 * @param {*} fn 
 * @param {*} wait 
 */
Base.prototype.debounce = (fn, wait) => {
    var timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

/**
 * 验证是否登录
 */
Base.prototype.verify = () => {
    if (this.memberid == null && !this.memberid || this.memberid == '') {
        location.href = "login.html";
    }
}

// 显示骨架屏
Base.prototype.showLoading = () => {

}

//隐藏骨架屏
Base.prototype.hideLoading = () => {

}

export var base = new Base()
class Config {

    constructor() {
        this._host = `http://192.168.1.10:8808/`;
    }
    // 获取默认地址
    get read() {
        return '默认地址：' + this._host;
    }
    // 修改默认地址
    set upload(value) {
        this._host = value;
    }
    // 当前使用的地址
    run() {
        return '当前地址：' + this._host;
    }
}

export {
    Config
};
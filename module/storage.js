// localStorage缓存
var storage = {
    // 储存
    set(key, val) {
        let v = typeof val === 'string' ? val : JSON.stringify(val)
        window.localStorage.setItem(key, v);
    },
    // 读取
    get(key) {
        let v = window.localStorage.getItem(key)
        if (v != "" && v) {
            if (typeof JSON.parse(v) === 'string') {
                return v;
            }
            return JSON.parse(v);
        }
    },
    // 删除
    remove(key) {
        window.localStorage.removeItem(key);
    },
};

export default storage;

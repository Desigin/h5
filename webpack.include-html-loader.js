const fs = require('fs');
const path = require('path');

module.exports = function (content) {
    let fileData = content.replace(/<include\s+src=['"](.*)['"]\s+\/>/gim, function (match, p1) {
        let matchPath = '';
        if (p1.includes('@root')) {
            matchPath = p1.replace(/@root/gi, path.resolve('.'));
        } else {
            matchPath = path.resolve(this.context, p1);
        }
        let matchData = fs.readFileSync(matchPath, { encoding: 'utf8' });
        // let matchDataNew = matchData.replace(/@static/gi, './static');
        // 用模板数据，替换正则匹配的行
        return matchData;
    });
    return fileData;
};

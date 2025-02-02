// readFile.js
const fs = require("fs");
const path = require("path");

class ReadFile {
    static readFileContent(fileName) {
        // __dirnameは、この readFile.js が配置されているディレクトリ
        const filePath = path.join(__dirname, fileName);
        // 同期的にファイルを読み込む
        const data = fs.readFileSync(filePath, "utf8");
        return data;
    }
}

module.exports = ReadFile;

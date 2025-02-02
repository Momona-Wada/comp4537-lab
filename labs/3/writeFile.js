// writeFile.js
const fs = require("fs");
const path = require("path");

class WriteFile {
    static appendToFile(fileName, text) {
        const filePath = path.join(__dirname, fileName);
        // appendFileSync は ファイルが無い場合は新規作成、存在する場合は追記する
        fs.appendFileSync(filePath, text, "utf8");
    }
}

module.exports = WriteFile;

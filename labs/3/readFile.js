// This code was partially reviewed by chatGPT

const fs = require("fs");
const path = require("path");

class ReadFile {
    static readFileContent(fileName) {
        const filePath = path.join(__dirname, fileName);
        const data = fs.readFileSync(filePath, "utf8");
        return data;
    }
}

module.exports = ReadFile;

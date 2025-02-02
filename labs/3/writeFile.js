// This code was partially reviewed by chatGPT

const fs = require("fs");
const path = require("path");

class WriteFile {
    static appendToFile(fileName, text) {
        const filePath = path.join(__dirname, fileName);
        fs.appendFileSync(filePath, text, "utf8");
    }
}

module.exports = WriteFile;

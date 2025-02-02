const url = require("url");
const ReadFile = require("./readFile");
const WriteFile = require("./writeFile");

function handleLab3Request(pathname, query, method, sendResponse) {
    if (method === "GET") {
        if (pathname.startsWith("/labs/3/writeFile")) {
            const textToAppend = query.text;

            if (!textToAppend) {
                sendResponse(400, "Error: 'text' query parameter is required. e.g. ?text=BCIT");
                return;
            }

            try {
                WriteFile.appendToFile("file.txt", textToAppend + "\n");
                sendResponse(200, `Appended "${textToAppend}" to file.txt`);
            } catch (err) {
                console.error(err);
                sendResponse(500, "Server error: could not write to file.");
            }

        } else if (pathname.startsWith("/labs/3/readFile")) {
            const parts = pathname.split("/");
            const filename = parts[parts.length - 1];

            if (!filename || filename === "readFile") {
                sendResponse(400, "Error: filename is required. e.g. /labs/3/readFile/file.txt");
                return;
            }

            try {
                const content = ReadFile.readFileContent(filename);
                sendResponse(200, content);
            } catch (err) {
                if (err.code === "ENOENT") {
                    sendResponse(404, `404 Error: File not found - ${filename}`);
                } else {
                    console.error(err);
                    sendResponse(500, "Server error: could not read file.");
                }
            }

        } else {
            sendResponse(404, "404 Not Found");
        }
    } else {
        sendResponse(405, "Method Not Allowed");
    }
}

module.exports = { handleLab3Request };

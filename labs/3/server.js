// This code was partially reviewed by chatGPT

const url = require("url");
const ReadFile = require("./readFile");
const WriteFile = require("./writeFile");
const { messages } = require("./lang/messages/en/user")

function handleLab3Request(pathname, query, method, sendResponse) {
    if (method === "GET") {
        if (pathname.startsWith("/labs/3/writeFile")) {
            const textToAppend = query.text;

            if (!textToAppend) {
                sendResponse(400, messages.MISSING_QUERY_PARAMETER);
                return;
            }

            try {
                WriteFile.appendToFile("file.txt", textToAppend + "\n");
                sendResponse(200, messages.TEXT_APPEND_SUCCESSFULLY);
            } catch (err) {
                console.error(err);
                sendResponse(500, messages.SERVER_ERROR_WRITE_FILE);
            }

        } else if (pathname.startsWith("/labs/3/readFile")) {
            const parts = pathname.split("/");
            const filename = parts[parts.length - 1];

            if (!filename || filename === "readFile") {
                sendResponse(400, messages.MISSING_FILE_NAME);
                return;
            }

            try {
                const content = ReadFile.readFileContent(filename);
                sendResponse(200, content);
            } catch (err) {
                if (err.code === "ENOENT") {
                    sendResponse(404, messages.FILE_NOT_FOUND);
                } else {
                    console.error(err);
                    sendResponse(500, messages.SERVER_ERROR_READ_FILE);
                }
            }

        } else {
            sendResponse(404, messages.NOT_FOUND);
        }
    } else {
        sendResponse(405, messages.METHOD_NOT_ALLOWED);
    }
}

module.exports = { handleLab3Request };

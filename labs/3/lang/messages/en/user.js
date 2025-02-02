const messages = {
    MISSING_QUERY_PARAMETER: "Error: 'text' query parameter is required. e.g. ?text=BCIT",
    TEXT_APPEND_SUCCESSFULLY: "Appended %textToAppend% to file.txt",
    SERVER_ERROR_WRITE_FILE: "Server error: could not write to file.",
    MISSING_FILE_NAME: "Error: filename is required. e.g. /labs/3/readFile/file.txt",
    FILE_NOT_FOUND: "404 Error: File not found - %filename%",
    SERVER_ERROR_READ_FILE: "Server error: could not read file.",
    NOT_FOUND: "404 Not Found",
    METHOD_NOT_ALLOWED: "Method Not Allowed"
}

module.exports = { messages }
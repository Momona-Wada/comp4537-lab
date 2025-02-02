// comp4537-lab/server.js

const http = require("http");
const url = require("url");

// Lab3 の処理を読み込む (labs/3/server.js)
const { handleLab3Request } = require("./labs/3/server");

// 将来 Lab4 を追加する場合も同様
// const { handleLab4Request } = require("./labs/4/server");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // レスポンス送信用の共通関数
    function sendResponse(statusCode, content, contentType = "text/plain") {
        res.writeHead(statusCode, { "Content-Type": `${contentType}; charset=utf-8` });
        res.end(content);
    }

    // ルーティング
    if (pathname.startsWith("/labs/3/")) {
        handleLab3Request(pathname, query, req.method, sendResponse);

    // 将来的に Lab4 追加
    // } else if (pathname.startsWith("/labs/4/")) {
    //   handleLab4Request(pathname, query, req.method, sendResponse);

    } else if (pathname === "/" || pathname === "/index.html") {
        sendResponse(200, "Welcome to comp4537-lab!<br>Try /labs/3/... or /labs/4/...", "text/html");

    } else {
        sendResponse(404, "404 Not Found (Root)");
    }
});

// サーバー起動
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

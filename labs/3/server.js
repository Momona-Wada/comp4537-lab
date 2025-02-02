const http = require("http");
const url = require("url");
const ReadFile = require("./readFile");
const WriteFile = require("./writeFile");


const server = http.createServer((req, res) => {
  // URL とクエリパラメータのパース
  const parsedUrl = url.parse(req.url, true); // 第2引数 true で query をパース
  const pathname = parsedUrl.pathname;        // /labs/3/writeFile/ など
  const query = parsedUrl.query;             // { text: 'BCIT' } など

  // ヘッダ共通設定用
    function sendResponse(statusCode, content) {
        res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(content);
    }

    // ここでは GET メソッドのみを想定
    if (req.method === "GET") {
        // 1. /labs/3/writeFile/
        if (pathname.startsWith("/labs/3/writeFile")) {
        const textToAppend = query.text; // ?text= から取得

        if (!textToAppend) {
            // text クエリが無い場合
            sendResponse(400, "Error: 'text' query parameter is required. e.g. ?text=BCIT");
            return;
        }

        try {
            // 改行付きで追記
            WriteFile.appendToFile("file.txt", textToAppend + "\n");
            sendResponse(200, `Appended "${textToAppend}" to file.txt`);
        } catch (err) {
            console.error(err);
            sendResponse(500, "Server error: could not write to file.");
        }

        // 2. /labs/3/readFile/file.txt
        } else if (pathname.startsWith("/labs/3/readFile")) {
        // パスの最後の要素(読み込みたいファイル名)を取得
        // 例: /labs/3/readFile/file.txt => ['','labs','3','readFile','file.txt']
        const parts = pathname.split("/");
        // 配列末尾を filename として取得
        const filename = parts[parts.length - 1]; // file.txt

        // "/labs/3/readFile" だけで終わっている場合、filename が "readFile" のまま
        // 実際には "file.txt" が存在するかなどを確認
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
        // 上記以外のパスは 404 とする
        sendResponse(404, "404 Not Found");
        }
    } else {
        // GET 以外は許可しない例
        sendResponse(405, "Method Not Allowed");
    }
});

// ポート番号は環境変数 PORT があれば使用し、無ければ 7000 番ポートを利用
const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

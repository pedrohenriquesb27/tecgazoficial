const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';

    // Remove trailing slash if present
    if (reqUrl.length > 1 && reqUrl.endsWith('/')) {
        reqUrl = reqUrl.slice(0, -1);
    }

    // Direct regional route mapping
    if (reqUrl === '/tecgazmooca') {
        reqUrl = '/tecgazmooca.html';
    } else if (reqUrl === '/tecgazguarulhos') {
        reqUrl = '/tecgazguarulhos.html';
    }

    const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
    let filePath = path.join(BASE_DIR, safePath);

    // Fallback: check if filePath + .html exists for clean URLs
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Arquivo não encontrado');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor TECGAZ rodando em http://localhost:${PORT}`);
    console.log(`Rotas ativas:`);
    console.log(` - Principal: http://localhost:${PORT}/`);
    console.log(` - Mooca:     http://localhost:${PORT}/tecgazmooca`);
    console.log(` - Guarulhos: http://localhost:${PORT}/tecgazguarulhos`);
});

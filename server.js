const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const https = require('https');

const app = express();
const wss = new WebSocket.Server({ noServer: true });
let clients = new Map();
let usedKeys = new Set();

const options = {
  key: fs.readFileSync(path.join(__dirname, 'SSL', 'privatekey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'SSL', 'cert.crt')),
  ca: fs.readFileSync(path.join(__dirname, 'SSL', 'caroot.crt')),
};

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/active', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'active.html'));
});

app.post('/activate', (req, res) => {
  const { key } = req.body;

  if (usedKeys.has(key)) {
    return res.json({ message: 'Key này đã được kích hoạt!' });
  }

  const client = clients.get(key);
  if (client) {
    client.send(JSON.stringify({
      message: 'Mã đã được kích hoạt!',
      action: 'downloadFile',
      key
    }));
    usedKeys.add(key);
    console.log(`Kích hoạt thành công key: ${key}`);
    res.json({ message: 'Kích hoạt thành công!' });
  } else {
    res.json({ message: 'Không tìm thấy client tương ứng!' });
  }
});

app.get('/downloadFile', (req, res) => {
  const { key } = req.query;
  if (!usedKeys.has(key)) {
    return res.status(403).send('Key chưa được kích hoạt');
  }

  const filePath = path.join(__dirname, 'MATLAB2024', 'matlab2024.rar');
  fs.stat(filePath, (err, stats) => {
    if (err) return res.status(500).send('Lỗi kiểm tra file');

    res.setHeader('Content-Type', 'application/rar');
    res.setHeader('Content-Disposition', 'attachment; filename="matlab2024.rar"');
    res.setHeader('Content-Length', stats.size);

    fs.createReadStream(filePath).pipe(res);
  });
});

wss.on('connection', (ws) => {
  let clientKey = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'setKey' && data.key) {
      clientKey = data.key;
      clients.set(clientKey, ws);
      console.log(`WebSocket client set key: ${clientKey}`);
    }
  });

  ws.on('close', () => {
    if (clientKey) {
      clients.delete(clientKey);
      console.log(`WebSocket client disconnected: ${clientKey}`);
    }
  });
});

const server = https.createServer(options, app);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(443, () => {
  console.log('Server đang chạy tại https://toolzalo.io.vn');
});

import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { router } from '../router';

dotenv.config();

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  console.log(file_path);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const WSS_PORT = process.env.WSS_PORT ? +process.env.WSS_PORT : 3000;

const wss = new WebSocketServer({ port: WSS_PORT });

wss.on('listening', (s: unknown) => console.log(`WebSocketServer is running on port: 3000!`, s));

wss.on('close', () => {
  console.log('closed');
});

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    router({ message: msg, ws });
    console.log('received: %s', msg);
  });

  console.log('connected');
});

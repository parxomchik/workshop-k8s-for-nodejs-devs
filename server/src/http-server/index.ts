import { createServer } from 'http';
import { once } from 'events';
import { rest } from './rest';
import { wss } from './wss';

const httpServer = createServer(rest);
wss.listen(httpServer);

export async function listen(): Promise<void> {
  httpServer.listen(3001);
  await once(httpServer, 'listening');
}

export async function close(): Promise<void> {
  for (const [_, socket] of Object.entries(wss.clients().sockets)) {
    socket.disconnect(true);
  }
  httpServer.close();
  await once(httpServer, 'close');
}

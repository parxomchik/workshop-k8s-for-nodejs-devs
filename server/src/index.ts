import './setup';
import * as http from './http-server';

let isShutdownStarted = false;

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShutdownStarted) return;
  isShutdownStarted = true;
  console.log(`Received ${signal}. Shutdown started`);
  await http.close();
  console.log('Server stopped');
}

const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];
for (const signal of signals) {
  process.on(signal, shutdown);
}

(async function bootstrap(): Promise<void> {
  await http.listen();
  console.log('Server started');
})();
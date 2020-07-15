import http from 'http';
import { parse } from 'url';
import express from 'express';
import io from 'socket.io';
import { EventTypes, MessageRequest, Message, User } from './enums';

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));

const httpServer = http.createServer(app);
const server: io.Server = io(httpServer);

const users = new Map<string, User>();

server.on('connection', function (socket: SocketIO.Socket) {
  const { uuid, name } = parse(socket.request.url, true).query;
  if (!uuid || Array.isArray(uuid) || !name || Array.isArray(name)) return socket.disconnect(true);

  const user = { uuid, name: name };
  users.set(user.uuid, user);

  socket.join(user.uuid).broadcast.emit(EventTypes.USER_LOGGED_IN, user);
  server.to(user.uuid).emit(EventTypes.USERS_LIST, Array.from(users.values()));

  socket.on('disconnect', () => {
    server.emit(EventTypes.USER_LOGOUT, user);
    users.delete(user.uuid);
  });

  socket.on(EventTypes.USER_CHANGING_NAME, function (renamedUser: User) {
    user.name = renamedUser.name;
    server.emit(EventTypes.USER_CHANGED_NAME, user);
  });

  socket.on(EventTypes.SEND_MESSAGE, function (messageRequest: MessageRequest) {
    const message: Message = { from: user.uuid, ...messageRequest };
    server.to(messageRequest.to).emit(EventTypes.RECEIVE_MESSAGE, message);
    server.to(user.uuid).emit(EventTypes.RECEIVE_MESSAGE, message);
  });
});

httpServer.listen(3001, () => console.log(`Server started`));

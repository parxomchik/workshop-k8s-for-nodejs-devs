import { parse } from 'url';
import SocketIO from 'socket.io';
import { EventTypes, MessageRequest, Message, User } from '../types';

const users = new Map<string, User>();
export const wss: SocketIO.Server = SocketIO();

wss.on('connection', function (socket: SocketIO.Socket) {
  const { uuid, name } = parse(socket.request.url, true).query;
  if (!uuid || Array.isArray(uuid) || !name || Array.isArray(name)) return socket.disconnect(true);

  const user = { uuid, name };
  users.set(user.uuid, user);

  socket.join(user.uuid).broadcast.emit(EventTypes.USER_LOGGED_IN, user);
  wss.to(user.uuid).emit(EventTypes.USERS_LIST, Array.from(users.values()));

  socket.on('disconnect', () => {
    wss.emit(EventTypes.USER_LOGOUT, user);
    users.delete(user.uuid);
  });

  socket.on(EventTypes.USER_CHANGING_NAME, function (renamedUser: User) {
    user.name = renamedUser.name;
    wss.emit(EventTypes.USER_CHANGED_NAME, user);
  });

  socket.on(EventTypes.SEND_MESSAGE, function (messageRequest: MessageRequest) {
    const message: Message = { from: user.uuid, ...messageRequest };
    wss.to(messageRequest.to).emit(EventTypes.RECEIVE_MESSAGE, message);
    wss.to(user.uuid).emit(EventTypes.RECEIVE_MESSAGE, message);
  });
});

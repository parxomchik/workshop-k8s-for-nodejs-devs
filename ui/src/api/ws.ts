import { EventTypes, MessageRequest, User } from '../misc/types';
import io from 'socket.io-client';
import { saveCurrentUser, loadCurrentUser } from './local-storage';

let socket: SocketIOClient.Socket;

export function getSocket(): SocketIOClient.Socket {
  socket = io({ query: loadCurrentUser(), transports: ['websocket'] });
  return socket;
}

export function changeCurrentUserName(currentUser: User, name: string): User {
  currentUser.name = name;
  saveCurrentUser(currentUser);
  socket.emit(EventTypes.USER_CHANGING_NAME, currentUser);
  return currentUser;
}

export function sendMessageAction(message: MessageRequest) {
  socket.emit(EventTypes.SEND_MESSAGE, message);
}

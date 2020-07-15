import { EventTypes, Message, User } from '../misc/types';
import { notification } from 'antd';

interface UserAction {
  type: EventTypes.USER_LOGGED_IN | EventTypes.USER_LOGOUT | EventTypes.USER_CHANGED_NAME;
  user: User;
}

interface UserListAction {
  type: EventTypes.USERS_LIST;
  users: User[];
}

export function userReducer(state: User[], action: UserAction | UserListAction): User[] {
  switch (action.type) {
    case EventTypes.USER_CHANGED_NAME:
      const renamedUser = state.find((u) => u.uuid === action.user.uuid);
      if (!renamedUser) {
        state.push(action.user);
      } else {
        notification.open({
          message: `User changes name from "${renamedUser.name}" to "${action.user.name}"`,
          duration: 3
        });
        renamedUser.name = action.user.name;
      }
      return [...state];
    case EventTypes.USERS_LIST:
      return action.users;
    case EventTypes.USER_LOGGED_IN:
      const isKnownUser = state.find((u) => u.uuid === action.user.uuid);
      if (!isKnownUser) state.push(action.user);
      notification.open({
        message: `${action.user.name} online`,
        duration: 3
      });
      return [...state];
    case EventTypes.USER_LOGOUT:
      notification.open({
        message: `${action.user.name} offline`,
        duration: 3
      });
      return state.filter((u) => u.uuid !== action.user.uuid);
    default:
      return state;
  }
}

export function messageReducer(messages: Message[], message: Message): Message[] {
  return [...messages, message];
}

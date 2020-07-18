import React, { createContext, FunctionComponent, Reducer, useEffect, useReducer, useState } from 'react';
import { Context, EventTypes, User } from '../misc/types';
import { changeCurrentUserName, getSocket } from './ws';
import { loadCurrentUser } from './local-storage';
import { messageReducer, userReducer } from './reducers';

// @ts-ignore
export const ctx = createContext<Context>();

const Store: FunctionComponent<{}> = (props) => {
  const [me, changeNameAction] = useReducer<Reducer<User, string>>(changeCurrentUserName, loadCurrentUser());
  const [allUsers, userEvent] = useReducer(userReducer, [me]);
  const [allMessages, newMessageReceived] = useReducer(messageReducer, []);
  const [connected, setConnectionStatus] = useState<boolean>(false);
  const [partner, setPartner] = useState<User | undefined>();

  useEffect(() => {
    if (connected) return;
    getSocket()
      .on('connect', () => setConnectionStatus(true))
      .on('disconnect', () => setConnectionStatus(false))
      .on('reconnecting', () => setConnectionStatus(false))
      .on(EventTypes.USER_CHANGED_NAME, (user: User) => userEvent({ type: EventTypes.USER_CHANGED_NAME, user }))
      .on(EventTypes.USER_LOGGED_IN, (user: User) => userEvent({ type: EventTypes.USER_LOGGED_IN, user }))
      .on(EventTypes.USER_LOGOUT, (user: User) => userEvent({ type: EventTypes.USER_LOGOUT, user }))
      .on(EventTypes.USERS_LIST, (users: User[]) => userEvent({ type: EventTypes.USERS_LIST, users }))
      .on(EventTypes.RECEIVE_MESSAGE, newMessageReceived);
  }, [connected]);

  return (
    <ctx.Provider
      value={{
        allMessages,
        allUsers,
        changeNameAction,
        connected,
        me,
        partner,
        setPartner
      }}
    >
      {props.children}
    </ctx.Provider>
  );
};
export default Store;

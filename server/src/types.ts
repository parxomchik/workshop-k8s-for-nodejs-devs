export enum EventTypes {
    RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
    SEND_MESSAGE = 'SEND_MESSAGE',
    USER_CHANGED_NAME = 'USER_CHANGED_NAME',
    USER_CHANGING_NAME = 'USER_CHANGING_NAME',
    USER_LOGGED_IN = 'USER_LOGGED_IN',
    USER_LOGOUT = 'USER_LOGOUT',
    USERS_LIST = 'USERS_LIST'
  }
  
  export interface User {
    uuid: string;
    name: string;
  }
  
  export interface MessageRequest {
    to: string;
    text: string;
  }
  
  export interface Message extends MessageRequest {
    from: string;
  }
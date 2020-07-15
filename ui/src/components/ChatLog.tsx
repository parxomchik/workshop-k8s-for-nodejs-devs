import React, { useContext } from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { stringToColour } from '../misc/helpers';
import { ctx } from '../api/Store';
import { Message, User } from '../misc/types';

const MsgItem = styled.div`
  padding: 5px;
`;

function SingleMessage(prop: { message: Message; sender: User }) {
  const { message, sender } = prop;
  return (
    <MsgItem>
      <Avatar shape="square" size="large" style={{ backgroundColor: stringToColour(message.from), margin: '0 5px' }}>
        {sender.name.slice(0, 8)}
      </Avatar>
      <span>{message.text}</span>
    </MsgItem>
  );
}

function ChatLog() {
  const { allMessages, partner, me } = useContext(ctx);
  const messages = allMessages.filter((m) => m.from === partner?.uuid || m.to === partner?.uuid);
  return (
    <React.Fragment>
      {messages.map((message, i) => (
        <SingleMessage message={message} sender={partner?.uuid === message.from ? partner : me} key={i} />
      ))}
    </React.Fragment>
  );
}

export default ChatLog;

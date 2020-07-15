import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import { ctx } from '../api/Store';
import InputMessage from './InputMessage';
import UsersList from './UsersList';
import ChatLog from './ChatLog';
import Spinner from './Spinner';
import Header from './Header';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const HeaderBox = styled.div`
  height: 64px;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const SideLeft = styled.div`
  border-right: 1px solid grey;
  width: 300px;
`;
const SideRight = styled.div`
  padding: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ChatLogBox = styled.div`
  flex: 1;
`;
const MessageInputBox = styled.div`
  height: 60px;
`;

function Chat() {
  const { connected } = useContext(ctx);

  if (!connected) return <Spinner />;

  return (
    <Box>
      <HeaderBox>
        <Header />
      </HeaderBox>
      <Content>
        <SideLeft>
          <UsersList />
        </SideLeft>
        <SideRight>
          <ChatLogBox>
            <ChatLog />
          </ChatLogBox>
          <Divider dashed />
          <MessageInputBox>
            <InputMessage />
          </MessageInputBox>
        </SideRight>
      </Content>
    </Box>
  );
}

export default Chat;

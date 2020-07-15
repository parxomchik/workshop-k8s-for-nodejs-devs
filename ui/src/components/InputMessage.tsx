import React, { useContext, useState } from 'react';
import { Input } from 'antd';
import { ctx } from '../api/Store';
import { sendMessageAction } from '../api/ws';

function InputMessage() {
  const { partner } = useContext(ctx);
  const [text, setTextValue] = useState('');

  return (
    <Input.Search
      disabled={!partner}
      value={text}
      enterButton="Send"
      onSearch={() => {
        if (!text || !partner) return;
        sendMessageAction({ text, to: partner.uuid });
        setTextValue('');
      }}
      onChange={(e) => setTextValue(e.target.value)}
    />
  );
}

export default InputMessage;

import React, { useContext, useState } from 'react';
import { Button, Input, PageHeader, Popconfirm } from 'antd';
import { ctx } from '../api/Store';

function Header() {
  const { changeNameAction, me, partner } = useContext(ctx);
  const [newName, setNewName] = useState(me.name);

  const newNameInput = <Input.TextArea rows={1} value={newName} onChange={(e) => setNewName(e.target.value)} />;

  return (
    <PageHeader
      title="Users"
      subTitle={partner?.name || 'Choose partner'}
      extra={[
        <Popconfirm icon={null} key="changeName" title={newNameInput} onConfirm={() => changeNameAction(newName)} okText="Change" cancelText="Cancel">
          <Button>Change name</Button>
        </Popconfirm>
      ]}
    />
  );
}

export default Header;

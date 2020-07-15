import React, { useContext } from 'react';
import { Menu } from 'antd';
import { ctx } from '../api/Store';

function UsersList() {
  const { allUsers, partner, setPartner, me } = useContext(ctx);
  const users = allUsers.filter((user) => user.uuid !== me.uuid);
  return (
    <Menu mode="inline" defaultSelectedKeys={[partner?.uuid || '']}>
      {users.map((user) => (
        <Menu.Item onClick={() => setPartner(user)} key={user.uuid}>
          {user.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default UsersList;

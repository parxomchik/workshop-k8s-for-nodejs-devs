import { User } from '../misc/types';
import { getUuidv4 } from '../misc/helpers';

export function loadCurrentUser(): User {
  const randomUUID = getUuidv4();
  const user = {
    uuid: localStorage.getItem('uuid') || randomUUID,
    name: localStorage.getItem('name') || randomUUID.split('-')[0]
  };

  saveCurrentUser(user);

  return user;
}

export function saveCurrentUser(user: User): void {
  localStorage.setItem('uuid', user.uuid);
  localStorage.setItem('name', user.name);
}

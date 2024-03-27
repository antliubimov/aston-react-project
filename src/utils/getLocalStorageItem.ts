import { Users } from '../types/SignTypes/signTypes';

export const getLocalStorageItem = (item: string) => {
  const json = localStorage.getItem(item);
  const db: Users | null = json ? JSON.parse(json) : null;
  return db;
}

import { User } from "../models/User";

export function authUser(login, password) {
  const users = User.getAll();
  const user = users.find(u => u.login === login && u.password === password);
  return user || null;
}
import { TCustomWebSocket, TUser, TRoom } from '../types';

export const users: TUser[] = [];
export const rooms: TRoom[] = [];

const addUser = (name: string, password: string) => {
  const newUser: TUser = {
    name,
    password,
    index: getAvailableUserIndex(),
  };

  users.push(newUser);
  return newUser;
};

const findUserByName = (name: string) => users.find((item) => item.name === name);

const getAvailableUserIndex = () => users.length + 1;

const getAvailableRooms = () => rooms.filter((room) => room.roomUsers.length < 2);

const addRoom = (ws: TCustomWebSocket) => {
  const { userIndex, userName } = ws;
  const availableRooms = getAvailableRooms();

  if (availableRooms.some((item) => item.roomOwner === userIndex)) {
    console.log('user with this index have room');
    return;
  }

  const newRoom: TRoom = {
    roomId: rooms.length + 1,
    roomUsers: [{ name: userName, index: userIndex }],
    roomOwner: userIndex,
    nextTurn: userIndex,
    isClosed: false,
    game: {},
  };

  rooms.push(newRoom);

  return newRoom;
};

export const storage = {
  users,
  rooms,
  addUser,
  findUserByName,
  getAvailableUserIndex,
  addRoom,
  getAvailableRooms,
};

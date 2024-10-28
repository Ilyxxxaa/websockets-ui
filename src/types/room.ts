import { TGame } from './game';
import { TUser } from './user';

export type TRoomUser = Pick<TUser, 'name' | 'index'>;

export type TRoom = {
  roomId: number;
  roomUsers: TRoomUser[];
  roomOwner: number;
  nextTurn: number;
  isClosed: boolean;
  game: TGame;
};

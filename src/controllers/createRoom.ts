import { generateResponseMessage } from '../helpers';
import { storage } from '../storage';
import { TCustomWebSocket } from '../types';

export const createRoom = (ws: TCustomWebSocket) => {
  const room = storage.addRoom(ws);

  if (room) {
    const message = generateResponseMessage({
      type: 'update_room',
      data: storage.getAvailableRooms(),
      index: 0,
    });

    ws.send(message);
  }
};

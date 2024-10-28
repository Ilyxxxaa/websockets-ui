import type { RawData, WebSocket } from 'ws';
import { parseAndValidateWsMessage } from '../helpers';
import { addUser } from '../controllers';
import { storage } from '../storage';
import { TCustomWebSocket } from '../types';
import { createRoom } from '../controllers/createRoom';

type TParams = {
  message: RawData;
  ws: WebSocket;
};

export const router = ({ message, ws }: TParams) => {
  const wsMessage = parseAndValidateWsMessage(message);

  if (wsMessage) {
    const { type, id, data } = wsMessage;

    console.log('ws message exists');

    console.log({ type, data, id });

    if (type === 'reg') {
      const messageData = JSON.parse(data);
      addUser(ws as TCustomWebSocket, messageData);
      console.log('users', storage.users);
    }

    if (type === 'create_room') {
      createRoom(ws as TCustomWebSocket);
    }
  }
};

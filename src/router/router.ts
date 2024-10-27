import type { RawData, WebSocket } from 'ws';
import { parseAndValidateWsMessage } from '../helpers';

type TParams = {
  message: RawData;
  ws: WebSocket;
};

export const router = ({ message, ws }: TParams) => {
  const wsMessage = parseAndValidateWsMessage(message);

  if (wsMessage) {
    const { type, data, id } = wsMessage;

    console.log('ws message exists');

    console.log({ type, data, id });

    if (type === 'reg') {
      ws.send(
        JSON.stringify({
          type: 'reg',
          data: JSON.stringify({
            name: 'Ilya',
            index: 0,
            error: false,
            errorText: '',
          }),
          id: 0,
        }),
      );
    }
  }
};

import type { WebSocket } from 'ws';

export type TCustomWebSocket = WebSocket & {
  id: string;
  userIndex: number;
  userName: string;
};

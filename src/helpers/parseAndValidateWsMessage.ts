import type { RawData } from 'ws';
import { TMessageType, TWsMessage } from '../types/messageTypes';
import { messageObjectKeys } from '../constants';
import { validateWsMessage } from './validateWsMessage';

export const parseAndValidateWsMessage = (message: RawData) => {
  try {
    const messageObject = JSON.parse(message.toString());

    if (validateWsMessage(messageObject)) {
      return messageObject;
    }

    return;
  } catch (e) {
    console.log('parseWsMessage error', e);
  }
};

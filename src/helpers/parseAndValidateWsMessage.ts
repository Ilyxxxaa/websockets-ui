import type { RawData } from 'ws';
import { validateWsMessage } from './validateWsMessage';

export const parseAndValidateWsMessage = (message: RawData) => {
  try {
    const messageObject = JSON.parse(message.toString());

    console.log({ messageObject });

    if (validateWsMessage(messageObject)) {
      console.log('message validated');
      return messageObject;
    }

    return;
  } catch (e) {
    console.log('parseWsMessage error', e);
  }
};

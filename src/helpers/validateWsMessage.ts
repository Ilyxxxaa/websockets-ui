import { messageObjectKeys } from '../constants';
import { TWsMessage } from '../types';

export const validateWsMessage = (obj: any): obj is TWsMessage => {
  if (messageObjectKeys.every((item) => item in obj)) {
    return true;
  }

  return false;
};

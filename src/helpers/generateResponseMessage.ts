import { TMessageType } from '../types';

type TParams = {
  type: TMessageType;
  data: any;
  index: number;
};

export const generateResponseMessage = ({ type, data, index }: TParams) => {
  const message = JSON.stringify({
    type,
    data: JSON.stringify(data),
    index,
  });

  return message;
};

import { storage } from '../storage';
import { generateResponseMessage } from '../helpers';
import { TCustomWebSocket } from '../types';

export const addUser = (ws: TCustomWebSocket, data: any) => {
  console.log('addUser incoming data', data);
  if ('name' in data && 'password' in data) {
    const { name, password } = data;

    const responseData = {
      name: '',
      index: -1,
      error: false,
      errorText: '',
    };

    console.log(storage.users);
    const existedUser = storage.findUserByName(name);

    responseData.name = name;

    if (existedUser) {
      responseData.index = existedUser.index;
      ws.userIndex = existedUser.index;
      ws.userName = name;

      if (existedUser.password !== password) {
        responseData.error = true;
        responseData.errorText = 'Wrong login or password';
      }
    } else {
      const { index } = storage.addUser(name, password);
      responseData.index = index;
    }

    const responseMessage = generateResponseMessage({
      type: 'reg',
      data: responseData,
      index: responseData.index,
    });
    ws.send(responseMessage);
    // console.log('users', storage.users);
  } else {
    console.log('hello world');
  }
};

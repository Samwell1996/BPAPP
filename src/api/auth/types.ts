import { ResponseMessage } from '@api/common/types';

export interface ILogin {
  email: string;
  password: string;
}

export interface ResponseTokens extends ResponseMessage {
  tokens: {
    token: string;
    refreshToken: string;
    tokenLife: number;
    refreshTokenLife: number;
  };
}

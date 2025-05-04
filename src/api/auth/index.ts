import { Api } from '@api/common';

import { ILogin, ResponseTokens } from './types';

class Auth extends Api {
  login(data: ILogin) {
    return this.post<ResponseTokens, ILogin>('api/auth/login', data);
  }
}

export default new Auth();

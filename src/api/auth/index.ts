import axios from 'axios';

import { Api } from '@api/common';

import { ILogin, ResponseTokens } from './types';

const CLOUDFLARE_ACCOUNT_ID = 'cb445d11295a3ad869cdd506ae329b2e';

class Auth extends Api {
  login(data: ILogin) {
    return this.post<ResponseTokens, ILogin>('api/auth/login', data);
  }

  async speechRecognition(audioUrl: string | undefined) {
    if (!audioUrl) {
      return;
    }

    const audioResponse = await axios.get<ArrayBuffer>(audioUrl, {
      responseType: 'arraybuffer',
    });

    return this.post<any, any>(
      `${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/openai/whisper`,
      audioResponse.data,
      {
        headers: {
          'Content-Type': 'audio/mp4',
        },
      },
    );
  }
}

export default new Auth();

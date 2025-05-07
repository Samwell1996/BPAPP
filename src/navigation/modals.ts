import { register } from 'react-native-bundle-splitter';

import { MODAL_NAMES } from '@constants/navigation';

export const MODALS = {
  [MODAL_NAMES.FORGOT_PASSWORD]: register({
    name: MODAL_NAMES.FORGOT_PASSWORD,
    loader: () => import('@modals/ForgotPassword'),
  }),
};

import { register } from 'react-native-bundle-splitter';

import { MODAL_NAMES } from '@constants/navigation';

const Modals = {
  [MODAL_NAMES.FORGOT_PASSWORD]: {
    screen: register({
      name: MODAL_NAMES.FORGOT_PASSWORD,
      loader: () => import('@modals/ForgotPassword'),
    }),
  },
};

export default Modals;

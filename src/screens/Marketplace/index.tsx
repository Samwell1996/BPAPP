import { useEffect } from 'react';

import { View } from 'react-native';

import { MODAL_NAMES } from '@constants/navigation';
import { useNavigation } from '@hooks/navigation';

const Marketplace = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    navigate(MODAL_NAMES.FORGOT_PASSWORD);
  }, []);

  return <View style={{ backgroundColor: 'blue', flex: 1 }} />;
};

export default Marketplace;

import { useEffect } from 'react';

import { View } from 'react-native';

import { SCREEN_NAMES } from '@constants/navigation';
import { useNavigation } from '@hooks/navigation';

const Marketplace = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    navigate(SCREEN_NAMES.EXPLORE);
  }, []);

  return <View style={{ backgroundColor: 'blue', flex: 1 }} />;
};

export default Marketplace;

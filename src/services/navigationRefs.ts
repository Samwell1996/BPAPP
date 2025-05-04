/*** @description: for internal purpose, do not use it directly in components/screens etc. */
import { NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '@navigation/types';

type NavigateType = NavigationProp<RootStackParamList>['navigate'];

const refs = { navigator: null, navigate: null as NavigateType | null };

export default refs;

import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

import { useStyles } from './styles';

interface LoginProps {
  onLogin: () => void;
  isLoading: boolean;
}

const Login = ({ onLogin, isLoading }: LoginProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textButton}>Login Button</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;

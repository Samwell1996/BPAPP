import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

import { useStyles } from './styles';

interface ProfileProps {
  onLogout: () => void;
  isLoading: boolean;
}

const Profile = ({ onLogout, isLoading }: ProfileProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textButton}>Logout Button</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

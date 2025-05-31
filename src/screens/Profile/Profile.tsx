import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

import { useStyles } from './styles';

interface ProfileProps {
  onLogout: () => void;
  addUsers: () => void;
  isLoading: boolean;
}

const Profile = ({ onLogout, addUsers, isLoading }: ProfileProps) => {
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

      <TouchableOpacity style={styles.button} onPress={addUsers}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textButton}>Add Users Button</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

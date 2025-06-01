import { Text, View } from 'react-native';

import { PostModel } from '@stores/Posts/model';

import { useStyles } from './styles';

interface PostProps {
  post: PostModel | undefined;
}

const Post = ({ post }: PostProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>id: {post?.id}</Text>
      <Text style={styles.title}>Title: {post?.title}</Text>
      <Text style={styles.title}>Body: {post?.body}</Text>
      <Text style={styles.title}>UserId: {post?.userId}</Text>
    </View>
  );
};

export default Post;

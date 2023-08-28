// react-native module needs to run on native react environment locally installed after ejecting from expo, works great
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import {Text, View} from 'react-native';

const storage = new MMKVLoader().initialize();
const App = () => {
  const [user, setUser] = useMMKVStorage('user', storage, 'robert');
  const [age, setAge] = useMMKVStorage('age', storage, 24);

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        I am {user} and I am {age} years old.
      </Text>
    </View>
  );
};

export default App;
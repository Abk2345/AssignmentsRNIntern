import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import {View, Text, StyleSheet, Button} from 'react-native';

const storage = new MMKVLoader().initialize();
const App = () => {
  const [user, setUser] = useMMKVStorage('user', storage, 'robert');
  const [age, setAge] = useMMKVStorage('age', storage, 24);

  const changeContent = ()=>{
    setUser('Abhishant');
    setAge(22);
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        I am {user} and I am {age} years old.
      </Text>
      <Button title= "change content" onPress={changeContent}></Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  header:{

  },
  headerText: {

  }
})
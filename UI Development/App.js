import  React, {useState, useEffect} from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Video from 'react-native-video';
import video from './sample.mp4';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Home Screen</Text>
    </View>
  );
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    navigation.navigate('Home'); // Navigate to the Home screen
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        placeholder='Your email !'
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        placeholder='Your password!'
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log in" mode="contained" onPress={handleLogin} style={styles.button}>
      </Button>
    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      {/* Add profile content here */}
    </View>
  );
};

const SplashScreen = ({ navigation }) => {


  useEffect(() => {
    var fontsLoaded = true;
    if (fontsLoaded) {
      // Simulate a delay or any other loading logic
      setTimeout(() => {
        navigation.navigate('Login'); // Navigate to the Login screen
      }, 2000);
    }
  }, [ navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My App</Text>
      <Text style={{textAlign: 'center'}}>After 2 sec, it will take you to Login Screen!</Text>
    </View>
  );
};

const VideoPlayerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Video Player</Text>
      <Video  
            source={video}                  // the video file
            paused={false}                  // make it start    
            style={styles.backgroundVideo}  // any style you want
            repeat={true}                   // make it a loop
        />
      
    </View>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Profile" component = {ProfileScreen} />
        <Drawer.Screen name="Splash" component={SplashScreen}/>
        <Drawer.Screen name="VideoPlayer" component={VideoPlayerScreen} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backgroundVideo: {
    height: 400,
    width: '90%',
  },
  input: {
    marginBottom: 15,
    borderColor: '#333',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    color: '#000'
  },
  button: {
    marginTop: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
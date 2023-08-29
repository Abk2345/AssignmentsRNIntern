// creating a video player app accessing device videos and playing on another screen 
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Video } from 'expo-av';
const Stack = createStackNavigator();
import { TouchableOpacity, Image, StyleSheet, Text, View, Button, Modal, FlatList, } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="VideoList"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#333', // Change to your desired header background color
                    },
                    headerTintColor: '#fff', // Change to your desired header text color
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    cardStyle: {
                        backgroundColor: '#f5f5f5', // Change to your desired screen background color
                    },
                }}
            >
                <Stack.Screen name="VideoList" component={VideoListScreen} />
                <Stack.Screen name="VideoModal" component={VideoModalScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


//Listing all videos with name and duration
const VideoListItem = ({ video, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(video)}>
            <View>
                <Image
                    source={{ uri: video.uri }}
                    style={{ width: '100%', height: 200 }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{video.filename}</Text>
                    <Text>Duration: {video.duration} seconds</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// screen on which the video plays
const VideoModalScreen = ({ route, navigation }) => {
    const { video } = route.params;
    console.log("video details, ", video.uri);

    return (
        <View visible={true} animationType="slide">
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Video

                    source={{ uri: video.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode='cover'
                    shouldPlay={true}
                    isLooping
                    style={{ marginBottom: 10, alignSelf: 'center', width: '100%', height: '93%' }}
                />
                <Button title="Close" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

// getting all videos from the app filtering by duration less than 5 minutes
const VideoListScreen = ({ navigation }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            const media = await MediaLibrary.getAssetsAsync({ mediaType: 'video' });
            const filteredVideos = media.assets.filter(asset => asset.duration < 300 && asset.duration > 0);
            setVideos(filteredVideos);
        }
    };

    const handleVideoPress = video => {
        navigation.navigate('VideoModal', { video });
    };

    return (
        <FlatList
            data={videos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <VideoListItem video={item} onPress={handleVideoPress} />
            )}
        />
    );
};


// creating a video player for playing online videos in the app, shows a list and then on press, plays the given video
// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { Video } from 'expo-av';

// const videoData = [
//   {
//     id: '1',
//     title: 'Video 1',
//     uri: 'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
//     thumbnail: 'http://www.sample-videos.com/img/Sample-jpg-image-500kb.jpg',
//   },
//   {
//     id: '2',
//     title: 'Video 2',
//     uri: 'http://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
//     thumbnail: 'http://www.sample-videos.com/img/Sample-jpg-image-500kb.jpg',
//   },
// ];

// export default function App() {
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   const handleVideoSelect = (video) => {
//     setSelectedVideo(video);
//   };

//   const renderVideoItem = ({ item }) => (
//     <TouchableOpacity onPress={() => handleVideoSelect(item)}>
//       <View style={styles.videoItem && {flexDirection: 'column'}}>
//         <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
//         <Text style={styles.videoTitle}>{item.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Video Playlist</Text>
//       <FlatList
//         data={videoData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderVideoItem}
//       />

//       {selectedVideo && (
//         <View style={styles.videoContainer}>
//           <Video
//             source={{ uri: selectedVideo.uri }}
//             rate={1.0}
//             volume={1.0}
//             isMuted={false}
//             resizeMode="contain"
//             shouldPlay
//             useNativeControls
//             style={styles.videoPlayer}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   heading: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   videoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   thumbnail: {
//     width: '90%',
//     height: 200,
//   },
//   videoTitle: {
//     fontSize: 16,
//   },
//   videoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   videoPlayer: {
//     width: '100%',
//     height: 300,
//   },
// });

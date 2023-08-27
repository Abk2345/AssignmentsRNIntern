// Gallery app which uses expo-media-library, expo-image-picker, expo-file-system to retrieve imagess from the device as well as download image from internet and upload image to the app and also make changes to the files in the app like (deleting of them)

// snapshots attached in the folder: gallery_app


import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, Image, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [media, setMedia] = React.useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  React.useEffect(() => {
    getMediaAsync();
  }, []);

  //accessing device media
  const getMediaAsync = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const mediaAssets = await MediaLibrary.getAssetsAsync();
      setMedia(mediaAssets.assets);
    }
  };

  // to show photo in full screen
  const PhotoModal = ({ visible, onClose, photoUri }) => {
    return (
      <Modal visible={visible} transparent={true} onRequestClose={onClose}>
        <StatusBar backgroundColor='#333' style='light-content' />
        <View style={styles.modalContainer}>
          <Image source={{ uri: photoUri }} style={styles.modalImage} />
          <Button title='Close' onPress={onClose} />
        </View>
      </Modal>
    )
  }

  // for header for the app
  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Gallery App</Text>
      </View>
    )
  }

  // for downloading of file within the device
  const downloadFile = async () => {
    const imageurl = 'https://i.imgur.com/I86rTVl.jpeg';
    try {
      const response = await FileSystem.downloadAsync(imageurl, FileSystem.cacheDirectory + 'sample-image.jpeg');
      if (response.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(response.uri);
        setMedia([...media, asset]);
        Alert.alert('Image downloaded', 'Image has been downloaded and added to the gallery.');
      } else {
        Alert.alert('Error', 'Failed to download image.');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  //deleting photo from the app
  const deleteMedia = async (mediaItem) => {
    try {
      await MediaLibrary.deleteAssetsAsync([mediaItem]);
      setMedia(media.filter((item) => item.id !== mediaItem.id));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  //uploading image to the app
  const handleUpload = async () => {
    const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!imagePickerResult.cancelled) {
      const { uri } = imagePickerResult;
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.size <= 1000000) { // 1MB
        const asset = await MediaLibrary.createAssetAsync(uri);
        setMedia([...media, asset]);
      } else {
        Alert.alert('File size is too large', 'Please choose an image smaller than 1MB.');
      }
    }
  };

  //rendering items in flatlist
  const renderMediaItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10, width: "100%", alignItems: 'center', justifyContent: 'space-between' }}>
      <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
      <Button title="Delete" onPress={() => deleteMedia(item)} />
      <Button title="View Full Screen" onPress={() => setSelectedPhoto(item.uri)} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='#333' style='light-content' />
      <Header />
      <FlatList
        data={media}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id}
      />
      <PhotoModal
        visible={selectedPhoto !== null}
        onClose={() => setSelectedPhoto(null)}
        photoUri={selectedPhoto}
      />
      <Button title="Upload File" onPress={handleUpload} />
      <Button title="Download File from Internet" onPress={downloadFile} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: (windowWidth - 30) / 3, // Divide by 3 for 3 photos in a row
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  modalImage: {
    width: '80%',
    height: '70%',
  },
  header: {
    marginTop: 33, //height of status bar
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  }
});

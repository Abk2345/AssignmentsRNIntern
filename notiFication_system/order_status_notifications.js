import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import notifee from '@notifee/react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Notifications"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#333',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Food Delivery App!</Text>
      <Button title="Simulate Order Updates" onPress={() => simulateOrderStatusUpdates(navigation)} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);

  const navigateToOrderScreen = () => {
    navigation.navigate('Order');
  };

  useEffect( async() => {
    const orders = [
      { title: 'Order Status Update', body: 'Your order #123 is out for delivery!' },
      { title: 'Order Status Update', body: 'Your order #124 is confirmed!' },
      { title: 'Order Status Update', body: 'Your order #125 is on its way!' },
      { title: 'Order Status Update', body: 'Your order #126 has been delivered!' },
      { title: 'Order Status Update', body: 'Your order #127 is out for delivery!' },
    ];
  
    for (const order of orders) {
      // Simulate a notification by adding it to the notifications array
      setNotifications((prevNotifications) => [...prevNotifications, order]);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={navigateToOrderScreen}>
            <View style={{ padding: 10 }}>
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function OrderScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order Details</Text>
      <Text>Order #123</Text>
      <Text>Status: Out for Delivery</Text>
    </View>
  );
}


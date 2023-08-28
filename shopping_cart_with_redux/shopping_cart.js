import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { addItemToCart, removeItemFromCart } from './store/actions/cartActions.js';

const App = () => {
  const cartItems = store.getState().cart.items;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <Text style={styles.header}>Shopping Cart</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Text>{item.name}</Text>
              <Button title="Remove" onPress={() => store.dispatch(removeItemFromCart(item))} />
            </View>
          ))}
          <Button title="Add Item" onPress={() => store.dispatch(addItemToCart({ id: Date.now(), name: 'Product' }))} />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});

export default App;

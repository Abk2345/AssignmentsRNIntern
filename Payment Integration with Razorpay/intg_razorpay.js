

import RazorpayCheckout from 'react-native-razorpay';

import React from 'react';
import { TouchableHighlight, View, Text, Button } from 'react-native';



const App = ()=>{
// key details got from razorpay dashboard for the purpose od testing the app integration
const KEY_ID = "rzp_test_cTBEzR9eskjkMU";
const KEY_SECRET = "vvxT1crhIrvqZEgbpTWrGsJk";
  const payWithRazorpay = ()=>{
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_cTBEzR9eskjkMU',
      amount: '5000', 
      name: 'Acme Corp',
      order_id: 'order_DslnoIgkIDL8Zt',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handling success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handling failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }
  return(
    <View>
      <Button title="Pay 5000" onPress={payWithRazorpay}></Button>
    </View>
  )
}

export default App;

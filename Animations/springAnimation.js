// Finally, import withSpring function and wrap around width.value + 50 in the handlePress function so that the value which withSpring returns modifies the shared value. This will create a bouncy spring animation that transitions the width of the element from its current value (here width.value) to the new one (here width.value + 50).

import { Button, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function App() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title="Expand 50px wide with spring Animation!" />
    </View>
  );
}
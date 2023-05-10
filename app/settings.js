import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';

const SlideCard = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showCard, setShowCard] = useState(false);


  const handleButtonClick = () => {
    setShowCard(true);

    // Slide out animation after a delay
    const slideOutTimer = setTimeout(() => {
      setShowCard(false);
    }, 2000); // Adjust the delay (in milliseconds) as needed

    // Clean up the timer on unmount or when button is clicked again
    return () => clearTimeout(slideOutTimer);
  };

  useEffect(() => {
    // Slide in or slide out animation
    Animated.timing(slideAnim, {
      toValue: showCard ? 1 : 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [showCard]);

  return (
    <View>
      <TouchableOpacity onPress={handleButtonClick}>
        <Text>Show Card</Text>
      </TouchableOpacity>
      {showCard && (
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1], // Adjust the values based on your desired slide distance
                }),
              },
            ],
            opacity: slideAnim,
            backgroundColor:'#222'}}
        >
          <View>
            {/* Your card content */}
            <Text style={{color:'#fff'}}>Slide Card Content</Text>
          </View>
        </Animated.View>
      )}
      <StatusBar hidden={true}/>
    </View>
  );
};

export default SlideCard;

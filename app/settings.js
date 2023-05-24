import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';


const SlideCard = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showCard, setShowCard] = useState(false);
  const router = useRouter()

  const handleButtonClick = () => {
    setShowCard(showCard ? false : true);
  };

  useEffect(() => {
    // Slide in or slide out animation
    if(showCard){
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();} else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }).start();
    }
  }, [showCard]);

  return (
    <View>
      <Pressable hitSlop={5} onPress={()=>{router.push('/home')}}><Text>Go back</Text></Pressable>
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
                  outputRange: [100, 0], // Adjust the values based on your desired slide distance
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

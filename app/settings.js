import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, SafeAreaView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';


const App = () => {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value * 255 }],
        };
    });
    
    return (
        <SafeAreaView>
            <View style={{height: "100%",backgroundColor: "#000"}}>
                <Button onPress={() => (offset.value = withSpring(-1))} title="Move" />                
            </View>
            <Animated.View style={[{backgroundColor:"#1e2f55",borderRadius:10,height:50,width:50,zIndex:1}, animatedStyles]} />
        </SafeAreaView>
    )
}
export default App;
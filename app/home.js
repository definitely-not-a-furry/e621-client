import { useEffect } from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';

function App() {
    let sessionmascot = JSON.parse('{"url_path":"/../../assets/gradient.png"}')

    useEffect(()=>{
    });
    return(
        <SafeAreaView>
            <ImageBackground style={styles.background} defaultSource={require("../assets/gradient.png")} src={"https://static1.e621.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg"}>
                <BlurView intensity={100}>
                <View style={styles.mascotbox}>
                    <Text style={{color:'#fff',textAlign:'center', fontSize: 20}}>home</Text>
                    <Link href={{pathname:"/browse",params:{searchterm:'order:score'}}}>Browse</Link>
                </View>
                </BlurView>
            </ImageBackground>
            <StatusBar hidden={true}></StatusBar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    background: {
        height: "100%",
    },
    mascotbox:{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        alignSelf: 'center',

    }
    
});

export default App;
import { useEffect } from 'react';
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { Link, useRouter } from 'expo-router';

function App() {
    let sessionmascot = JSON.parse('{"url_path":"/../../assets/gradient.png"}')
    const router = useRouter()
    useEffect(()=>{
    });
    return(
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={true}></StatusBar>
            <ImageBackground style={styles.backgroundImage} src={"https://static1.e621.net/data/mascots/913a8fd0240b14bfbb63d6a9cfc3faf2.jpg"}>
                <View style={{flex:2}}>
                    {/* empty view for lower menu*/}
                </View>
                <View style={[styles.blurContainer,{flex:1}]}>
                    <BlurView style={styles.blur} intensity={25}>
                        <View style={styles.mascotbox}>
                            <Text style={{color:'#fff',textAlign:'center', fontSize: 20}}>Home</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={()=>{router.push('/browse')}}><Text style={styles.buttonText}>Browse</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={()=>{router.push('/settings')}}><Text style={styles.buttonText}>Settings</Text></TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    backgroundImage:{
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    blur:{
        borderRadius: 5,
        padding: 5,
        alignSelf: 'stretch',

    },
    blurContainer: {
        overflow: 'hidden',
        borderRadius: 5,
        marginHorizontal: 30,
    },
    mascotbox:{
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: 'rgba(10,10,10,0.5)',
        padding: 7,
        margin: 5,
        borderRadius: 5,

    },
    buttonText: {
        color: '#fff',
        paddingHorizontal: 10,
    },
    
});

export default App;
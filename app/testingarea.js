import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import DText from '../components/DText';
import { defaultDark } from '../themes/default';

const App = () => {

    
    return (
        <SafeAreaView>
            <TouchableOpacity style={defaultDark.button} onPress={()=>{useRouter().push('/home')}}><Text>Back</Text></TouchableOpacity>
            <View style={{height: "100%",backgroundColor: "#000"}}>
                <Text style={defaultDark.containerText}>
                    <DText text={'[quote]test quote[/]\ntest comment'}/>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default App;
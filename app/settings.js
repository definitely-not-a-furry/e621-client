import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';



const App = () => {

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={()=>{useRouter().push('/home')}}><Text>back</Text></TouchableOpacity>
            <View style={{height: "100%",backgroundColor: "#000"}}>
            <Menu>
                <MenuTrigger text='Select action' />
                    <MenuOptions>
                        <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                        <MenuOption onSelect={() => alert(`Delete`)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                </MenuOptions>
            </Menu>
                <Text>{'\n\n\n'}</Text>
                <TouchableOpacity onPress={()=>{console.log(value)}}><Text>log</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default App;
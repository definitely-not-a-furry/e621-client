import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback, StyleSheet  } from 'react-native'
import { useRouter } from 'expo-router'
import { defaultDark } from '../themes/default'
import { StatusBar } from 'expo-status-bar'

const SimpleDropdown = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };
    
    const handleItemPress = () => {
        // Handle item press logic here
        // For simplicity, you can just close the dropdown for now
        setIsDropdownVisible(false)
    }
    
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown}>
        <Text>Show Dropdown</Text>
        </TouchableOpacity>
        
        <Modal
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setIsDropdownVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
        <View style={styles.modalOverlay}>
        <View style={styles.dropdown}>
        <TouchableOpacity onPress={handleItemPress}>
        <Text>Dropdown Item 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleItemPress}>
        <Text>Dropdown Item 2</Text>
        </TouchableOpacity>
        {/* Add more items as needed */}
        </View>
        </View>
        </TouchableWithoutFeedback>
        </Modal>
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        dropdown: {
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ccc',
        },
    });
    
    
    
const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{ backgroundColor: '#222', flex: 1 }}>
            <StatusBar hidden={true}/>
            <TouchableOpacity style={[defaultDark.button, { margin: 7, padding: 5 }]} onPress={() => { router.push('/home') }}><Text style={{ color: '#fff' }}>Back</Text></TouchableOpacity>
            {/* everything from here is a testing area */}
            <SimpleDropdown/>
        </SafeAreaView>
    )
}

export default App

import React from "react";
import { View, Text } from "react-native";

export const enum Theme {
    defaultDark = 'defaultDark',
    classic = 'classic',
}

export const ThemeContext = React.createContext({theme: Theme.defaultDark});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(Theme.defaultDark);
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const exampleThemedWidget = () => {
    return (
        <ThemeContext.Consumer>
            {( theme ) => {
                return (
                    <View style={theme.container}>
                        <Text style={theme.text}>Hello World!</Text>
                    </View>
                );
            }}
        </ThemeContext.Consumer>
    )
}
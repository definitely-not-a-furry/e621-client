import React from "react";
import { View, Text } from "react-native";
import { ThemeContext, ThemeProvider } from "../app/themeTest";

export const RootContext = React.createContext({});

export const RootView = ({ children }) => {
    return (
        <RootContext.Provider value={ { theme: ThemeProvider, children } }>
            <ThemeContext.Provider value={ { theme: ThemeProvider } }>
                {children}
            </ThemeContext.Provider>
        </RootContext.Provider>
    );
}
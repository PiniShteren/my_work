import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import "./style.css";
import Main from './Main';
import Reducers from "./src/redux/reducers";
import { useFonts } from "expo-font";
import { useEffect } from 'react';
import { Text } from 'react-native';

const theme = {
  "colors": {
    background: "#f7f5f4",
    backgroundSections: "#ffffff",
    color1: "#171f39",
    color2: "#fa8c45",
    color3: "#c9c7c6",
    color4: "#e1dedd",
    text: "#171f39",
    iconLight: "#ece9e7",
    iconDark: "#171f39",
    error: "#f44336",
    permission1: "#FF5733",
    permission2: "#4CBB17",
    permission3: "#FFC300",
    permission4: "#0080FF",
    permission5: "#9A32CD",
    sub: "#8eacca",
    role: "#1976D2"
  }
};

const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {

  const [fontsLoaded] = useFonts({
    'myFont': require('./src/assets/Rubik_Medium.ttf'), // שינוי: שימו את שם הפונט המבוקש
  });

  if (!fontsLoaded) {
    // יכול להיות מסך טעינה או פעולה אחרת בזמן טעינת הפונט
    return null;
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </StoreProvider>
  );
}
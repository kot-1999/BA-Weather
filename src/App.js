import React from "react";
import Settings from './screens/Settings';
import './i18njs'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./screens/Home";
import Intro from "./screens/Intro";

const Stack = createNativeStackNavigator();

export default function App() {
    const {t} = useTranslation()
    const settings_title = t("interface:settings")

    return (
      <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false, }}/>
                <Stack.Screen name="Home" component={Home} options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="Settings" component={Settings} options={{ title: settings_title }}/>
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    );
}





import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import React from "react";
import {Alert, Image, Pressable, StyleSheet, View} from "react-native";
import { settings} from "../assets/icons";
import Weather from "./Weather";
import SearchBar from "./components/SearchBar";
import Pollution from "./Pollution";
import WeatherMap from "./WeatherMap";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {fetchData} from "./Intro";
import RNExitApp from "react-native/Libraries/Utilities/BackHandler";
import Header from "./components/Header";

const Tab = createBottomTabNavigator();

function Home({ navigation }){
    const {t} = useTranslation();
    const mapType = useSelector((state)=> state.mapType);

    const tit1 = t("interface:weather");
    const tit2 = t(`settings:${mapType}`);
    const tit3 = t("interface:pollution");

    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {


                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Exit application?',
                    'Would you like to exit the application?',
                    [
                        { text: "Exit", style: 'cancel', onPress: () => {RNExitApp.exitApp()} },
                        {
                            text: 'Cancel'},
                    ]
                );
            }),
        [navigation]
    );


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({  color, size }) => {

                    if(route.name === 'Weather')
                        return <Ionicons name="cloudy" size={size} color={color}/>
                    if(route.name === 'WeatherMap')
                        return <Ionicons name="map" size={size} color={color}/>
                    if(route.name === 'Pollution')
                        return <Ionicons name="leaf" size={size} color={color}/>

                },
                tabBarActiveTintColor: '#2B76ABFF',
                tabBarInactiveTintColor: '#000',
            })}
        >

            <Tab.Screen
                name="Weather"
                component={Weather}
                options={{
                    headerTitle: '',
                    title: tit1,
                    headerRight: () => (<Header navigation={navigation}/>)
                }}/>

            <Tab.Screen
                name="Pollution"
                options={{
                    headerTitle: '',
                    title: tit3,
                    headerRight: () => (<Header navigation={navigation}/>)
                }}
                component={Pollution} />

            <Tab.Screen
                name="WeatherMap"
                options={{
                    headerTitle: '',
                    title: tit2,
                    headerRight: () => (<Header navigation={navigation}/>)
                }}
                component={WeatherMap} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1,
        width: 25,
        height: 25,
        alignSelf: 'flex-end'
    }
})

export default Home;

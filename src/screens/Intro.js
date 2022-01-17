import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Platform, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "../AsyncStrorage";
import { SETTINGS_KEY, WEATHER_API_KEY} from "../Keys";
import {
    actionCity,
    actionCoord,
    actionData,
    actionLanguage,
    actionSetMapType,
    actionUnits
} from "../redux/actionCreator";
import i18n from "i18next";
import RNExitApp from "react-native/Libraries/Utilities/BackHandler";
import {PERMISSIONS, request} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import {useTranslation} from "react-i18next";


let fetchData;

function Intro({navigation}){
    const [locationPermission, setLocationPermission] = useState(false)
    const dispatch = useDispatch();
    const lang = useSelector((state)=> state.language);
    const units = useSelector((state)=> state.units);
    const city = useSelector((state)=> state.city);
    const coord = useSelector((state)=> state.coord);
    const {t} = useTranslation();

    fetchData = async function (metric, coordinates) {
        /**
         * Fetching weather data
         */
        const CUR_WEATHER_API_BY_COORD = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates ? coordinates[0] : coord[0]}&lon=${coordinates ? coordinates[1] : coord[1]}&cnt=1&appid=${WEATHER_API_KEY}&lang=${lang}&units=${metric==null? units: metric}`

        function statusAlert(error, link){
            Alert.alert(
            `${t('alerts:error')+' '+error}`,
            `${t('alerts:fetch_error')}: ${link}`,
            [{
                text: t('alerts:try_again'),
                onPress: () => fetchData( metric, coordinates)
                },{
                    text: t('alerts:exit'),
                    onPress: () => RNExitApp.exitApp(),
                    style: "exit"
                },{
                    text: t('alerts:ok'),
                    onPress: () => {
                        if(navigation.getState().routes[0].name === 'Intro')
                            navigation.navigate('Home');
                    }
                }]
            )
        }

        function errorAlert(message){
            Alert.alert(
                `${t('alerts:error')}`,
                `${message}`,
                [{
                    text: t('alerts:try_again'),
                    onPress: () => fetchData( metric, coordinates)
                },
                    {
                        text: t('alerts:exit'),
                        onPress: () => RNExitApp.exitApp(),
                        style: "exit"
                    }
                ])
        }

        let weatherData = {};

        let tempCoord = [0,0]
        try{
            const response = await fetch(CUR_WEATHER_API_BY_COORD);
            console.log('resp 1',response.status)
            if(response.status === 200){
                let tempData = await response.json();
                weatherData['currTemp'] = tempData.main.temp;
                weatherData['country'] = tempData.sys.country;
                weatherData['city'] = tempData.name;
                dispatch(actionCity(weatherData.city))
                tempCoord = [tempData.coord.lat, tempData.coord.lon];
            }else {
                statusAlert(response.status,  CUR_WEATHER_API_BY_COORD);
                dispatch(actionData({weatherData: null, pollutionData: null}));
                return;
            }
        }catch (error) {
            console.log(error.message);
            dispatch(actionData({weatherData: null, pollutionData: null}));
            errorAlert(error.message);
            return;
        }

        const FIVE_DAY_WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?id=524901&q=${weatherData.city}&appid=${WEATHER_API_KEY}&lang=${lang}&units=${metric==null? units: metric}`
        try{
            const response = await fetch(FIVE_DAY_WEATHER_API);
            console.log('resp 2',response.status)
            if(response.status === 200){
                let tempData = await response.json();
                weatherData['list'] = tempData.list;
            }else {
                statusAlert(response.status, FIVE_DAY_WEATHER_API);
                dispatch(actionData({weatherData: null, pollutionData: null}));
                return;
            }
        }catch (error) {
            console.log(error.message);
            dispatch(actionData({weatherData: null, pollutionData: null}));
            return;
        }

        let pollutionData = null;
        const POLLUTION_API = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${tempCoord[0]}&lon=${tempCoord[1]}&appid=${WEATHER_API_KEY}`
        try {
            const response = await fetch(POLLUTION_API);
            console.log('resp 3',response.status)
            if(response.status === 200 ) {
                let data = await response.json()
                data.city = city;
                pollutionData = data;
            }else {
                statusAlert(response.status, FIVE_DAY_WEATHER_API);
                dispatch(actionData({weatherData: null, pollutionData: null}));
                return;
            }
        } catch (error) {
            console.log(error.message);
            dispatch(actionData({weatherData: null, pollutionData: null}));
            return;
        }

        let data = {pollutionData: pollutionData, weatherData: weatherData,};

        dispatch(actionData({weatherData, pollutionData}));
        dispatch(actionData(data));

        // dispatch(actionData(data));
        if(navigation.getState().routes[0].name === 'Intro')
            navigation.navigate('Home');
    }

    async function getLastSettings() {
        let settings = await getData(SETTINGS_KEY);
        if(settings!=null){
            dispatch(actionLanguage(settings.lang))
            dispatch(actionUnits(settings.units))
            dispatch(actionSetMapType(settings.mapType))
            await i18n.changeLanguage(settings.lang);
        }

    }

    useEffect( () => {
        getLastSettings();
        requestLocationPermission();

    }, []);


    const requestLocationPermission = async()=>{

        if(Platform.OS==='ios'){
            setLocationPermission(await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE));
            if(locationPermission==='granted')
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                        fetchData();
                        return;
                    },
                    (error) => console.log(error.message)
                )
        }else{
            let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(response==='granted')
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                        fetchData();
                        return;
                    },
                    (error) => console.log(error.message)
                )

        }
        fetchData();
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize: 32, color: '#010101', margin: 35, padding: 20, textAlign: 'center'}}>{t('interface:welcome')}</Text>
            <ActivityIndicator size="large" color={'#2B76ABFF'}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
export {fetchData}
export default Intro;
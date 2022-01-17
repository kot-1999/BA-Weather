import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar, ScrollView} from 'react-native';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DayWeatherInfo from "./components/DayWeatherInfo";


function Weather() {
    /***
     * returns default weather screen
     */

    const DAY = 1000 * 60 * 60 * 24;
    const {t} = useTranslation()
    const [backgroundImage, setBackgroundImage] = useState(haze);
    const [day, setDay] = useState(0);
    const today = new Date().getTime()
    const units = useSelector((state)=> state.units);
    const city = useSelector((state)=> state.city);
    const coord = useSelector((state)=> state.coord);
    const weatherData = useSelector((state)=> state.data.weatherData);


    if(weatherData === null) {
      return (
          <View style={styles.container}>
              <ImageBackground
                  source={backgroundImage}
                  style={styles.backgroundImg}
                  resizeMode='cover'
              >
              </ImageBackground>
          </View>
      )
    }



    function updateDay(day){
        setDay(day);
        setBackgroundImage(getBackgroundImg(weatherData.list[day*8].weather[0].main));
    }

    function getBackgroundImg(weather) {
        if(weather === 'Snow') return snow
        if(weather === 'Clear') return sunny
        if(weather === 'Rain') return rainy
        if(weather === 'Haze') return haze
        return haze;
    }


    let textColor = (backgroundImage === sunny || backgroundImage === snow) ?  '#010101' : '#ffffff';
    useEffect( () => {
        updateDay(day)

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='darkgray' />
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode='cover'
            >
                <ScrollView>

                    <View style={{alignItems: 'center' }}>
                        <Text style={{ ...styles.headerText, color: textColor}}>{weatherData.country+' '+city}</Text>
                        <Text style={{ ...styles.smallLabelText, color: textColor}}>{t('weather:lat')+' '+coord[0]+'  '+t('weather:lon')+' '+coord[1]}</Text>
                        <Text style={{ ...styles.labelText, color: textColor}}>{t('weather:cur')}</Text>
                        <Text style={{ ...styles.headerText, color: textColor, marginTop: -8}}>{weatherData.currTemp}{units === 'metric'?'°C' : '°F'}</Text>
                    </View>

                    <View style={styles.extraInfo}>

                        <View style={{...styles.infoDays, backgroundColor: day===0 ? '#2b76ab' : '#000'}}><Pressable onPress={()=>{updateDay(0)}}>
                            <Text style={styles.labelText}>{t(`weekdays:${new Date(today).toString().substr(0, 3)}`)}</Text>
                            <Text style={styles.labelText}>{new Date(today).toLocaleDateString().substr(0,5)}</Text></Pressable>
                        </View>

                        <View style={{...styles.infoDays, backgroundColor: day===1 ? '#2b76ab' : '#000'}}><Pressable onPress={()=>{updateDay(1)}}>
                            <Text style={styles.labelText}>{t(`weekdays:${new Date(today+DAY).toString().substr(0, 3)}`)}</Text>
                            <Text style={styles.labelText}>{new Date(today+DAY).toLocaleDateString().substr(0,5)}</Text></Pressable>
                        </View>
                        <View style={{...styles.infoDays, backgroundColor: day===2 ? '#2b76ab' : '#000'}}><Pressable onPress={()=>{updateDay(2)}}>
                            <Text style={styles.labelText}>{t(`weekdays:${new Date(today+DAY*2).toString().substr(0, 3)}`)}</Text>
                            <Text style={styles.labelText}>{new Date(today+DAY*2).toLocaleDateString().substr(0,5)}</Text></Pressable>
                        </View>
                        <View style={{...styles.infoDays, backgroundColor: day===3 ? '#2b76ab' : '#000'}}><Pressable onPress={()=>{updateDay(3)}}>
                            <Text style={styles.labelText}>{t(`weekdays:${new Date(today+DAY*3).toString().substr(0, 3)}`)}</Text>
                            <Text style={styles.labelText}>{new Date(today+DAY*3).toLocaleDateString().substr(0,5)}</Text></Pressable>
                        </View>
                        <View style={{...styles.infoDays, backgroundColor: day===4 ? '#2b76ab' : '#000'}}><Pressable onPress={()=>{updateDay(4)}}>
                            <Text style={styles.labelText}>{t(`weekdays:${new Date(today+DAY*4).toString().substr(0, 3)}`)}</Text>
                            <Text style={styles.labelText}>{new Date(today+DAY*4).toLocaleDateString().substr(0,5)}</Text></Pressable>
                        </View>

                    </View>

                    <DayWeatherInfo list={weatherData.list} day={day}/>



                    <View style={styles.extraInfo}>
                        <View style={styles.info}>
                            <Text style={styles.labelText}>{t('weather:pressure')}</Text>
                            <Text style={styles.extraText}>{weatherData.list[day*8].main.grnd_level} hPa</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={styles.labelText}>{t('weather:gust')}</Text>
                            <Text style={styles.extraText}>{weatherData.list[day*8].wind.gust} {t('weather:meters')}</Text>
                        </View>
                    </View>

                    <View style={styles.extraInfo}>
                        <View style={styles.info}>
                            <Text style={styles.labelText}>{t('weather:clouds')}</Text>
                            <Text style={styles.extraText}>{weatherData.list[day*8].clouds.all} %</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={styles.labelText}>{t('weather:visibility')}</Text>
                            <Text style={styles.extraText}>{weatherData.list[day*8].visibility} {t('weather:m')} </Text>
                        </View>
                    </View>

                </ScrollView>

            </ImageBackground>
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
    backgroundImg: {
        flex: 1,
        width: '100%',
        height: null,
    },
    headerText: {
        fontSize: 42,
        marginTop: 10,
        fontWeight: 'bold'
    },
    underHeaderText: {
        fontSize: 32,
        marginTop: 3,
        fontWeight: 'bold'
    },
    extraText: {
        fontSize: 22,
        color: '#ffffff',
    },
    labelText: {
        fontSize: 18,
        color: '#ffffff',
    },
    smallLabelText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    extraInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: '#010101',
        opacity: 0.8,
        padding: 6,
        borderRadius: 15,
        justifyContent: 'center'
    },
    infoDays: {
        width: Dimensions.get('screen').width/6,
        backgroundColor: '#010101',
        opacity: 0.8,
        padding: 6,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default Weather

import React, {useEffect, useState} from "react";
import {Button, Platform, Pressable, StyleSheet, Text, View} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useSelector, useDispatch } from "react-redux";
import {actionLanguage, actionUnits, actionSetMapType, actionCoord} from '../redux/actionCreator';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {storeData} from "../AsyncStrorage";
import {SETTINGS_KEY} from "../Keys";
import {fetchData} from "./Intro";
import {check, PERMISSIONS, request} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";

function Settings() {
    const {t} = useTranslation();
    const lang = useSelector((state)=> state.language);
    const units = useSelector((state)=> state.units);
    const mapType = useSelector((state)=> state.mapType);
    const dispatch = useDispatch();
    const [locationPermission, setLocationPermission] = useState(false)

    async function hasLocationPermission(){
        if(Platform.OS==='ios'){
            let response = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if(response==='granted') {
                setLocationPermission(true);
                return;
            }

        }else{
            let response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(response==='granted') {
                setLocationPermission(true);
                return;
            }
        }
        setLocationPermission(false);
    }

    async function getLocationPermission(){
        if(Platform.OS==='ios'){
            let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if(response==='granted') {
                setLocationPermission(true);
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                        fetchData();
                        return;
                    },
                    (error) => console.log(error.message)
                )
            }

        }else{
            let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if(response==='granted') {
                setLocationPermission(true);
                await Geolocation.getCurrentPosition(
                    position => {
                        dispatch(actionCoord([position.coords.latitude,position.coords.longitude]))
                        fetchData();
                        return;
                    },
                    (error) => console.log(error.message)
                )
            }
        }
    }

    useEffect( () => {
        hasLocationPermission();

    }, []);

    console.log(locationPermission)
    return(
        <View style={styles.container}>
            <Text>{t('settings:lang')}:</Text>
            <Picker
                style={{ width: "100%" }}
                selectedValue={lang}
                onValueChange={(val) => {
                    dispatch(actionLanguage(val))
                    i18n.changeLanguage(val).then(r => console.log(r));
                    storeData(SETTINGS_KEY, {lang: val, units: units, mapType: mapType}).then(r => console.log(r));
                }}
            >
                <Picker.Item label={t('settings:english')} value="en" />
                <Picker.Item label={t('settings:ukrainian')} value="uk" />
                <Picker.Item label={t('settings:deutsch')} value="de" />
            </Picker>
            <Text>{t('settings:units')}:</Text>
            <Picker
                style={{ width: "100%" }}
                selectedValue={units}
                onValueChange={(val) => {
                    dispatch(actionUnits(val));
                    storeData(SETTINGS_KEY, {lang: lang, units: val, mapType: mapType}).then(r => console.log(r));
                    fetchData( val)
                }}
            >
                <Picker.Item label={t('settings:metric')} value="metric" />
                <Picker.Item label={t('settings:imperial')} value="imperial" />
                {/*Maybe later*/}
                {/*<Picker.Item label="Standard" value="standard" />*/}
            </Picker>
            <Text>{t('settings:map_type')}:</Text>
            <Picker
                style={{ width: "100%" }}
                selectedValue={mapType}
                onValueChange={(val) => {
                    dispatch(actionSetMapType(val));
                    storeData(SETTINGS_KEY, {lang: lang, units: units, mapType: val}).then(r => console.log(r));
                }}
            >
                <Picker.Item label={t('settings:temp_new')} value='temp_new' />
                <Picker.Item label={t('settings:wind_new')} value='wind_new' />
                <Picker.Item label={t('settings:pressure_new')} value='pressure_new' />
                <Picker.Item label={t('settings:precipitation_new')} value='precipitation_new' />
                <Picker.Item label={t('settings:clouds_new')} value='clouds_new' />

            </Picker>
            <Text>{t('settings:geolocation')}:</Text>
            <Pressable  onPress={()=> {
                if (!locationPermission)
                    getLocationPermission()
            }}>
                <Text style={{...styles.button, backgroundColor: `${locationPermission ? 'rgba(78,234,17,0.15)':'rgba(234,17,17,0.15)'}`,}}>{locationPermission ? t('settings:have_permission') : t('settings:no_permission')}</Text>
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },button: {
        fontSize: 17,
        margin: 10,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20
    }

});


export default Settings;

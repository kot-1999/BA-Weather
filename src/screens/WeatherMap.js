import React, {useEffect, useState} from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {WEATHER_API_KEY} from '../Keys'
import { actionCoord} from "../redux/actionCreator";
import {fetchData} from "./Intro";

export default function  WeatherMap(){
    const coord = useSelector((state)=> state.coord);
    const mapType = useSelector((state)=> state.mapType);
    const dispatch = useDispatch()
    const [map, setMap] = useState(null);


    const [state] = useState({
        initialPosition: {
            latitude: coord[0],
            longitude: coord[1],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
        }})

    if(map!=null)
        map.animateToRegion({
            latitude: coord[0],
            longitude: coord[1],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
        })
    return(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                ref = {m => setMap(m)}
                mapType={'standard'}
                showsUserLocation={true}
                customMapStyle={mapType === 'clouds_new' ? require('./components/mapDark.json') : require('./components/mapLight.json')}
                showsMyLocationButton={true}
                showsCompass={true}
                showsScale={true}
                onPress={async (c) => {
                    dispatch(actionCoord([c.nativeEvent.coordinate.latitude, c.nativeEvent.coordinate.longitude]))
                    fetchData( null,  [c.nativeEvent.coordinate.latitude, c.nativeEvent.coordinate.longitude])
                    // navigation.navigate('Home');
                }}
                initialRegion={state.initialPosition}
            >
                <Marker
                    coordinate={{latitude: coord[0] , longitude:coord[1]}}
                />
                <MapView.UrlTile
                    urlTemplate={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`}
                    style={styles.tiles}
                    maximumZ = {255}
                    flipY = {false}

                />
            </MapView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    tiles: {
        opacity: 1
    }

});


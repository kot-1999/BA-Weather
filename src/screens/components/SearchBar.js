import React, {useRef, useState} from 'react'
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,

} from 'react-native';
import { search } from '../../assets/icons';
import {useTranslation} from "react-i18next";
import {fetchData} from '../Intro';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '../../Keys';
import {useDispatch, useSelector} from "react-redux";
import Geocoder from 'react-native-geocoding';
import {actionCoord} from "../../redux/actionCreator";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

Geocoder.init(GOOGLE_PLACES_API_KEY);

export default function SearchBar() {
    const {t} = useTranslation()
    const lang = useSelector((state)=> state.language);
    const [icon, setIcon] = useState((<Image source={search} style={styles.icon}/>))
    const dispatch = useDispatch();

    async function f(){
        setIcon((<ActivityIndicator size="large" color={'#2B76ABFF'} style={styles.icon}/>))
        let address = ref.current?.getAddressText();
        await Geocoder.from(address)
            .then(json => {
                let location = json.results[0].geometry.location;
                dispatch(actionCoord([location.lat, location.lng]))
                ref.current?.clear();

            })
            .catch(error => {
                ToastAndroid.show(`Can't find "${ref.current?.getAddressText()}"`,4);
                ref.current?.clear();

            });
        await fetchData()
        setIcon((<Image source={search} style={styles.icon}/>))
    }
    const ref = useRef();





    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={styles.searchBar}>
                <GooglePlacesAutocomplete
                    ref={ref}
                    debounce={520}
                    minLength={2}
                    language={lang}
                    placeholder={t("search:enter_city")}
                    fetchDetails={true}
                    styles={{
                        listView: {
                            position:'absolute',
                            marginTop: '15%',
                            width: '115%',
                        }

                    }}
                    query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: lang,
                        types: '(cities)'
                    }}
                    listViewDisplayed={"auto"}
                    onPress={() => f()}
                >

                </GooglePlacesAutocomplete>

            </View>
            <Pressable  name="search" size={28} color="black"  onPress={() => {
                f()
            }}>
                {icon}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {

        flexDirection: 'row',
        alignItems: 'center',
        width: '120%',
        borderWidth: 0,
        marginRight:10,
        marginLeft: -35,
        backgroundColor: '#f1f1f1',
    },
    icon: {
        aspectRatio: 1,
        width: 25,
        height: 25,
        alignSelf: 'flex-end'
    }
})
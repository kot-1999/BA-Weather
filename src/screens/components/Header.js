import {Image, Pressable, StyleSheet, View} from "react-native";
import SearchBar from "./SearchBar";
import {settings} from "../../assets/icons";
import React from "react";


export default function Header(props){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <View style={{width: "80%", paddingRight: '15%'}}>
                <SearchBar/>
            </View>
            <Pressable  name="search" size={28} color="black" style={{padding: 10}} onPress={() => props.navigation.navigate("Settings")}>
                <Image
                    source={settings}
                    style={styles.icon}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        aspectRatio: 1,
        width: 25,
        height: 25,
        alignSelf: 'flex-end'
    }
})
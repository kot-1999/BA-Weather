import React from "react";
import {StyleSheet, Text } from "react-native";
import {DataTable} from "react-native-paper";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

function DayWeatherInfo(props){
    const units = useSelector((state)=> state.units);
    const {t} = useTranslation();
    const list = props.list;
    const day = props.day;
    const  output = []

    function getWindDirection(deg) {
        if ((deg > 340 && deg <= 360) || (deg >= 0 && deg <= 20))
            return  '⇑';
        else if (deg > 20 && deg <= 60)
            return  '⇗';
        else if (deg > 60 && deg <= 110)
            return  '⇒';
        else if (deg > 110 && deg <= 150)
            return  '⇘';
        else if (deg > 150 && deg <= 210)
            return  '⇓';
        else if (deg > 210 && deg <= 250)
            return  '⇙';
        else if (deg > 250 && deg <= 300)
            return  '⇐';
        else if (deg > 300 && deg <= 340)
            return  '⇖';
        else
            return 'o';
    }

    for(let i=0;i<list.length;i++) {

        if (new Date(list[i].dt * 1000).toDateString() === new Date(list[day * 8].dt * 1000).toDateString()) {
            let key=`key_${i}`;
            let tempItem = (
                <DataTable.Row key={key} style={styles().info}>
                    <DataTable.Cell><Text
                        style={styles().labelText}>{new Date(list[i].dt * 1000).toLocaleTimeString().substr(0, 5)}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles().labelText}>{list[i].main.temp}{units === 'metric'?'°C' : '°F'}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles().labelText}>{getWindDirection(list[i].wind.deg)} {list[i].wind.speed.toString().substr(0,3)} {t('weather:meters')}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles().labelText}>{'💧'}{list[i].main.humidity}%</Text></DataTable.Cell>
                </DataTable.Row>
            )
            output.push(tempItem);
        }
    }
    return(
        <DataTable>
            {output}
        </DataTable>
    )
}

const styles = () => (StyleSheet.create({
    labelText: {
        fontSize: 18,
        color: '#fff',
    },
    info: {
        width: '95%',
        backgroundColor: '#000',
        opacity: 0.8,
        padding: 6,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    }
}));

export default DayWeatherInfo;
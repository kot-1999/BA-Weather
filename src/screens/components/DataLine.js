import { StyleSheet, Text} from "react-native";
import React from "react";
import {DataTable} from "react-native-paper";

export default function DataLine(props){
    let color = '#0000ff'





    if(props.data==null)
        return (<></>);
    else {
        if (props.data.main.aqi===1)
            color='#0000ff'
        else if (props.data.main.aqi===2)
            color='#3300cc'
        else if (props.data.main.aqi===3)
            color='#660099'
        else if (props.data.main.aqi===4)
            color='#990066'
        else
            color='#cc0033'

        return (
            <>
            <Text style={styles(color).smallText}>{new Date(props.data.dt*1000).toLocaleDateString()} - {new Date(props.data.dt*1000).toLocaleTimeString().substr(0,5)}</Text>
            <DataTable>

                <DataTable.Row style={styles(color).info}>
                    <DataTable.Cell><Text style={styles(color).labelText}>{props.data.components.no2}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles(color).labelText}>{props.data.components.pm10}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles(color).labelText}>{props.data.components.o3}</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles(color).labelText}>{props.data.components.pm2_5}</Text></DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            </>
        )
    }
}

const styles = (color) => (StyleSheet.create({


    extraText: {
        fontSize: 22,
        color: '#ffffff',
    },
    labelText: {
        fontSize: 18,
        color: '#fff',
    },
    smallText: {
        fontSize: 14,
        color: '#000',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    info: {
        width: '95%',
        backgroundColor: color,
        opacity: 0.8,
        padding: 6,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"

    }
}));

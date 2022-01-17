import React from "react";
import {Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {air} from '../assets/backgroundImages'
import { useTranslation } from "react-i18next";
import { DataTable } from 'react-native-paper';
import DataLine from "./components/DataLine";

function Pollution(){
    const {t} = useTranslation()
    const coord = useSelector((state)=> state.coord);
    const city = useSelector((state)=> state.city);
    const pollutionData = useSelector((state)=> state.data.pollutionData); 

    let data = [];
    if (pollutionData != null)
        for(let i=0;i < pollutionData.list.length; i+=4)
            data.push((<DataLine key={i.toString()} data={!pollutionData ? null : pollutionData.list[i]}/>))

    return(
        <View style={styles.container}>
            <ImageBackground
                source={air}
                style={styles.backgroundImg}
                resizeMode='cover'
            >

                {/*<SearchBar fetchData={fetchData} />*/}

                <View style={{alignItems: 'center' }}>
                    <Text style={ styles.underHeaderText}>{city}</Text>
                    <Text style={ styles.smallLabelText}>{t('weather:lat')+' '+coord[0]+'  '+t('weather:lon')+' '+coord[1]}</Text>

                </View>

                <DataTable style={styles.extraInfo}>
                    <DataTable.Row style={styles.info}>
                        <DataTable.Cell style={{justifyContent: 'center'}}><Text style={styles.labelText}>{t('pollution:pollutant')} μg/m^3</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Header style={styles.info}>
                        <DataTable.Cell><Text style={styles.extraText}>NO<Text style={{fontSize: 14, lineHeight: 37}}>2</Text></Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.extraText}>PM<Text style={{fontSize: 14, lineHeight: 37}}>10</Text></Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.extraText}>O<Text style={{fontSize: 14, lineHeight: 37}}>3</Text></Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.extraText}>PM<Text style={{fontSize: 14, lineHeight: 37}}>25</Text></Text></DataTable.Cell>
                    </DataTable.Header>

                    <DataTable.Row style={{...styles.info, backgroundColor: '#0000ff'}}>
                        <DataTable.Cell><Text style={styles.labelText}>0-50</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>0-25</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>0-60</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>0-15</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={{...styles.info, backgroundColor: '#3300cc'}}>
                        <DataTable.Cell><Text style={styles.labelText}>50-100</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>25-50</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>60-120</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>15-30</Text></DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={{...styles.info, backgroundColor: '#660099'}}>
                        <DataTable.Cell><Text style={styles.labelText}>100-200</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>50-90</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>120-180</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>30-55</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={{...styles.info, backgroundColor: '#990066'}}>
                        <DataTable.Cell><Text style={styles.labelText}>200-400</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>90-180</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>180-240</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>55-110</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={{...styles.info, backgroundColor: '#cc0033'}}>
                        <DataTable.Cell><Text style={styles.labelText}>>400</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>>180</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>>240</Text></DataTable.Cell>
                        <DataTable.Cell><Text style={styles.labelText}>>110</Text></DataTable.Cell>
                    </DataTable.Row>

                </DataTable>

                <ScrollView>
                    {data}
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

    underHeaderText: {
        fontSize: 32,
        marginTop: 3,
        color: '#ffffff',
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

        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: '100%',
        backgroundColor: '#010101',
        opacity: 0.8,
        padding: 6,
        borderRadius: 15,
        justifyContent: 'center',

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

export default Pollution;
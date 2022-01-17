import {LANGUAGE, UNITS, CITY, SET_MAP_TYPE, COORD, DATA} from '../actions';

function actionLanguage(lang) {
    return {
        type: LANGUAGE,
        lang: lang
    };
}

function actionUnits(unit) {
    return {
        type: UNITS,
        unit: unit
    };
}

function actionCity(name) {
    return {
        type: CITY,
        name: name
    };
}

function actionSetMapType(mapType) {
    return {
        type: SET_MAP_TYPE,
        mapType: mapType
    };
}

function actionCoord(coord){
    return{
        type: COORD,
        coord: coord
    }
}

function actionData(data){
    return{
        type: DATA,
        data: data
    }
}



export {actionUnits, actionCity, actionLanguage, actionSetMapType, actionCoord, actionData};
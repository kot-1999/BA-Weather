import city from "./city";
import language from "./language";
import units from "./units";
import mapType from './mapType'
import coord from './coord'
import data from "./data";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    city: city,
    language: language,
    units: units,
    mapType: mapType,
    coord: coord,
    data: data
});
export default allReducers;

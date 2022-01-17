import { SET_MAP_TYPE } from '../actions';

const mapType = (mapType = 'temp_new', action) => {
    switch (action.type) {
        case SET_MAP_TYPE:
            return action.mapType;
        default:
            return mapType;
    }
};

export default mapType;

import { DATA} from '../actions';

const data = (data = {weatherData: null, pollutionData: null}, action) => {
    switch (action.type) {
        case DATA:
            return action.data;
        default:
            return data;
    }
};

export default data;

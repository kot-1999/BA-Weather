import { CITY } from '../actions';

const city = (name = "London", action) => {
    switch (action.type) {
        case CITY:
            return action.name;
        default:
            return name;
    }
};

export default city;

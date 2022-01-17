import { UNITS } from '../actions';

const units = (unit = "metric", action) => {
    switch (action.type) {
        case UNITS:
            return action.unit;
        default:
            return unit;
    }
};

export default units;

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        // console.log('Data stored: ',value);
    } catch (e) {
        console.log(e.message)
    }
}

const getData = async (key) => {
    try {
        let jsonValue = await AsyncStorage.getItem(key)
        // console.log('Data unstored: ', jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e.message)
    }
}

export {storeData, getData}

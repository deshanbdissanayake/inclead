import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllAsyncData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);

        const dataObject = {};

        data.forEach(([key, value]) => {
            dataObject[key] = value;
        });

        return dataObject;
    } catch (error) {
        console.error('Error occurred while getting AsyncStorage data: ', error); 
        return null;
    }
};

const storeData = async (key, value) => {
    let res = false;
    try {
        await AsyncStorage.setItem(key, value);
        res = true;
    } catch (error) {
        console.error('Error occurred while saving in AsyncStorage data: ', error); 
    } finally {
        return res;
    }
};

export { getAllAsyncData, storeData }
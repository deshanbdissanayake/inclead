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

export { getAllAsyncData }
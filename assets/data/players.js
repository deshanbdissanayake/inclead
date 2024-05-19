import { Alert } from "react-native";
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import { getAllAsyncData } from "./async_storage";
import { formatDateToString } from "./common";

const getPlayers = async () => {
    const playersCol = collection(db, 'players');
    const playerSnapshot = await getDocs(playersCol);
    const activePlayersList = playerSnapshot.docs
        .map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            status: doc.data().status,
            createdAt: formatDateToString(doc.data().createdAt.toDate()),
        }))
        .filter(player => player.status === 'active')
        .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        });

    return activePlayersList;
}

const savePlayer = async (sentData) => {
    try {
        
        if(!sentData.name || !sentData.image){
            Alert.alert('Error', 'All fields are required!')
            return
        }

        const res = await getAllAsyncData();
        const userdata = JSON.parse(res.userdata);
        const playersCol = collection(db, 'players');

        const formData = {
            name: sentData.name,
            image: sentData.image,
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            status: 'active',
        };

        if (!sentData.id) {
            formData.createdBy = userdata.username;
            formData.createdAt = new Date();
            await addDoc(playersCol, formData);
            return { stt: 'success', msg: 'Player added successfully!', data: [] };
        } else {
            const playerRef = doc(playersCol, sentData.id);
            await updateDoc(playerRef, formData);
            return { stt: 'success', msg: 'Player edited successfully!', data: [] };
        }
    } catch (error) {
        console.error('Error saving player:', error);
        return { stt: 'error', msg: 'Error saving player. Please try again later.', data: [] };
    }
};



const deletePlayer = async (id) => {
    try {
        
        if(!id){
            Alert.alert('Error', 'Something went wrong!');
            return;
        }

        const res = await getAllAsyncData();
        const userdata = JSON.parse(res.userdata);
        const playersCol = collection(db, 'players');

        let formData = {
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            status: 'delete',
        };

        const playerRef = doc(playersCol, id);
        await updateDoc(playerRef, formData);
        return { stt: 'success', msg: 'Player deleted successfully!', data: [] };
      
    } catch (error) {
        console.error('Error deleting player:', error);
        return { stt: 'error', msg: 'Error deleting player. Please try again later.', data: [] };
    }
} 

export { getPlayers, savePlayer, deletePlayer }
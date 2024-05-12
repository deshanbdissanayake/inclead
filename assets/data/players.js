import { Alert } from "react-native";
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import { getAllAsyncData } from "./async_storage";

const getPlayers = async () => {
    const playersCol = collection(db, 'players');
    const playerSnapshot = await getDocs(playersCol);
    const activePlayersList = playerSnapshot.docs
        .map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            status: doc.data().status,
            createdAt: formatDate(doc.data().createdAt.toDate()),
        }))
        .filter(player => player.status === 'active')
        .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        });

    return activePlayersList;
}

// Function to format date to "YYYY-MM-DD hh:mm a" format
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    return `${year}-${month}-${day} ${hours}:${minutes} ${meridiem}`;
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
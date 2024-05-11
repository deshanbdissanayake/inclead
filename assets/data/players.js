import { Alert } from "react-native";
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';

const getPlayers = async () => {
    const playersCol = collection(db, 'players');
    const playerSnapshot = await getDocs(playersCol);
    const activePlayersList = playerSnapshot.docs
        .map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            status: doc.data().status
        }))
        .filter(player => player.status === 'active');

    return activePlayersList;
}

const savePlayer = async (sentData) => {

    if(!sentData.name || !sentData.image){
        Alert.alert('Error', 'All fields are required!')
        return
    }

    let formData = {
        name: sentData.name,
        image: sentData.image,
        status: 'active'
    };

    try {
        // Reference to the 'players' collection
        const playersCol = collection(db, 'players');

        if (!sentData.id) {
            // Adding a new player
            await addDoc(playersCol, formData);
            return { stt: 'success', msg: 'Player added successfully!', data: [] };
        } else {
            // Editing an existing player
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

    if(!id){
        Alert.alert('Error', 'Something went wrong!');
        return;
    }

    try {
        // Reference to the 'players' collection
        const playersCol = collection(db, 'players');

        // Editing an existing player
        const playerRef = doc(playersCol, id);
        await updateDoc(playerRef, {status: 'delete'});
        return { stt: 'success', msg: 'Player deleted successfully!', data: [] };
      
    } catch (error) {
        console.error('Error deleting player:', error);
        return { stt: 'error', msg: 'Error deleting player. Please try again later.', data: [] };
    }
} 

export { getPlayers, savePlayer, deletePlayer }
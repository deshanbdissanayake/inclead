import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import { getPlayers } from "./players";
import { getAllAsyncData } from "./async_storage";
import { Alert } from "react-native";

const getMatchStats = async () => {
    const matchesCol = collection(db, 'matches');
    const matchSnapshot = await getDocs(matchesCol);
    const activeMatchesList = await Promise.all(matchSnapshot.docs
        .map(async doc => {
            const players = await formatPlayer(doc.data().players);
            return {
                id: doc.id,
                players: players,
                type: doc.data().type,
                createdAt: formatDate(doc.data().createdAt.toDate()),
                status: doc.data().status,
            };
        }));

    const filteredMatches = activeMatchesList.filter(match => match.status === 'active')
        .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        });

    return filteredMatches;
}


const formatPlayer = async (players) => {
    const playersList = await getPlayers();
    const playerMap = new Map(playersList.map(player => [player.id, player]));

    const updatedPlayers = players.map(player => ({
        ...player,
        image: playerMap.get(player.id).image,
        name: playerMap.get(player.id).name
    }));
    return updatedPlayers;
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

const saveMatch = async (matchData) => {
    try {
        const res = await getAllAsyncData();
        const userdata = JSON.parse(res.userdata);
        const matchesCol = collection(db, 'matches');

        const formData = {
            ...matchData,
            players: matchData.players.map(({ name, image, ...rest }) => rest),
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            type: 'carrom',
            status: 'active'
        };

        formData.createdBy = userdata.username;
        formData.createdAt = new Date();
        await addDoc(matchesCol, formData);
        return { stt: 'success', msg: 'Match data saved successfully!', data: [] };
    } catch (error) {
        console.error('Error saving match:', error);
        return { stt: 'error', msg: 'Error saving match. Please try again later.', data: [] };
    }
}

const deleteMatch = async (id) => {
    try {
        if(!id){
            Alert.alert('Error', 'Something went wrong!');
            return;
        }

        let res = await getAllAsyncData();
        let userdata = JSON.parse(res.userdata);
        const matchesCol = collection(db, 'matches');

        const formData = {
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            status: 'delete',
        };

        const matchRef = doc(matchesCol, id);
        await updateDoc(matchRef, formData);
        return { stt: 'success', msg: 'Match deleted successfully!', data: [] };
      
    } catch (error) {
        console.error('Error deleting user:', error);
        return { stt: 'error', msg: 'Error deleting match. Please try again later.', data: [] };
    }
}

export { getMatchStats, saveMatch, formatPlayer, deleteMatch }
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc, query, where, Timestamp  } from 'firebase/firestore/lite';
import { getAllAsyncData } from "./async_storage";
import { Alert } from "react-native";
import { formatDateToString } from "./common";

const getMatchStats = async () => {
    const matchesCol = collection(db, 'matches_test');
    
    // Calculate the date for two weeks ago
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    // Create a Firestore query to get matches from the last two weeks
    const q = query( matchesCol, where('createdAt', '>=', Timestamp.fromDate(twoWeeksAgo)));
    
    const querySnapshot = await getDocs(q);
    const matches = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        matches.push({
            id: doc.id,
            players: data.players,
            type: data.type,
            createdAt: formatDateToString(data.createdAt.toDate()),
            startedAt: data.startedAt ? formatDateToString(data.startedAt.toDate()) : formatDateToString(data.createdAt.toDate()),
            endedAt: data.endedAt ? formatDateToString(data.endedAt.toDate()) : formatDateToString(data.createdAt.toDate()),
            status: data.status,
        })
    });
  
    const filteredMatches = matches.filter(match => match.status === 'active')
        .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
        });

    return filteredMatches;
  };

const saveMatch = async (matchData) => {
    try {
        const res = await getAllAsyncData();
        const userdata = JSON.parse(res.userdata);
        const matchesCol = collection(db, 'matches_test');

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
        const matchesCol = collection(db, 'matches_test');

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

export { getMatchStats, saveMatch, deleteMatch }
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';

const getMatchStats = async () => {
    const matchesCol = collection(db, 'matches');
    const matchSnapshot = await getDocs(matchesCol);
    const activeMatchesList = matchSnapshot.docs
        .map(doc => ({
            id: doc.id,
            players: doc.data().players,
            type: doc.data().type,
            dateTime: formatDate(doc.data().dateTime.toDate()),
            handledBy: doc.data().handledBy,
            status: doc.data().status,
        }))
        .filter(match => match.status === 'active')
        .sort((a, b) => {
            if (a.dateTime < b.dateTime) return 1;
            if (a.dateTime > b.dateTime) return -1;
            return 0;
        });

    return activeMatchesList;
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
        // Reference to the 'matches' collection
        const playersCol = collection(db, 'matches');
        // Adding a new match
        await addDoc(playersCol, matchData);
        return { stt: 'success', msg: 'Match data saved successfully!', data: [] };
    } catch (error) {
        console.error('Error saving match:', error);
        return { stt: 'error', msg: 'Error saving match. Please try again later.', data: [] };
    }
}

export { getMatchStats, saveMatch }
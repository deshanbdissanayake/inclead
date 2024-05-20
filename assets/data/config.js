import { db } from "../../db/firestore";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';

// Existing getConfig function
const getConfig = async () => {
    const docRef = doc(db, 'config', '1'); // Get reference to the document with ID '1'
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const config = docSnap.data();
        return config;
    } else {
        console.log('No such document!');
        return { strongLimit: 7, weakLimit: 5 };
    }
}

// New function to update strongLimit and weakLimit
const updateConfigLimits = async (strongLimit, weakLimit) => {
    const docRef = doc(db, 'config', '1'); // Get reference to the document with ID '1'
    
    try {
        await updateDoc(docRef, {
            strongLimit: strongLimit,
            weakLimit: weakLimit
        });
        console.log('Document successfully updated!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
}

export { getConfig, updateConfigLimits };

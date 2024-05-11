import { Alert } from "react-native";
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';

const getAllUsers = async () => {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const activeUsersList = userSnapshot.docs
        .map(doc => ({
            id: doc.id,
            username: doc.data().username,
            password: doc.data().password,
            usertype: doc.data().usertype,
            status: doc.data().status
        }))
        .filter(user => user.status === 'active');

    return activeUsersList;
}

const saveUser = async (sentData) => {
    let formData = {
        username: sentData.username,
        password: sentData.password,
        usertype: sentData.usertype,
        status: 'active',
    };

    try {
        const usersCol = collection(db, 'users');
        await addDoc(usersCol, formData);
        return { stt: 'success', msg: 'User added successfully!', data: [] };
    } catch (error) {
        console.error('Error saving user:', error);
        return { stt: 'error', msg: 'Error saving user. Please try again later.', data: [] };
    }
}

export { getAllUsers, saveUser }
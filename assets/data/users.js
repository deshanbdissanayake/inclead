import { Alert } from "react-native";
import { db } from "../../db/firestore";
import { collection, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore/lite';
import { getAllAsyncData } from "./async_storage";

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
    try {
        
        if(!sentData.username || !sentData.password || !sentData.usertype){
            Alert.alert('Error', 'All fields are required!')
            return
        }

        const res = await getAllAsyncData();
        const userdata = JSON.parse(res.userdata);
        const usersCol = collection(db, 'users');

        const formData = {
            username: sentData.username,
            password: sentData.password,
            usertype: sentData.usertype,
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            status: 'active',
        };

        if (!sentData.id) {
            formData.createdBy = userdata.username;
            formData.createdAt = new Date();
            await addDoc(usersCol, formData);
            return { stt: 'success', msg: 'User added successfully!', data: [] };
        } else {
            const userRef = doc(usersCol, sentData.id);
            await updateDoc(userRef, formData);
            return { stt: 'success', msg: 'User edited successfully!', data: [] };
        }
    } catch (error) {
        console.error('Error saving user:', error);
        return { stt: 'error', msg: 'Error saving user. Please try again later.', data: [] };
    }
}


const deleteUser = async (id) => {
    try {
        if(!id){
            Alert.alert('Error', 'Something went wrong!');
            return;
        }

        let res = await getAllAsyncData();
        let userdata = JSON.parse(res.userdata);
        const usersCol = collection(db, 'users');

        const formData = {
            modifiedBy: userdata.username,
            modifiedAt: new Date(),
            status: 'delete',
        };

        const userRef = doc(usersCol, id);
        await updateDoc(userRef, formData);
        return { stt: 'success', msg: 'User deleted successfully!', data: [] };
      
    } catch (error) {
        console.error('Error deleting user:', error);
        return { stt: 'error', msg: 'Error deleting user. Please try again later.', data: [] };
    }
}

export { getAllUsers, saveUser, deleteUser }
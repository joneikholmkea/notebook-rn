import { StatusBar } from 'expo-status-bar';
import { FlatList, 
  StyleSheet, 
  Text, 
  View, 
  Button,
  Image
  } from 'react-native';


import React, {
  useState
} from 'react';

import {
  collection,
  addDoc,
  query,
  onSnapshot
} from 'firebase/firestore'

import {database, storage} from '../config/firebase'

const ListView = ({navigation, route}) => {  // route.params.xxx

    const chatColl = 'notes';
    const [notes, setNotes] = useState([]);
    const readDB = async () => {
        const collectionRef = collection(database, chatColl);
        const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'));
        // const querySnapshot = await getDocs(q);
        onSnapshot(q, snapshot =>{
            const _notes = [];
            snapshot.forEach(doc => {
                _notes.push({
                ...doc.data(),
                key: doc.id
                });
            });
        // setNotes( prevNotes => {
        //    return {...prevNotes, _notes}
        //  });
        setNotes(_notes);
        });
    }

    const addNote = () => {
        addDoc(collection(database, chatColl), {
            text: "Tuesday note",
            hasImage: false
        });
    }
    const detailView = "DetailView"
    const clickRow = (item) => {
        navigation.navigate(detailView, {note: item})
    }

    
    return (
        <View style={styles.container}>
            <Button title='New Note' onPress={addNote}/>
            <Button title='Load Notes' onPress={readDB}/>
            <View style={styles.imagePreview}>
                <Image  style={styles.image} source={{uri: 'https://reactjs.org/logo-og.png'}}/>
            </View>
            <StatusBar style="auto" />
            <FlatList
                data={notes}
                renderItem={({item}) => 
                <Button style={styles.item} 
                    title={item.text.substring(0,30)} 
                    onPress={() => clickRow(item)}/>  
                }
            />
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      marginTop:100,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      padding: 10,
      fontSize: 11,
      height: 44,
      backgroundColor: "#68c",
      borderColor: "#944"
      
    },
    imagePreview:{
      width:'100%',
      height:150,
      alignItems:'center',
      backgroundColor: "#933"
    }, 
    image:{
      width:'100%',
      height:'100%'
    }
  });


  export default ListView;
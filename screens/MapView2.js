import React, { useState,useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { StyleSheet, View, Alert } from 'react-native'
import {
    doc,
    getDoc
} from 'firebase/firestore'
import {database} from '../config/firebase'

const MapView2 = ({navigation, route}) => {  // route.params.xxx
    const [regionState, setRegionState] = useState({
        latitude: 55.12,
        longitude: 12.0,
        latitudeDelta: 2,
        longitudeDelta: 2,
      })
    const [markerState, setMarkerState] = useState([])
    const onRegionChange = (region) => {
        setRegionState({ region })
    }
        
    if(route.params.notes){
        useEffect(() => {
            for(n of route.params.notes){ // create Marker for each note
                if(n.location){
                    const m = newMarker(n.location.latitude, n.location.longitude, n.key, n.text)
                    m.mynote = n
                    markerState.push(m)
                }
            }
            setMarkerState(markerState)
        }, []);
    }

    const newMarker = (latitude, longitude, key, text) => {
        return(
            <Marker coordinate = {{latitude,longitude}}
            pinColor = {"blue"} 
            title={"Location"}
            description={text}
            key={key}
            identifier={key}
            onPress={onSelectMarker}
            >
        </Marker>
        )
    }

    const detailView = "DetailView"
    const onSelectMarker = async (data) => {
        const id = data.nativeEvent.id
        const note = await getNote(id)
        note.key = id
        navigation.navigate({
            name: detailView,
            params: {note:note},
            merge: false,
        })
    }

    const chatColl = 'notes';
    const getNote = async (id) => {
        const docRef = doc(database, chatColl, id);
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          return docSnap.data()
        } 
      }


    const onCreatePin = (data) => {
        const coordinate = data.nativeEvent.coordinate // store event data for later use in async task.
        const {latitude, longitude} = coordinate
            markerState.push(
            <Marker coordinate = {{latitude,longitude}}
                key={data.timeStamp}
                pinColor = {"blue"} 
                >
            </Marker>)
            setMarkerState(markerState)
            // hack, to force map to update:
            setRegionState({
                        ...regionState,
                        latitude: regionState.latitude
            })
        
        Alert.alert('Set location', 'Set this location to current note?', [
            {
              text: 'Cancel',
              onPress: () => setMarkerState([]),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                navigation.navigate({
                    name: detailView,
                    params: coordinate,
                    merge: true,
                })
            }},
          ])
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map} 
                //provider="google"
                initialRegion={regionState}
                onRegionChange ={onRegionChange}
                onLongPress = {onCreatePin}
        >
        {markerState}  
         </MapView> 
        
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });


  export default MapView2;
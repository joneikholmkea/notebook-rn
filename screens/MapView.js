import React, { useState,useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { StyleSheet, View, Alert } from 'react-native'


const MapView2 = ({navigation, route}) => {  // route.params.xxx
    //console.log("MapView ", route.params)
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
        var markers=[]
        useEffect(() => {

            for(n of route.params.notes){
                const m = newMarker(55, 12)
                m.key = n.key
                console.log(n)
                // markers.push(m)
                markerState.push(m)
            }
            setMarkerState(markerState)
        console.log(markerState)
        // setMarkerState(markers) 
        }, []);
    }

    const detailView = "DetailView"
    const onSelectMarker = (data) => {
        console.log("marker pressd",data.nativeEvent.coordinate)
        navigation.navigate({
            name: detailView,
            params: data.nativeEvent.coordinate,
            merge: true,
        })
    }

    const newMarker = (latitude, longitude) => {
        return(
            <Marker coordinate = {{latitude,longitude}}
            key={1234}
            pinColor = {"blue"} 
            title={"title"}
            description={"description"}
            onPress={onSelectMarker}
            >
        </Marker>
        )
    }


    const onCreatePin = (data) => {
        const coordinate = data.nativeEvent.coordinate
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
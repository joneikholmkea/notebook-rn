import React, { useState, Text } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { StyleSheet, View } from 'react-native'


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

    const detailView = "DetailView"
    const onSelectMarker = (data) => {
        console.log("marker pressd",data.nativeEvent.coordinate)
        navigation.navigate({
            name: detailView,
            params: data.nativeEvent.coordinate,
            merge: true,
        })
    }

    const onCreatePin = (data) => {
        const {latitude, longitude} = data.nativeEvent.coordinate
        markerState.push(
        <Marker coordinate = {{latitude,longitude}}
            key={data.timeStamp}
            pinColor = {"blue"} 
            title={"title"}
            description={"description"}
            onPress={onSelectMarker}
            // onSelect={onSelectMarker}
            >

        </Marker>)
        setMarkerState(markerState)
        // hack, to force map to update
        setRegionState({
                    ...regionState,
                    latitude: regionState.latitude
        })
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
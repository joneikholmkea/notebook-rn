import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, Button, TextInput} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListDemo = () => {

    const [notes, setNotes] = useState([]);
    const items = [
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'}
      ];
    
    const add = () => {
      var s = notes.length + 1
      setNotes([...notes, { key: 'Devin ' + s}]);
    }

  return (
    <View style={styles.container}>
      <Button title='New Note' onPress={add}/>
      <FlatList
        data={notes}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>  }
      />
    </View>
  );
};

export default FlatListDemo;



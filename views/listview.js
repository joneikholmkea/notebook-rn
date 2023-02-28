import { StyleSheet, TextInput, View } from "react-native";
import PrimaryButton2 from "../components/PrimaryButton";


function ShowListView123() {

    return <View style={styles.inputContainer}>
        <TextInput
        //  value="his"
         maxLength={20} 
         keyboardType="number-pad"
         autoCapitalize="none"
         autoCorrect={false}
         editable={true}
         />
        <PrimaryButton2>Try This</PrimaryButton2>
    </View>

}

export default ShowListView123;

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 100,
      marginHorizontal:20,
      borderRadius:8,
      padding: 16,
      backgroundColor: '#e55',
      elevation:4, // android only
      shadowColor: 'black',
      shadowRadius: 10,
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.35
    }
  });
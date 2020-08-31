import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput,ScrollView } from 'react-native';
import ContactList from './ContactList'

export default function App() {
  const [hello,setHello]  = useState('World');
   
  return (
  <ScrollView>
    <View style={styles.viewStyle}>
      <TextInput style={styles.textStyle} 
				placeholder="Say hello to"
				onChangeText={text => setHello(text)}
				defaultValue={hello}/>
	  <Text style={styles.textStyle}>Hello, {hello}</Text>
      <StatusBar style="auto" />
    </View>
	<ContactList/>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	viewStyle: {
		marginTop:50,
		flexDirection:"row",
		backgroundColor:"#fff",
		alignItems: 'center',
		justifyContent: 'center'
	},
	textStyle: {
		fontSize:24,
		color:"red",
		backgroundColor:"#000"
	}
});

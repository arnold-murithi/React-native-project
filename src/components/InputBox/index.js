import { View, Text, StyleSheet, TextInput } from 'react-native'
import {AntDesign} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import { useState } from 'react';
import React from 'react'

const InputBox = () => {
    const  [newMessage, setNewMessage] = useState("")

    const onSend = () =>{
        console.warn("sending....." );
    }
  return (
    <View style={styles.container}>
        <AntDesign name='plus' size={24} color="royalblue"/>
        <TextInput value={newMessage} onChangeText={setNewMessage} style={styles.input}/>
        <MaterialIcons onPress={onSend} style={styles.send} name="send" size={20} color="white"/>
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"whitesmoke",
        padding:5,
        paddingHorizontal:10,
        alignItems:'center'
    },
    input:{
        flex:1,
        backgroundColor:"white",
        padding:5,
        paddingHorizontal:10,
        marginHorizontal:10,

        borderRadius:10,
        borderColor:'lightgrey',
        borderWidth: StyleSheet.hairlineWidth,
    },
    send:{
        backgroundColor:"forestgreen",
        borderRadius:15,
        overflow:"hidden",
    }
})
export default InputBox
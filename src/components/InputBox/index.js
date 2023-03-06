import { View, Text, StyleSheet, TextInput } from 'react-native'
import {AntDesign} from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";
import { useState } from 'react';
import {API, graphqlOperation, Auth} from "aws-amplify"
import { createMessage, updateChatRoom } from '../../graphql/mutations';
import React from 'react'

const InputBox = ({chatroom}) => {
    const  [text, setText] = useState("")

    const onSend = async () =>{
        console.warn("sending.....", text );

        const authUser = await Auth.currentAuthenticatedUser();

        const newMessage = {
          chatroomID:chatroom.id, 
          text, 
          userID: authUser.attributes.sub
        }

        const newMessageData = await API.graphql(graphqlOperation(
          createMessage,{input: newMessage}
        ))
          setText("");
          //set the new message as the last message of the chatroom
          await API.graphql(graphqlOperation(updateChatRoom,{
            input: {
              _version: chatroom._version, 
              chatRoomLastMessageId: newMessageData.data.createMessage.id,
              id: chatroom.id
            }
          }))

    }
  return (
    <View style={styles.container}>
        <AntDesign name='plus' size={24} color="royalblue"/>
        <TextInput 
        value={text} 
        onChangeText={setText} 
        style={styles.input}
        placeholder="Compose your message...."
        />
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
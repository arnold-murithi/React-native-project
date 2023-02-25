import { Platform, Text, View, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import bg from "../../../assets/images/BG.png"
import Message from '../../components/Messages'
import messages from "../../../assets/data/messages.json"
import InputBox from '../../components/InputBox'

const  ChatScreen = () => {

  const route = useRoute();
  const navigation = useNavigation()

  

  useEffect(()=>{
    navigation.setOptions({title:route.params.name})//If you click on a conversation the contact name appears at the top
  //dependency array to keep mount the component every time you navigate to a different conversation
  },[route.params.name]);

    return (
      <KeyboardAvoidingView behaviour={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.ios=="ios" ? '60' : '90'} //specifying the distance betweeen the top of the key board and the chatting space
      style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList data={messages} //flat list is used to display items in a scrollable view
        renderItem ={({item}) =><Message message={item}/>}
        style={styles.list}
        inverted
        />
        <InputBox/>
      </ImageBackground>
      </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    bg:{
        flex:1,
    },
    list:{
        padding:10,
    }
})

export default ChatScreen
import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {API, graphqlOperation, Auth} from 'aws-amplify'
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import {getCommonChatRoomWithUser} from "../../services/ChatRoomService"

const ContactListItem = ({user}) =>{
    const navigation = useNavigation();

    const onPress = async () =>{
        //console.warn("You have pressed")

        //check if we have a new chatroom with the new user
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);

        if (existingChatRoom){
            navigation.navigate('Chat',{id:existingChatRoom.id});
            return;
        }
        
        //create a new chat room
        const newchatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, {input:{}}))
            console.log(newchatRoomData)
            if(!newchatRoomData.data?.createChatRoom){
                console.log("error creating the chatroom")
            }

        const newChatRoom = newchatRoomData.data?.createChatRoom;    
        //add the clicked user to the chatroom
        await API.graphql(graphqlOperation(createUserChatRoom, 
            {
                input:{
                    chatRoomId:newChatRoom.id,
                    userId:user.id
                }}))

        //add the auth user to the chatroom
        const authUser = await Auth.currentAuthenticatedUser()
        await API.graphql(graphqlOperation(createUserChatRoom, 
            {
                input:{
                    chatRoomId:newChatRoom.id, 
                    userId:authUser.attributes.sub
                }}))//sub is the same as the id of the database user
                //the inout object creates a relationship between the chatroon and the database
                
        //navigate to the newly created chatroom
        navigation.navigate('Chat',{id:newChatRoom.id});

    }

    return(
        //THe image and the users name is shown as the list of contacts
            <Pressable onPress={onPress} style={styles.container}>
                <Image source={{uri:user.image}} style={styles.image}/>
                <View style={styles.content}>
                    <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                    <Text numberOfLines={2} style={styles.subTitle}>
                            {user.status}
                        </Text>
                </View>
            </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        alignItems:"stretch",
        marginHorizontal:10,
        marginVertical:5,
        height:70,
        alignItems:'center'

    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:10
    },
    row:{
        flexDirection:"row",
        marginBottom:5,
    },
    content: {
        marginRight: 10,
        flex: 1,
      },
    name:{
        fontWeight:"bold",
        flex:1,
        marginTop:15,
    },
    subTitle: {
        color: "gray",
        alignSelf:"stretch",
      },
});
export default ContactListItem;
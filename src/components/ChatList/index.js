import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect,useState } from "react";
import { Auth } from "aws-amplify";
import { UserAgent } from "amazon-cognito-identity-js";
dayjs.extend(relativeTime);

const ChatList = ({chat}) =>{
    const navigation = useNavigation();
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const fetchUser = async () =>{
            const authUser = await Auth.currentAuthenticatedUser();
        
        //loop through the chat.users.items and find an unauthenticated uset
    const userItem = chat.users.items.find(item => item.user.id !== authUser.attributes.sub);

    setUser(userItem?.user)
    //to check the users in the database
    //console.log(user);
        } 
        fetchUser();   
    },[])

    //console.log(chat);

    return(
            <Pressable onPress={()=> navigation.navigate("Chat",{id:chat.id, name:user?.name})} style={styles.container}>
                <Image source={{uri:user?.image}} style={styles.image}/>
                <View style={styles.content}>
                    <View style={styles.row}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text>{dayjs(chat.LastMessage?.createdAt).fromNow(true)}</Text> 
                    </View>
                    <Text numberOfLines={1} style={styles.subTitle}>{chat.LastMessage?.text}</Text>
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
        height:70

    },
    image:{
        width:60,
        height:60,
        borderRadius:30,
        marginRight:10
    },
    content:{
        flex:1,
        borderBottomColor: "lightgray",
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    row:{
        flexDirection:"row",
        marginBottom:5,
    },
    name:{
        fontWeight:"bold",
        flex:1,
    },
    subTitle:{
        color:"grey",
    },
});
export default ChatList;
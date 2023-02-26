import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ContactListItem = ({user}) =>{
    const navigation = useNavigation();

    return(
        //THe image and the users name is shown as the list of contacts
            <Pressable onPress={()=> navigation.navigate('chat',{id:ChatList.id, name:Chat.user.name})} style={styles.container}>
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
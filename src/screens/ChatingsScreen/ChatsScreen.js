import { FlatList } from 'react-native'
//import chats from '../../../assets/data/chats.json'
import ChatList from '../../components/ChatList';
import {API, graphqlOperation, Auth} from 'aws-amplify'
import { listChatRooms } from './Queries';
import { useEffect, useState } from 'react';


const ChatsScreen = () => {

  const [chatRoom, setChatRoom] = useState([])

  useEffect(() => {

    const fetchChatRooms = async () =>{
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, {id:authUser.attributes.sub})
        );
        //console.log("This is the response")
        setChatRoom(response.data.getUser.ChatRooms.items);
    }
    fetchChatRooms();

  },[])

    return (
      //removed the dummy data i.e the chats and replaced it with the chatRoom
      <FlatList data={chatRoom} 
      renderItem={({item}) => 
      <ChatList chat={item.chatRoom}/>} style={{backgroundColor:"white"}} />
    );
}

export default ChatsScreen;
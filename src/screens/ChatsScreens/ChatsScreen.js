import { FlatList } from 'react-native'
import chats from '../../../assets/data/chats.json'
import ChatList from '../../components/ChatList';


const ChatsScreen = () => {
    return (
      <FlatList data={chats} renderItem={({item}) => <ChatList chat={item}/>} style={{backgroundColor:"white"}} />
    );
}

export default ChatsScreen;
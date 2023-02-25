
import { FlatList } from 'react-native'
import chats from '../../../assets/data/chats.json'
//import ChatList from '../../components/ChatList';
import ContactListItem from '../../components/ContactListItem';

const Contacts = () => {
  return (
    <FlatList data={chats} renderItem={({item}) => <ContactListItem user={item.user}/>} 
    style={{backgroundColor:"white"}} />
  )
}
export default Contacts;
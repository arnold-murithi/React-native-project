import {useState, useEffect} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {listUsers} from "../../graphql/queries";
import { FlatList } from 'react-native'
//import chats from '../../../assets/data/chats.json'
//import ChatList from '../../components/ChatList';
import ContactListItem from '../../components/ContactListItem';

const Contacts = () => {

  const [users, setUsers] = useState([]);

   useEffect(() =>{
    //perform an operation to the autogenerate data
    API.graphql(graphqlOperation(listUsers)).then((result) =>{
      
      setUsers(result.data?.listUsers?.items)
    })
  },[])

  return (
    <FlatList data={users} renderItem={({item}) => <ContactListItem user={item}/>} 
    style={{backgroundColor:"white"}} />
  )
}
export default Contacts;
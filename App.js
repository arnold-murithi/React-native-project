import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigator from './src/navigation';
import { SafeAreaView } from 'react-native';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import { getUser } from './src/graphql/queries';
import {createUser}  from './src/graphql/mutations'
Amplify.configure({...awsconfig, Analytics:{disabled:true}});//the purpose of the object in the function is to disable the default error caused by with authenticator
//immediately after being verified, an error about a promise
const  App = () => {

useEffect(() =>{
  
  const syncUser = async () =>{
    //get the authenticated user
  const authUser = await Auth.currentAuthenticatedUser({
    bypassCache:true,
  })
  console.log(authUser);
  //query to the database using the authenticated user id(sub)
  const userData = await API.graphql(
    graphqlOperation(getUser,{id:authUser.attributes.sub})) //response
    console.log(userData)
  //If there are no users to the database create one else ignore
  if (userData.data.getUser){
    console.log("The user already exists in the database")
    return;
  }

  const newUser={
    id: authUser.attributes.sub,
    name: authUser.attributes.phone_number,
    status: "Hey there, I am using chatapp",
  };

  const newUserResponse = await API.graphql(graphqlOperation
    (createUser, {input:newUser}))
  }

  syncUser();

},[])

  return (
    //safe area view ensures the the keyboard does not appear behind the notch
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/*<ChatsScreen/>*/}
      {/*<ChatScreen/>*/}
      {/*<Message/>*/}
      <Navigator/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    
  },
});
export default withAuthenticator (App);
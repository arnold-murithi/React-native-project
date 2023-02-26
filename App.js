import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import ChatsScreen from './src/screens/ChatsScreens/ChatsScreen';
//import ChatScreen from './src/screens/ChatsScreens/ChatScreen';
//import Message from './src/components/Messages';
import Navigator from './src/navigation';
import { SafeAreaView } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports'
//import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);

const  App = () => {
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
export default App;
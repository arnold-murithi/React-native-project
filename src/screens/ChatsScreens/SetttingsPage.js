import { View, Button } from 'react-native'
import React from 'react'
import { Auth } from 'aws-amplify'
const SetttingsPage = () => {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Button onPress={()=>Auth.signOut()} title="Sign out"/>
    </View>
  )
}

export default SetttingsPage
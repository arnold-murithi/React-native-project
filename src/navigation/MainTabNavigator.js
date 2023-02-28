import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsScreen from "../screens/ChatsScreens/ChatsScreen";
import NotImplementedScreen from "../screens/ChatsScreens/NotImplementedScreen"/*shows a background image for the blank pages such as
 status, calls, camera and settings*/
 import {Ionicons, Entypo} from "@expo/vector-icons"//navigation icons
 import SetttingsPage from "../screens/ChatsScreens/SetttingsPage";
import React from "react"

const Tab = createBottomTabNavigator();//creates navigation betweeen different pages

const MainTabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Status" component={NotImplementedScreen} 
            options={{tabBarIcon:({color,size})=><Ionicons name="logo-whatsapp" 
            size={size} color={color}/>
            }}
            />
            <Tab.Screen name="Calls" component={NotImplementedScreen}
            options={{tabBarIcon:({color,size})=><Ionicons name="call-outline" 
            size={size} color={color}/>
            }}
            />
            <Tab.Screen name="Camera" component={NotImplementedScreen}
            options={{tabBarIcon:({color,size})=><Ionicons name="camera-outline" 
            size={size} color={color}/>
            }}
            />
            <Tab.Screen name="Chats" 
            component={ChatsScreen}
            //optionss takes a function that returns a object
            //navigation parameter
            options={({navigation}) =>({
                tabBarIcon:({color,size})=>(
                <Ionicons name="ios-chatbubbles-sharp" size={size} color={color}/>),

            //creating the top-right corner icon
            headerRight: () => (
                <Entypo 
                  onPress={() => navigation.navigate("Contacts")}
                  name="new-message"
                  size={18}
                  color={"royalblue"}
                  style={{ marginRight: 15 }}
                />
            )
            })}
            />
            
            <Tab.Screen name="Settings" component={SetttingsPage}
            options={{tabBarIcon:({color,size})=><Ionicons name="settings-outline" 
            size={size} color={color}/>
            }}
            />
        </Tab.Navigator>
    )
}
export default MainTabNavigator
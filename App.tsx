import 'react-native-gesture-handler'
//native
import React, { useEffect } from 'react';
import { Linking, Platform, Text } from 'react-native';

//icons
import Icon from 'react-native-vector-icons/Ionicons'

//navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import { UserRealmContext} from './components/Storage/MongoDB';
// import { AppProvider } from '@realm/react';

// const {RealmProvider} = UserRealmContext;    

// //database
// import { AppProvider } from '@realm/react';
const {RealmProvider} = UserRealmContext;     
// import { TravelRealmContext} from './components/Database/MongoDB';

//navigators
const Stack  = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

//screens
import Focus from './screens/Focus';
import Settings from './screens/Settings';


// import Profile from './screens/Settings/Profile';
// import Sign from './screens/Auth/Sign';
import AlarmBreak from './screens/Settings/AlarmBreak';
import AlarmWork from './screens/Settings/AlarmWork';
// import Signup from './screens/Auth/Signup';
import Forget from './screens/Auth/Forget';
import ForgetNew from './screens/Auth/ForgetNew';
import Change from './screens/Settings/Profile/ChangeName';
import Profile from './screens/Settings/Profile';
import Sign from './screens/Auth/Sign';
import Signup from './screens/Auth/Signup';
import { AppProvider } from '@realm/react';
import ChangeName from './screens/Settings/Profile/ChangeName';
import ChangePassword from './screens/Settings/Profile/ChangePassword';
import Subs from './screens/Settings/Profile/Subs';
import SplashScreen from './components/SplashScreen';
import { UserRealmContext } from './components/Storage/MongoDB';
import ChangePasswordChange from './screens/Settings/Profile/ChangePasswordChange';
import Tasks from './screens/Settings/Tasks';

const Tabs = ({route}: { route: any}) => {

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle:{backgroundColor: 'transparent',position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0},
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Focus') {
              return <Icon name='home-outline' size={size} color={
                focused
                  ? 'white'
                  : '#6C6A66'
              } />;
            } 
            else if (route.name === 'Settings') {
              return <Icon name='settings-outline' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
          },
          // tabBarStyle:{backgroundColor: route.name === 'Home' || 'Settings' ? 'white' : 'white'},

        })}
      >
    
    <Tab.Screen  name='Focus' component={Focus}
      options={{
      tabBarLabel: 'Focus', 
      tabBarStyle:{backgroundColor: 'transparent',position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0},
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />
    
    <Tab.Screen  name='Settings' component={Settings}
      options={{
      tabBarStyle:{backgroundColor: '#212121',position: 'absolute'},
      tabBarLabel: 'Settings', 
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />

    
  </Tab.Navigator>
  )
}


const linking = {
  prefixes: [
    /* your linking prefixes */
    'https://resetwill.netlify.app'
  ],
  config: {
    /* configuration for matching screens with paths */
  },
};



function App(): JSX.Element {

  // useEffect(() => {
  //   // Get the deep link used to open the app
  //   const getUrl = async () => {
  //     const universalLink = await Linking.getInitialURL();
  //     //handle universal link
  //   };

  //   getUrl();
  // });

  // const navigation = useNavigation()

  
  // const handleUrl = ({ url }) {
  //   naviga
  // }
  
  // Linking.addEventListener('url', handleUrl)

  return (
    <NavigationContainer  linking={linking} fallback={<Text>Loading...</Text>}>
      <AppProvider id={'willdorolast-jjuhd'}>
      <RealmProvider>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}  />
        <Stack.Screen name='Focus' component={Focus}  />
        <Stack.Screen name='Settings' component={Settings}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Sign' component={Sign} /> 
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Forget' component={Forget} />
        <Stack.Screen name='ForgetNew' component={ForgetNew} />
        <Stack.Screen name='AlarmWork' component={AlarmWork} />
        <Stack.Screen name='Tasks' component={Tasks} />
        <Stack.Screen name='AlarmBreak' component={AlarmBreak} />
        <Stack.Screen name='Subs' component={Subs}/>
        <Stack.Screen name='ChangeName' component={ChangeName}/>
        <Stack.Screen name='ChangePassword' component={ChangePassword}/>
        <Stack.Screen name='ChangePasswordChange' component={ChangePasswordChange}/>
      </Stack.Navigator>
      </RealmProvider>
      </AppProvider>
    </NavigationContainer>
    );
}


export default App;


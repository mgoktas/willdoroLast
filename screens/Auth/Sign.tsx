import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../components/Functions';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { HeaderButton, Space, styles } from '../../components/Utilities';
import { BackButton, BottomText, CustomButton, Input, InputEm, InputPw, LineSeperator, Logo, TextButton } from '../../components/Utilities2';

const Sign = ({navigation}) => {
    
    // const app = useApp()
    const myemail = 'mgoktas@gmail.com'
    const mypass = '123456'
    const [email, setEmail] = useState(myemail)
    const [password, setPassword] = useState(mypass)

//     const login = async () => {
//         const credentials = Realm.Credentials.emailPassword(
//             email,
//             password
//           )
//           try{
//             await app.logIn(credentials);
//             await AsyncStorage.setItem('isLogged', 'true')

//             navigation.navigate('Settings', {email: email})
//           }catch (err) {
//               Alert.alert('Security Error',err.message)
//           }

// }
    
    return (
    <SafeAreaView style={styles.pageSign}>
        <HeaderButton onPress={() => {navigation.goBack()}} />
        <Space space={24}/>
        <Logo />
        <Space space={24}/>
        <Input icon={'mail'} autoCap={'none'}  placeholder={'Email address'}/>
        <LineSeperator/>
        <Input isPassword={true} autoCap={'none'} icon={'lock-closed'} placeholder={'Password'}/>
        <LineSeperator/>
        <Space space={4}/>
        <TextButton onPress={() => {navigation.navigate('Forget')}} txt={'Forget password?'}/>
        <CustomButton title={'Sign In'} bck={'white'}/> 
        <BottomText txt={'or'}/>
        <CustomButton onPress={() => {navigation.navigate('Signup')}} title={'Sign Up'} bck={'black'} color={'gray'}/>
    </SafeAreaView>
)}

export default Sign;

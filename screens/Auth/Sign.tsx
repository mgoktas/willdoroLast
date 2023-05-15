import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../components/Functions/Functions';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { BottomText, Input, Logo, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';

const Sign = ({navigation}) => {
    
    const app = useApp()
    const myemail = 'mgoktashk@gmail.com'
    const mypass = '123456'
    const [email, setEmail] = useState(myemail)
    const [password, setPassword] = useState(mypass)

    const login = async () => {
        const credentials = Realm.Credentials.emailPassword(
            email,
            password
          )
          try {
            await app.logIn(credentials);
            await AsyncStorage.setItem('isLogged', 'true')
            await AsyncStorage.removeItem('isSet')
            await navigation.navigate('Focus')
          } catch (err) {
              Alert.alert('Security Error', err.message)
          }

}
    
    return (
    <SafeAreaView style={styles.pageSign}>
        <Header 
        onPress={() => {
                navigation.goBack()
            }} title={'Sign In'} color={1} opacity={1} isSubtle={undefined} isBorderOk={true}  />
            
            <Space space={24}/>
        <Logo />
        <Space space={24}/>
        <Input onChangeText={(txt) => {setEmail(txt)}} icon={'mail'} autoCap={'none'}  placeholder={'Email address'}/>
        <Space space={6}/>
        <Input onChangeText={(txt) => {setPassword(txt)}} isPassword={true} autoCap={'none'} icon={'lock-closed'} placeholder={'Password'}/>
        <Space space={4}/>
        <TextButton onPress={() => {navigation.navigate('Forget')}} txt={'Forget password?'}/>
        <AppleButton onPress={login} txt={'Sign In'} isPrimary={true} color={'#007AFF'}/>
        <BottomText txt={'or'}/>
        <AppleButton onPress={() => {navigation.navigate('Signup')}} txt={'Sign Up'} isPrimary={false} color={'#007AFF'}/>
    </SafeAreaView>
)}

export default Sign;

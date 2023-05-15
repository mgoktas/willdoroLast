import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { Input, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';
import uuid from 'react-native-uuid';

const Signup = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const app = useApp();
    // const {useRealm, useQuery, useObject} = UserRealmContext;
    const realm = useRealm()
    // const MyObject = useObject(User, 1);
    
    const createAccount = async () => {

        if(name.split(' ').length < 2){ 
            Alert.alert('Security Error','Name should include your surname')
            return
        }

        if(password != password2){
            Alert.alert('Security Error','Password do not match')
            return
        }
        
        try {
            await app.emailPasswordAuth.registerUser({email, password});
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('name', name)
            await AsyncStorage.setItem('password', password)
            await realm.write(() => {
                realm.create('User', {
                    _id: email,
                    useremail: email,
                    username: name,
                    userpassword: password,
                });
            });
            await navigation.navigate('Sign')
          } 
          catch (err) {
            Alert.alert('Security Error',err.message)
          }
    }

    return (
    <SafeAreaView style={styles.pageSign}>
        <Header
        onPress={() => {
                navigation.goBack()
            }} title={'Sign Up'} color={1} opacity={1} isSubtle={undefined} isBorderOk={true}  />
                    <Space space={24}/>
        
        <Input autoCap={'words'} icon={'person'} placeholder={'Name'} onChangeText={(txt) => setName(txt)}/>
        <Space space={12}/>
        
        <Input autoCap={'none'} icon={'mail'} placeholder={'Email Address'} onChangeText={(txt) => setEmail(txt)}/>
        <Space space={12}/>
        
        <Input icon={'lock-closed'} placeholder={'Password'} isPassword={true} onChangeText={(txt) => setPassword(txt)}/>
        <Space space={12}/>
        
        <Input icon={'lock-closed'} placeholder={'Password Again'} isPassword={true} onChangeText={(txt) => setPassword2(txt)}/>
        <Space space={3}/>
        
        <TextButton margin={10} onPress={() => {navigation.goBack()}} txt={'Already registered?'}/>
        
        <AppleButton onPress={createAccount} txt={'Sign Up'} isPrimary={true} color={'#007AFF'}/>
   
    </SafeAreaView>
    )
}

export default Signup;

// import { useApp } from '@realm/react';
// import React, { useState } from 'react';
// import { Alert, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
// import { HeaderButton, Space, styles } from '../../components/Utilities';
// import { BackButton, BottomText, CustomButton, Input, InputEm, InputPr, InputPw, InputPwAgain, LineSeperator, Logo, TextButton } from '../../components/Utilities2';

// const Signup = ({navigation}) => {

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [password2, setPassword2] = useState('')

//     const app = useApp();
//     const {useRealm, useQuery, useObject} = UserRealmContext;
//     const realm = useRealm()
//     const MyObject = useObject(User, 1);
    
//     const createAccount = async () => {

//         if(name.split(' ').length < 2){ 
//             Alert.alert('Security Error','Name should include your surname')
//             return
//         }

//         if(password != password2){
//             Alert.alert('Security Error','Password do not match')
//             return
//         }
        
//         try {
//             await app.emailPasswordAuth.registerUser({email, password});
//             realm.write(() => {
//                 MyObject.username! = name;
//             });
//             navigation.navigate('Sign')
//           } 
//           catch (err) {
//             Alert.alert('Security Error',err.message)
//           }
//     }


//     return (
//     <SafeAreaView style={styles.pageSign}>
//         <HeaderButton onPress={() => {navigation.goBack()}} />
//         <Space space={24}/>
        
        
//         <Input autoCap={'words'} icon={'person'} placeholder={'Name'} onChangeText={(txt) => setName(txt)}/>
//         <LineSeperator/>
//         <Space space={12}/>
        
//         <Input autoCap={'none'} icon={'mail'} placeholder={'Email Address'} onChangeText={(txt) => setEmail(txt)}/>
//         <LineSeperator/>
//         <Space space={12}/>
        
//         <Input icon={'lock-closed'} placeholder={'Password'} isPassword={true} onChangeText={(txt) => setPassword(txt)}/>
//         <LineSeperator/>
//         <Space space={12}/>
        
//         <Input icon={'lock-closed'} placeholder={'Password Again'} isPassword={true} onChangeText={(txt) => setPassword2(txt)}/>
//         <LineSeperator/>
//         <Space space={3}/>
        
        
//         <TextButton margin={10} onPress={() => {navigation.goBack()}} txt={'Already registered?'}/>
        
//         <CustomButton onPress={createAccount} title={'Sign Up'} bck={'white'}/>
   
//     </SafeAreaView>
//     )
// }

// export default Signup;

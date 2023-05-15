// import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { BackButton, BottomText, CustomButton, CustomButtonForget, Input, InputEm, InputPw, LineSeperator, Logo, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';

const Forget = ({navigation}) => {
    // const app = useApp();
    const [email, setEmail] = useState('')

    // const resetPassword = async () => {
    //     try{
    //         await app.emailPasswordAuth.sendResetPasswordEmail({ email });
    //     } catch (err){
    //         Alert.alert(err)
    //     }
    // }

    return (
    <SafeAreaView style={styles.pageSign}>
        <Header
        onPress={() => {
                navigation.goBack()
            }} 
            title={'Forget My Password'} color={1} opacity={1} isSubtle={undefined} isBorderOk={true}  />
        <Space space={24}/>        
        <Logo />
        <Space space={24}/>
        <Input autoCap={'none'} icon={'mail'} placeholder={'Email address'} isPassword={false} onChangeText={(txt: any) => setEmail(txt)}/>
        <Space space={4}/>
        <AppleButton txt={'Send Email'} isPrimary={true} color={'#007AFF'}/>
        
    </SafeAreaView>
)}

export default Forget;

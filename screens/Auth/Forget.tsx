// import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderButton, Space, styles } from '../../components/Utilities';
import { BackButton, BottomText, CustomButton, CustomButtonForget, Input, InputEm, InputPw, LineSeperator, Logo, TextButton } from '../../components/Utilities2';

const Forget = ({navigation}) => {
    const app = useApp();
    const [email, setEmail] = useState('')

    const resetPassword = async () => {
        try{
            await app.emailPasswordAuth.sendResetPasswordEmail({ email });
        } catch (err){
            Alert.alert(err)
        }
    }

    return (
    <SafeAreaView style={styles.pageSign}>
        <HeaderButton onPress={() => {navigation.goBack()}} />
        <Logo />
        <Space space={24}/>
        <Input autoCap={'none'} icon={'mail'} placeholder={'Email address'} isPassword={false} onChangeText={(txt: any) => setEmail(txt)}/>
        <LineSeperator/>
        <Space space={4}/>
        <CustomButtonForget autoCap={false} onPress={resetPassword} sent={true} title={'Send Email'} bck={'white'}/> 
        
    </SafeAreaView>
)}

export default Forget;

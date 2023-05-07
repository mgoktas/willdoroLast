import React from 'react';
import { Text, View } from 'react-native';
import { Space, styles } from '../../components/Utilities';
import { BackButton, BottomText, CustomButton, CustomButtonForget, Input, InputEm, InputPw, InputPwAgainNew, LineSeperator, Logo, TextButton } from '../../components/Utilities2';

const ForgetNew = ({navigation}) => (
    <View style={styles.pageSign}>
        <Space space={24}/>
        <Logo />
        <Space space={24}/>
        <Input icon={'lock-closed'} placeholder={'New Password'}/>
        <LineSeperator/>
        <Input icon={'lock-closed'} placeholder={'New Password'}/>
        <LineSeperator/>
        <Space space={4}/>
        <CustomButtonForget onPress={() => {navigation.navigate('Focus')}} sent={true} title={'Set New Password'} bck={'white'}/> 
    </View>
);

export default ForgetNew;

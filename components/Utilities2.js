import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Ionicons'
import { horizontalScale, verticalScale } from "./Metrics";
import { SCREEN_WIDTH } from "./Utilities";

export const BackButton = ({onPress}) => {
    return (
        <SafeAreaView style={styles.backButton}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.backButtonText}>
                    X
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export const BackButtonAbsolute = ({onPress}) => {
    return (
        <SafeAreaView style={styles.backButtonAbs}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.backButtonTextAbs}>
                    X
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export const Logo = () => {
    return (
        <View style={styles.logo}>
            <Image source={require('../components/images/icon/1024.png')} style={styles.logoImage}></Image>
        </View>
    )
}

export const Input = ({onChangeText, icon, placeholder, isPassword, autoCap}) => {
    return (
        <View>
        <View style={styles.inputBox}> 
            <Icon name={icon} style={styles.icon} size={32}/>
            <TextInput autoCapitalize={autoCap} secureTextEntry={isPassword} onChangeText={onChangeText} placeholder={placeholder}  placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const InputPr = ({onChangeText}) => {
    return (
        <View>
        <View style={styles.inputBox}> 
            <Icon name='person' style={styles.icon} size={32}/>
            <TextInput onChangeText={onChangeText} placeholder={"Name"}  placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const InputEm = (title, icon) => {
    return (
        <View>
        <View style={styles.inputBox}> 
            <Icon name='mail' style={styles.icon} size={32}/>
            <TextInput autoCapitalize='none'  placeholder={"Email Address"}  placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const InputPw = (title, icon, isPassword) => {
    return (
        <View>
        <View style={styles.inputBox}> 
            <Icon name='lock-closed' style={styles.icon} size={32}/>
            <TextInput autoCapitalize='none' secureTextEntry={true} placeholder={"Password"} placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const InputPwAgainNew = (title, icon, isPassword) => {
    return (
        <View>
        <View style={styles.inputBox}> 
            <Icon name='lock-closed' style={styles.icon} size={32}/>
            <TextInput autoCapitalize='none' secureTextEntry={true} placeholder={"New Password"} placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const InputPwAgain = (title, icon, isPassword) => {
    return (
<View>
        <View style={styles.inputBox}> 
            <Icon name='lock-closed' style={styles.icon} size={32}/>
            <TextInput autoCapitalize='none' secureTextEntry={true} placeholder={"Password Again"} placeholderTextColor={'gray'} style={styles.textInput}>
                
            </TextInput>
        </View>
        </View>
    )
}

export const CustomButton = ({
    title, onPress, bck, color
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtnCst, {backgroundColor : bck, borderWidth: 2}]} onPress={onPress}>
        <Text style={[styles.textCst, {color: color}]}>
           {title}
        </Text>
    </TouchableOpacity>
)}

export const CustomButtonForget = ({
    title, onPress, bck, color, sent
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtnCst, {backgroundColor : bck, borderWidth: 2}]} onPress={onPress}>
        <Text style={[styles.textCst, {color: color}]}>
           {title}
        </Text>
    </TouchableOpacity>
)}

export const TextButton = ({txt, onPress, margin}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.txtBtmCnt, {marginVertical: margin}]}>
            <Text style={styles.txtBtm}>
                {txt}
            </Text>
        </TouchableOpacity>
    )
}

export const BottomText = ({txt}) => {
    return (
        <View style={styles.txtBtmCnt}>
            <Text style={styles.txtBtm}>
                {txt}
            </Text>
        </View>
    )
}

export const LineSeperator = () => {
    return (
    <View style={styles.seperator}>
    </View>
    )}

const styles = StyleSheet.create({
    backButton : {
        marginLeft: 30,
    },
    backButtonText : {
        fontSize: 24,
        opacity: 1,
        color: '#766E6E'
    },
    backButtonAbs : {
        marginLeft: 30,
        position: 'absolute',
        top: 10,
    },
    backButtonTextAbs : {
        fontSize: 20,
        opacity: .4
    },
    logo : {
        width: horizontalScale(100),
        height: horizontalScale(100),
        backgroundColor: 'black',
        opacity: .7,
        alignSelf: 'center',
        borderRadius: 40,
    },
    logoImage : {
        width: horizontalScale(100),
        height: horizontalScale(100),
        backgroundColor: 'black',
        opacity: .7,
        alignSelf: 'center',
        borderRadius: 40,
    },
    seperator : {
        borderBottomWidth: .6,
        width: SCREEN_WIDTH * .95,
        borderBottomColor: 'white',
        alignSelf: 'flex-end',
        marginVertical:2

    },
    seperatorPr : {
        borderBottomWidth: .2,
        width: SCREEN_WIDTH * .95,
        alignSelf: 'flex-end',
        borderBottomColor: 'white'
    },
    inputBox: {
        height: 60,
        backgroundColor: '#212121',
        flexDirection: 'row',
    },
    icon : {
        width: '10%',
        alignSelf: 'center',
        margin: 10
    },
    textInput : {
        opacity: .7,
        fontSize: 20,
        color: 'white'
    },
    btnCtnCst : {
        marginHorizontal: horizontalScale(40),
        height: 50,
        justifyContent: 'center',
        borderRadius: 30,
        marginVertical: verticalScale(10),
    },
    btnCtnCstLg : {
        marginHorizontal: horizontalScale(40),
        height: verticalScale(60),
        borderRadius: 6,
        // marginTop: verticalScale(10),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCst : {
        alignSelf: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 500
    },
    txtBtmCnt: {
        justifyContent: 'center',
    },
    txtBtm : {
        alignSelf: 'center',
        color: 'white',
        opacity: .7,
        fontWeight: 400,
        fontSize: 12
    },
})
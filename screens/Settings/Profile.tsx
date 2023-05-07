import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { Header, HeaderButton, ProfileWText, SCREEN_HEIGHT, SettingsCell, SettingsCellProfile, SettingsCellwText, Space, styles } from '../../components/Utilities';
import { AvatarLogo } from '../../components/Utilities3';

const Profile = ({route, navigation}) => {

    const { onSelectName, selectedName, email } = route.params;
    const [newName, setNewName] = useState(selectedName)

    // const {useRealm, useQuery, useObject} = UserRealmContext;
    // const realm = useRealm()
    // const MyObject = useObject(User, 1);
    // const userAccount = useQuery(User)

    // // const app = useApp()

    // const logout = async () => {

    //     try {
    //         await app.currentUser?.logOut();
    //         await AsyncStorage.setItem('isLogged', 'false')
    //         console.log('succesfully logged out!')
    //         navigation.navigate('Focus')
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // }

    // const deleteAccount = async () => {

    //         realm.write(() => {
    //           realm.delete(userAccount);
    //     });

    //     try{
    //         await app.deleteUser(app.currentUser);
    //         await AsyncStorage.setItem('isLogged', 'false')
    //         await navigation.navigate('Focus')
    //     }catch(err){
    //         console.log(err)
    //     }

    // }

    return  (
    <SafeAreaView style={styles.pageProfile}>
        
        <Header onPress={() => {
            navigation.goBack()
            }} title={'Profile'} color={'gray'}  />
            
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>

                    <View>
                        <AvatarLogo fullname={selectedName} email={email} avatar={'#A0A6BE'}/>
                        <ProfileWText onPress={() => {navigation.navigate('Change', { onSelectName: onSelectName, name: selectedName, changeName: setNewName })}} iconArrow={'angle-right'} value={newName} title={'Name'} isFirst={true} isLast={true} />
                    </View>

                    <View>
                        <SettingsCellProfile isLogout={true} isLogged={true} isFirst={true} onPress={logout} isLogout={true} title={'Sign out'} center={true}/>
                        <SettingsCellProfile isLogout={true}  isLogged={true} isLast={true} onPress={deleteAccount} isLogout={true} title={'Delete My Account'} />
                        <Space space={SCREEN_HEIGHT/40}/>
                    </View>

            </ScrollView>
        

    </SafeAreaView>
)}

export default Profile;

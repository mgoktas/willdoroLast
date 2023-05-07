import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreakCell, Header, styles } from '../../components/Utilities';
import { BackButton, BackButtonAbsolute } from '../../components/Utilities2';
import { Vibration, Platform } from "react-native";
import { SetupPlayer, Vibrate } from '../../components/Functions';
import TrackPlayer, { State } from 'react-native-track-player';
import { songs, track1 } from '../../components/Data';
import { FlashList } from '@shopify/flash-list';

const AlarmBreak = ({navigation, route}) => {

    const { onSelectBreak, selectedBreak } = route.params;
    const [selectedId, setSelectedId] = useState(selectedBreak)
    
    useEffect( () => {
            TrackPlayer.setupPlayer().then(() => {
                TrackPlayer.add(songs)
            })
            },[]
      );

    const ring = async (index) => {

        await TrackPlayer.add(songs)
        const state = await TrackPlayer.getState();
        
        if (state === State.Playing) {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            if(trackIndex == index){
                TrackPlayer.pause();
            }
            else{
            await TrackPlayer.skip(index)
        }
        } else {
            await TrackPlayer.skip(index)
            await TrackPlayer.play();
        }
        }
    

    


    return (
        <SafeAreaView style={styles.pageBreak}>
            <Header isSubtle={true} title={'Break Alarm'}/>
            <BackButtonAbsolute onPress={async () => {
                await TrackPlayer.reset()
                onSelectBreak(selectedId)
                navigation.goBack()
            }} />
            <FlashList renderItem={({ item }) => {
                return <BreakCell isSelected={selectedId == item.id ? true : false} title={`Buzz ${item.id}`} onPress={() => {ring(item.id-1); setSelectedId(item.id)}}  />;
            }}
            estimatedItemSize={10}
            data={songs}
            extraData={selectedId}
            >
            </FlashList> 
        </SafeAreaView>
    )}

export default AlarmBreak;

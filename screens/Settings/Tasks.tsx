import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreakCell, Header, LineBwCell, SettingsCellwText, styles, TaskInput } from '../../components/Utilities/Utilities';
import { FlashList } from '@shopify/flash-list';

const Tasks = ({navigation, route}) => {

    const { isDarkModeOn } = route.params;

    
    const items = [
        {id: 1},
        {id: 2},
        {id: 3},
    ]

    return (
        <SafeAreaView style={[styles.pageBreak, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            <Header 
            isWriting={true}
            isOnChange={true}
            isOnTask={true}
            isDarkModeOn={isDarkModeOn}
            onPress={async () => {
                await navigation.goBack()
            }}
            isSubtle={false} title={'Tasks'}/>
            <TaskInput isOnTask={true} />
            <FlashList renderItem={({ item }) => {
                return  <>
                    <SettingsCellwText 
                    isDarkModeOn={true}
                    // onPress={() => {ring(item.id-1); setSelectedId(item.id)}}
                    title={`Task ${item.id}`}
                    icon={undefined} 
                    iconArrow={undefined} 
                    backColor={undefined} 
                    style={undefined} 
                    isFirst={item.id == 1 ? true : false} 
                    isLast={item.id == items.length ? true : false} 
                    // isSelected={selectedId == item.id ? true : false}
                    />
    
                <View style={{opacity: item.id == 5 ? 0 : 1}}>
                            <LineBwCell />
                </View>

                </>



                return <BreakCell isSelected={selectedId == item.id ? true : false} title={`Buzz ${item.id}`} onPress={() => {ring(item.id-1); setSelectedId(item.id)}}  />;
            }}
            estimatedItemSize={10}
            data={items}
            // extraData={selectedId}
            >
            </FlashList> 
        </SafeAreaView>
    )}

export default Tasks;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusButton, FocusButtonPause, FocusSlide, styles } from '../components/Utilities';
import { getRemaining, Storage } from '../components/Functions';
import { examples } from '../components/Data';
import { FlatList, ImageBackground } from 'react-native';
import { CaretIcon } from '../components/Utilities3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Focus = ({navigation}) => {

    //hooks
    const [remainingSecs, setRemainingSecs] = useState(1500);
    const count = useRef(1500)
    const [count2, setCount2] = useState(1500)
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);
    const [selectedId, setSelectedId] = useState();
    const [imageSource, setImageSource] = useState(require('../components/images/monk.jpeg'))
    const [visibleItems, setVisibleItems] = useState([]);
    const [info, setInfo] = useState()
    const [isLogged, setIsLogged] = useState(false)

    const [doroData, setDoroData] = useState(examples)
    const [doroIndex, setDoroIndex] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
      );

    const getData = async () => {

        const value = await AsyncStorage.getItem('doroindex')
        if(value != null){

        const value2 = parseInt(value)
        setDoroIndex(value)
        let oneElement;
        for (let i= 0; i<examples.length; i++) {
            if (examples[i].index == value2 ) {
                oneElement = examples[i];
            }
        }
        let uniqueChars = [...new Set([oneElement])];
        setDoroData(uniqueChars)
    }

    }

    const getUser = async () => {
        const user = await AsyncStorage.getItem('isLogged')
        // if(user == 'true'){
        //     setIsLogged(true)
        // }
    }

    useEffect(() => {
        getData()
        getUser()
    })

    useEffect(() => {
        let interval = null;
        if (isActive) {
        interval = setInterval(() => {
            setRemainingSecs(remainingSecs => remainingSecs - 1);
        }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);

    //functions
    Toggle = () => {
        if(isActive2){
            setIsActive3(true)
        }
        else if(isActive)
        {
            setIsActive2(true)
            setIsActive(!isActive)
        }
        else {
        setIsActive(!isActive)
        }
    }

    ToggleStop = () => {
        setRemainingSecs(1500)
        setIsActive(false);
    }

    Reset = () => {
        setIsActive(false);
        setIsActive2(false);
        setIsActive3(false);
        setRemainingSecs(count2);
    }

    Continue = () => {
        setIsActive(true)
        setIsActive2(false);
        setIsActive3(false);
    }


    const getData2 = useCallback(async () => {
        ref2?.current?.getData()
        setTimeout(writeData, 100)
    }, [])
    
    const writeData = () => {
        setInfo(ref2?.current?.info2[0])
    }

    const viewabilityConfig = useRef({
        // minimumViewTime: 100,
        itemVisiblePercentThreshold: 90,
    }).current;

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setVisibleItems(viewableItems.map(({ item }) => setImageSource(item.source)));
        setVisibleItems(viewableItems.map(({ item }) => setRemainingSecs(1500)));
        setVisibleItems(viewableItems.map(({ item }) => setCount2(1500)));
    }, []);

    const configref = useRef(viewabilityConfig)
    const itemschangedref = useRef(onViewableItemsChanged)
    
  return (
    <SafeAreaView style={styles.pageFocus}>
        <CaretIcon onPress={() => {navigation.navigate('Settings', {isLogged: isLogged, getDoro: getData})}}/>
        <ImageBackground style={styles.pageFocusImage} source={examples[0].source}>

        <FocusSlide
            subMin={() => {if(remainingSecs>500) { setRemainingSecs(remainingSecs - 300); setCount2(count2-300)}}}
            addMin={() => {if(remainingSecs<3600) { setRemainingSecs(remainingSecs + 300); setCount2(count2+300)}}}
            onPress={() => {alert(doroData[0].name); Reset()}}
            minute={mins} 
            seconds = {secs}
            mode={doroData[0].name}
          />
        
        <FocusButton onPress={Toggle} isAction2={isActive} isAction={isActive2}/>
        <FocusButtonPause onPress1={Continue} onPress2={Reset} isAction2={isActive2} isAction={isActive3}/>
        </ImageBackground>
    </SafeAreaView>
)}

export default Focus;

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusButton, FocusButtonPause, FocusButtonTask, FocusSlide, FocusSlideTask, SCREEN_HEIGHT, SessionsLeft, SettingsCellwText, styles, TaskHead, TaskInput, TaskTitle } from '../components/Utilities/Utilities';
import { DefaultPickerSessionNumber, getRemaining, Storage } from '../components/Functions/Functions';
import { examples } from '../components/Storage/Data';
import { FlatList, ImageBackground, Vibration, View } from 'react-native';
import { AppleButton, AppleButtonWithHighlight, CaretIcon, CaretIcon2 } from '../components/Utilities/Utilities3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Doro, Task, User, UserRealmContext } from '../components/Storage/MongoDB';
import uuid from 'react-native-uuid';
import { ring, vibrateFor } from '../components/Functions/Functions2';
import { TasksSheet, TasksSheetRefProps } from '../components/OfferSheet';

const Focus = ({navigation}) => {
    //hooks
    
    const [remainingLongBreakSecs, setRemainingLongBreakSecs] = useState(900);
    const [remainingInSecs, setRemainingInSecs] = useState(1500);
    const [remainingSecs, setRemainingSecs] = useState(1500);
    const [remainingBreakSecs, setRemainingBreakSecs] = useState(300);
    const [alarmWork, setAlarmWork] = useState(0);
    const [alarmBreak, setAlarmBreak] = useState(0);
    const [longSession, setLongSession] = useState();
    const [hasTaskSessionEnded, setHasTaskSessionEnded] = useState(false)
    const [isChoosingTheTask, setIsChoosingTheTask] = useState(false)
    const [taskChosen, setTaskChosen] = useState(false)
    const [isWritingTaskInput, setIsWritingTaskInput] = useState(false)
    const [taskName, setTaskName] = useState('')
    const [isTaskModeOn, setIsTaskModeOn] = useState(true)
    const [isDoroModeOn, setIsDoroModeOn] = useState(false)
    const [didClickWrite, setDidClickWrite] = useState(false)
    const [didClick, setDidClick] = useState(false)
    
    const [valueInt, setValueInt] = useState(3)
    const [value, setValue] = useState(3)
    const [isVibrate, setIsVibrate] = useState(false)
    const [autoNext, setAutoNext] = useState(false)
    const [autoBreak, setAutoBreak] = useState(false)
    const [consecutiveSession, setConsecutiveSession] = useState(1);
    const [doroId, setDoroId] = useState('')           
    const [taskId, setTaskId] = useState('')           
    const [isLoading, setIsLoading] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const [isBreakOn, setIsBreakOn] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);
    const initialImage = require('../components/images/study/study.jpg')
    const [imageSource, setImageSource] = useState(require('../components/images/study/study.jpg'))
    const [isLogged, setIsLogged] = useState(false)
    const [doroData, setDoroData] = useState(examples)
    const [doroIndex, setDoroIndex] = useState(1)
    const {useRealm, useQuery, useObject} = UserRealmContext;
    const realm = useRealm()
    const myDoro = useObject(Doro, doroId);
    const myTask = useObject(Task, taskId);
    const myTsask = useQuery(Task);
 
    console.log(myTsask)

    const resetAll = () => {
        setRemainingSecs(remainingInSecs)
        setHasTaskSessionEnded(false)
        setIsChoosingTheTask(false)
        setTaskChosen(false)
        setIsWritingTaskInput(false)
        setTaskName('')
        // setIsTaskModeOn(true)
        setIsDoroModeOn(false)
        setValue(3)
        setValueInt(3)
        setHasStarted(false);
        setIsBreakOn(false);
        setIsActive2(false);
        setIsActive3(false);
        setImageSource(require('../components/images/study/study.jpg'))
    }
  
    useEffect(() => {
        const getUsers = async () => {
        await getData()
     };

     getUsers()


 }, [])

    useEffect(() => {
    let interval = null;
    if (hasStarted) {

        if(value == 0 && remainingSecs == 0 && isTaskModeOn){
            taskSessionEnd()
            return
        }

        else if(isBreakOn && remainingSecs == 0 && isTaskModeOn){
            endTaskBreak()
            vibrateFor(isVibrate, 2)
        }        
        
        else if(isBreakOn && remainingSecs == 0){
            endBreak()
            newDoro()
            vibrateFor(isVibrate, 2)
        }
        
        else if(remainingSecs == 0 && isTaskModeOn){
            endTaskSession()
            vibrateFor(isVibrate, 5)
        }
        
        else if(hasStarted && remainingSecs == 0){
            endSession()
            vibrateFor(isVibrate, 5)
        } 
        

    interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 300);
    }, 1000);
    } else if (!hasStarted && remainingSecs !== 0) {
    clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [hasStarted, remainingSecs]);

    useFocusEffect(
        React.useCallback(() => {
            getData()
            resetAll()
        }, [])
    );
    

    const getData = async () => {

    await AsyncStorage.getItem('pomodoroLength').then(async(token) => {
        // console.log(token)
        setRemainingSecs(parseInt(token * 60))
        setRemainingInSecs(parseInt(token * 60))
    });

    await AsyncStorage.getItem('breakShortLength').then(async(token) => {
        // console.log(token)
        setRemainingBreakSecs(parseInt(token * 60))
    });

    await AsyncStorage.getItem('defaultDoroInt').then(async(token) => {
        // console.log(token)
        setDoroIndex(parseInt(token))
    });

    await AsyncStorage.getItem('breakAfterLongLength').then(async(token) => {
        // console.log(token)
        setLongSession(parseInt(token))
    });

    await AsyncStorage.getItem('breakLongLength').then(async(token) => {
        setRemainingLongBreakSecs(parseInt(token) * 60)
    });

    await AsyncStorage.getItem('vibrate').then(async(token) => {
        setIsVibrate(JSON.parse(token))
    });

    await AsyncStorage.getItem('alarmWork').then(async(token) => {
        setAlarmWork(JSON.parse(token))
    });

    await AsyncStorage.getItem('alarmBreak').then(async(token) => {
        setAlarmBreak(JSON.parse(token))
    });

    await AsyncStorage.getItem('autoBreak').then(async(token) => {
        setAutoBreak(JSON.parse(token))
    });

    await AsyncStorage.getItem('autoNext').then(async(token) => {
        setAutoNext(JSON.parse(token))
    });

    await AsyncStorage.getItem('isLogged').then(async(token) => {
        setIsLogged(JSON.parse(token))
        setIsLoading(false)
    });
    

    }

    const newDoro = async () => {

        const newId = uuid.v4()
        setDoroId(newId) 

        const timestamp = new Date().getTime();
        const endtime = timestamp + remainingSecs * 1000

        
        realm.write(() => {
            realm.create('Doro', {
                _id: newId, 
                startDate: new Date(),
                startTime: new Date(),
                endTime: new Date(endtime),
                length: remainingSecs / 60,
                breakLength: remainingBreakSecs / 60
            });
        });
        
    }

    const newTask = async () => {

        const newId = uuid.v4()
        setTaskId(newId) 

        const timestamp = new Date().getTime();
        const endtime = timestamp + remainingSecs * 1000
        
        realm.write(() => {
            realm.create('Task', {
                _id: newId, 
                taskName: taskName,
                startDate: new Date(),
                startTime: new Date(),
                endTime: new Date(endtime),
                length: remainingSecs / 60,
                breakLength: remainingBreakSecs / 60,
                sessionLength: valueInt,
            });
        });
        
    }
    
    const endSession = () => {

            if (myDoro) {
                realm.write(() => {
                    myDoro.didFinish = true;
             });
            }

                    ring(alarmBreak, 3)
                    setRemainingSecs(consecutiveSession == (longSession) ? remainingLongBreakSecs : remainingBreakSecs)
                    setHasStarted(false)
                    setImageSource(examples[doroIndex - 1].source)
                    setIsBreakOn(true)
                    setSessionEnded(true)

                    if(autoBreak){
            
                        setHasStarted(true)

        }


    }

    const endTaskSession = () => {

                if (myTask && value == 1) {
                    realm.write(() => {
                        myTask.didFinish = true;
                    });
                }

                setValue(value - 1)
                ring(alarmBreak, 3)
                setRemainingSecs(consecutiveSession == (valueInt) && valueInt != 1 ? remainingLongBreakSecs : remainingBreakSecs)
                setHasStarted(false)
                setImageSource(examples[doroIndex - 1].source)
                setIsBreakOn(true)
                setSessionEnded(true)
   

                if(autoBreak){
                    setHasStarted(true)    
                }


}

    const endBreak = () => {
        ring(alarmWork, 3)
        setRemainingSecs(remainingInSecs)
        setImageSource(initialImage)
        setConsecutiveSession(consecutiveSession + 1)
        setIsBreakOn(false)

        setHasStarted(false)

        if(autoNext) {
            setHasStarted(true)
        }


        if (myDoro) {
            realm.write(() => {
                myDoro.didFinish = true;
                myDoro.didBreakEnd = true;
            });
        }

    }

    const endTaskBreak = () => {
        
        ring(alarmWork, 3)
        setRemainingSecs(remainingInSecs)
        setImageSource(initialImage)
        setConsecutiveSession(consecutiveSession + 1)
        setIsBreakOn(false)
        setHasStarted(false)

        if(autoNext) {
            setHasStarted(true)
        }

    }

    const taskSessionEnd = () => {
        setHasTaskSessionEnded(true)
        setIsTaskModeOn(false)
        setRemainingSecs(remainingInSecs)
        setIsBreakOn(false)
        setImageSource(initialImage)
        setHasStarted(false)
    }    

    const Toggle = () => {

        // if(isBreakOn){
        //     setHasStarted(true)
        // }

        if(isActive2){

            setIsActive3(true)

        }
        else if(hasStarted)
        {

            setIsActive2(true)
            setHasStarted(false)

        }

        // else if(isBreakOn && !hasStarted) {
        //     setHasStarted(true)
        // }

        else if(hasStarted == false && isTaskModeOn){

            newTask()
            setHasStarted(true)

        }

        else if(hasStarted == false) {

            newDoro()
            setHasStarted(true)

        }
    }

    const Reset = () => {

        setHasStarted(false);
        setIsActive2(false);
        setIsActive3(false);
        setRemainingSecs(remainingInSecs);
        setDidClick(false)
        setDidClickWrite(false)

        resetAll()
        
    }

    const Continue = () => {
        setHasStarted(true)
        setIsActive2(false);
        setIsActive3(false);
    }

    const openTaskMode = () => {

        if(!isTaskModeOn){
            setIsTaskModeOn(true)
        } else {
            setIsTaskModeOn(false)
        }

    }

    const chooseTask = () => {
        setIsChoosingTheTask(true) 
    }

    const setClickedFirst = (value) => {
        
        setDidClick(true)

        if(value == 0) {
        }

        if(value == 1) {
            setDidClickWrite(true)
        }
        
    }

    const ref = useRef<TasksSheetRefProps>(null)
    const openSheet = useCallback(() => {
        ref?.current?.scrollTo(-400)
    }, [])

    const clickedToPlay = (item) => {
        setClickedFirst(1)
        setTaskName(item)
        setIsChoosingTheTask(true) 
    }    
   
    if(isTaskModeOn && !isLoading){
    
        return <SafeAreaView style={[styles.pageFocus]}>
            <CaretIcon isTaskModeOn={isTaskModeOn} isLeft={true} icon={'angle-down'} onPress={() => {navigation.navigate('Settings', {isLogged: isLogged})}}/>
            <CaretIcon2 isDoroModeOn={isDoroModeOn} onPress={() => {openTaskMode(); if(isTaskModeOn){resetAll()}}}/>
            <ImageBackground style={styles.pageFocusImage} source={imageSource}>

            <SessionsLeft hasTaskSessionEnded={hasTaskSessionEnded} taskChosen={taskChosen} value={value}/>
            <TaskHead isChoosingTheTask={isChoosingTheTask} txt={'How many sessions for?'}/>
            <DefaultPickerSessionNumber onPress={() => {setTaskChosen(true); setIsChoosingTheTask(false)}} onValueChange={(val) => {setValue(val); setValueInt(val)}} value={value} isChoosingTheTask={isChoosingTheTask} values={['1','2','3','4','5','6','7','8','9',"10"]} />
            <TaskInput didClickWrite={didClick ? true : didClickWrite}  isChoosingTheTask={isChoosingTheTask} taskChosen={taskChosen} onPress={() => {chooseTask()}} isWritingTaskInput={isWritingTaskInput} onChangeText={(txt) => {if(txt){setIsWritingTaskInput(true); setTaskName(txt)}else{setIsWritingTaskInput(false)}}} title={'Choose A Task'}/>
            <View style={{position: 'absolute', top: SCREEN_HEIGHT / 3, flexDirection: 'column', width: '100%', zIndex: 100}}>
                <AppleButtonWithHighlight onPress={() => {openSheet()}} color={'#f48c06'} isPrimary={false} txt={'Choose a Task'} didClick={didClick}/>
                <AppleButtonWithHighlight onPress={() => {setClickedFirst(1)}} isOnTask={true} color={'#f48c06'} isPrimary={false} didClick={didClick} txt={'Write Down A Task'}/>
            </View>
            
            <View style={{display: didClickWrite ? 'flex' : 'none'}}>
            <FocusSlideTask 

isChoosingTheTask={isChoosingTheTask}
taskChosen={taskChosen}
hide={true}
// subMin={() => {if(remainingSecs>500) { setRemainingSecs(remainingSecs - 300); setCount2(count2-300)}}}
// addMin={() => {if(remainingSecs<3600) { setRemainingSecs(remainingSecs + 300); setCount2(count2+300)}}}
onPress={() => {alert(doroData[0].name); Reset()}}
minute={mins} 
seconds = {secs}
mode={doroData[0].name}
/> 
            </View>
                       
            
            <TaskTitle taskChosen={taskChosen} txt={taskName}/>            

            <FocusButtonTask taskChosen={taskChosen} txt={'Start Task'} onPress={Toggle} isAction2={hasStarted} isAction={isActive2}/>
            <FocusButtonPause onPress1={Continue} onPress2={Reset} isAction2={isActive2} isAction={isActive3}/>
            <TasksSheet clickedToPlay={clickedToPlay} ref={ref}/>
            </ImageBackground>
        </SafeAreaView>
    
        }

    return  <SafeAreaView style={styles.pageFocus}>
        <CaretIcon isTaskModeOn={isTaskModeOn} isLeft={true} icon={'angle-down'} onPress={() => {navigation.navigate('Settings', {isLogged: isLogged})}}/>
        <CaretIcon2 isDoroModeOn={isDoroModeOn} onPress={() => {setIsTaskModeOn(true); Reset();}}/>
        <ImageBackground style={styles.pageFocusImage} source={imageSource}>
                    <FocusSlide
                    hide={true}
            // subMin={() => {if(remainingSecs>500) { setRemainingSecs(remainingSecs - 300); setCount2(count2-300)}}}
            // addMin={() => {if(remainingSecs<3600) { setRemainingSecs(remainingSecs + 300); setCount2(count2+300)}}}
            onPress={() => {alert(doroData[0].name); Reset()}}
            minute={mins} 
            seconds = {secs}
            mode={doroData[0].name}
            />
        <FocusButton isLoading={isLoading} onPress={Toggle} isAction2={hasStarted} isAction={isActive2}/>
        <FocusButtonPause onPress1={Continue} onPress2={() => {Reset(); resetAll()}} isAction2={isActive2} isAction={isActive3}/>
        </ImageBackground>
        <TasksSheet ref={ref}/>
    </SafeAreaView>
      
    
}


export default Focus;



    // const viewabilityConfig = useRef({
    //     // minimumViewTime: 100,
    //     itemVisiblePercentThreshold: 90,
    // }).current;
    // const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    //     setVisibleItems(viewableItems.map(({ item }) => setImageSource(item.source)));
    //     setVisibleItems(viewableItems.map(({ item }) => setRemainingSecs(1500)));
    //     setVisibleItems(viewableItems.map(({ item }) => setCount2(1500)));
    // }, []);

    // const configref = useRef(viewabilityConfig)
    // const itemschangedref = useRef(onViewableItemsChanged)

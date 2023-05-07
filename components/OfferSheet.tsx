import React, {useState, useCallback, useEffect, useRef, useImperativeHandle, createContext, Component} from 'react';
import { Text, View, Dimensions, StyleSheet, TextInput, Image, Share, Linking, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import {  GestureDetector } from 'react-native-gesture-handler';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { horizontalScale, verticalScale, moderateScale, verticalScaleAnti } from '../components/Metrics';
import { useFocusEffect } from '@react-navigation/native';
import { SheetTitle, BackButton, FeaturesBox, SubsBox, AppleButton, BottomTexts } from './Utilities3';
import { Space } from './Utilities';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')


export type OfferSheetRefProps = {
    scrollTo: (destination: number)=> void
}

interface ChildProps {
    closeSheet: Function
}


export const OfferSheet = React.forwardRef<OfferSheetRefProps, BottomSheetProps>( (props: ChildProps, ref) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2

  const [isActiveSub1, setIsActiveSub1] = useState(false)
  const [isActiveSub2, setIsActiveSub2] = useState(false)
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 2000 })
  }, [])
  
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    translateY.value = event.translationY + context.value.y
    translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
  })
  .onEnd(() => {
    if(translateY.value > -SCREEN_HEIGHT ) {
      scrollTo(60)
    } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
      scrollTo(MAX_TRANSLATE_Y)
    }
  })
  
  const initialValue = '';
  const reference = useRef(initialValue);
  const reference2 = useRef(initialValue);
  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
        [40, 15],
        Extrapolate.CLAMP
        )
        
        return {
          borderRadius,
          transform: [{translateY: translateY.value}]
        }
      })   
      
      

      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column', height: SCREEN_HEIGHT / 2}}>
                <BackButton onPress={() => {scrollTo(60); props.closeSheet()}} />
                <SheetTitle />
                <Space space={5}/>
                <FeaturesBox />
                <SubsBox txt1={'Annual'} txt2={'SAVE 31%'} txt21={'$8.33 / month'} txt31={'Billed as one payment of $99.99'} isActive={isActiveSub1} onPress={() => {setIsActiveSub1(true); setIsActiveSub2(false)}} isThirdRowDisabled={false}/>
                <SubsBox txt1={'Monthly'} txt21={'$9.99 / month'} isActive={isActiveSub2} onPress={() => {setIsActiveSub2(true); setIsActiveSub1(false)}} isBorderDisabled={true} isThirdRowDisabled={true}/>
                <AppleButton txt={'Start Free Trial (7 Days)'} isPrimary={true}/>
                <AppleButton txt={'Decline Free Trial'} isPrimary={false}/>
                <BottomTexts />
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        )
      })

      const styles =  StyleSheet.create({
    bottomSheet : {
      width: '96%', 
      backgroundColor: 'black', 
      alignSelf: 'center', 
      opacity: 3,
      zIndex: 2,
      position: 'absolute',
      height: SCREEN_HEIGHT,
    },
      })
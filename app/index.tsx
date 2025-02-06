import React, { useEffect, useRef } from 'react';
import { Text, View, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

type RootStackParamList = {
  Welcome: undefined;
  HouseDetail: undefined;
  StudentLogIn: undefined;
  StudentSignUp: undefined;
  
};

const Index: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Animated values for opacity and scale
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value: 0
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Initial scale value: 0.5

  useEffect(() => {
    // Create a repeating animation for the logo that loops 5 times
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1, // Fade in
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1, // Scale up
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.5, // Scale down
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),
      { iterations: 2 } // Repeat 5 times
    ).start(() => {
      // Navigate to Welcome screen after the animation completes
      navigation.navigate('Welcome');
      navigation.navigate('StudentSignUp');
     
    });

  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
      <Animated.Image 
        source={require('../assets/images/logo.png')}
        style={[
          tw`absolute w-100 h-100`,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <View style={tw`absolute bottom-2`}>
        <Text style={tw`text-orange-500 text-3xl font-semibold`}>
          PEKUGARA
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

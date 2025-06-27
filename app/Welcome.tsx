import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import { auth } from './Components/firebaseConfig';


type RootStackParamList = {
  HouseDetail: undefined;
  LandLordLogIn: undefined;
  StudentLogIn: undefined;
  Main: undefined;
};

const Welcome: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  useEffect(() => {
    if (auth.currentUser) {
      navigation.navigate('Main');
    }
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 `}>
      <Image 
        source={require('../assets/images/house5.png')} 
        style={tw`absolute w-full `} 
      />
      <View style={tw`flex-1 mx-2 mt-60`}>
        <Text style={tw`text-white font-bold text-2xl`}>PEKUGARA</Text>
        <Text style={tw`text-white font-bold text-2xl mt-2`}>
          STUDENTS OFF CAMPUS
        </Text>
        <Text style={tw`text-white font-bold text-2xl mt-2`}>ACCOMMODATION</Text>
        <Text style={tw`text-gray-300 mt-12`}>Find the right accommodation</Text>
        <Text style={tw`text-gray-400`}>at just a tap</Text>
        <View style={tw`w-full bg-[#ff914d] rounded-xl absolute bottom-2` }  onTouchEnd={() => navigation.navigate('StudentLogIn')}>
          <Text style={tw`text-center text-white font-semibold text-xl py-2`} >Explore</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

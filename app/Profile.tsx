import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Profile = () => (
  <SafeAreaView style={tw`flex-1 bg-white items-center justify-center`}>
    <Image source={require('../assets/images/logo.png')} style={tw`w-24 h-24 rounded-full mb-4`} />
    <Text style={tw`text-2xl font-bold mb-2`}>Student Name</Text>
    <Text style={tw`text-lg text-gray-500 mb-1`}>student@email.com</Text>
    <Text style={tw`text-base text-gray-400`}>Profile details and settings will appear here.</Text>
  </SafeAreaView>
);

export default Profile; 
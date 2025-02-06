import React from 'react'
import { Text } from 'react-native'
import tw from 'twrnc'
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LandlordHeader() {
  return (
    <View>
    <View style={tw`flex-row justify-between mb-5 items-center`}>
    <Ionicons name="menu-outline" size={24} color="black" />
    <Text style={tw`text-lg font-bold`}>Dashboard</Text>
    <Ionicons name="notifications" size={24} color="black" />
</View>
</View>
  )
}

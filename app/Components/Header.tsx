import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

type RootStackParamList = {
    StudentLogIn: undefined;
  };
const Header: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex flex-row items-center justify-between py-3 `}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={tw`text-lg font-bold text-black`}>{title}</Text>

      {/* Settings Button */}
      <TouchableOpacity style={tw`w-10 h-10 rounded-full flex justify-center items-center border border-gray-200`}>
              <Ionicons name="notifications" size={24} color="orange" />
            </TouchableOpacity>

            
    </View>
  );
};

export default Header;

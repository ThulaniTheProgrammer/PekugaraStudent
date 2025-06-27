import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

type RootStackParamList = {
    StudentLogIn: undefined;
    Profile: undefined;
    AboutUs: undefined;
    Settings: undefined;
    Privacy: undefined;
};
const MainHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={tw`flex flex-row items-center justify-between py-3 `}>
      {/* Menu Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`w-10 mx-2 h-10 rounded-full flex justify-center items-center border border-gray-200`}>
      <Ionicons name="person" size={24} color="orange" />
      </TouchableOpacity>

      {/* Title */}
  
      {/* Settings Button */}
      <TouchableOpacity >
      
      </TouchableOpacity>

      {/* Modal Drawer */}
      {modalVisible && (
        <View style={[tw`absolute top-14 left-0 w-60 bg-white rounded-xl shadow-lg p-4 z-50`, { elevation: 10 }]}> 
          <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Profile'); }} style={tw`py-3 `}><Text style={tw`text-lg`}>Profile</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('AboutUs'); }} style={tw`py-3 `}><Text style={tw`text-lg`}>About Us</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Settings'); }} style={tw`py-3 `}><Text style={tw`text-lg`}>Settings</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Privacy'); }} style={tw`py-3`}><Text style={tw`text-lg`}>Privacy</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`mt-4`}><Text style={tw`text-center text-red-500`}>Close</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainHeader;
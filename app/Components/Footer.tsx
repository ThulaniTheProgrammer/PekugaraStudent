import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Plant: undefined;
  Marketplace: undefined;
  HouseDetail: undefined;
  Mzari: { filter: string };
};

export default function Footer() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={tw` `}>
      <View style={tw`absolute bottom-0 left-0 right-0 z-50`}>
        <View
          style={tw`flex-row justify-between items-center bg-white h-16 px-4  shadow-md`}
        >
          <TouchableOpacity style={tw`items-center`} onPress={() => navigation.navigate("Mzari", { filter: "Town" })}>
            <AntDesign name="home" size={24} color="orange" />
            <Text style={tw`text-orange-600 text-xs mt-1`}>Town</Text>
          </TouchableOpacity>

   
          <TouchableOpacity
            style={tw`items-center`}
            onPress={() => navigation.navigate("Mzari", { filter: "Mzari" })}
          >
            <Feather name="bar-chart" size={24} color="orange" />
            <Text style={tw`text-orange-600 text-xs mt-1`}>Mzari</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`items-center`}
            onPress={() => navigation.navigate("Mzari", { filter: "Coldstream" })}
          >
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color="orange"
            />
            <Text style={tw`text-orange-600 text-xs mt-1 text-center`}>
              Coldstream
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

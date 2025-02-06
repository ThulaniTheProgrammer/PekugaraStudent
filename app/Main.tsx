import React, { useRef, useEffect, useState } from "react";
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const accommodations = [
  { id: 1, name: "Mzari", price: 100, distance: "4000m", image: require("../assets/images/house.jpg") },
  { id: 2, name: "Mapako", price: 80, distance: "5000m", image: require("../assets/images/house2.jpg") },
  { id: 3, name: "Coldstream", price: 40, distance: "2000m", image: require("../assets/images/house5.png") },
  { id: 4, name: "White City", price: 50, distance: "5000m", image: require("../assets/images/mainhouse.png") },
];

const areas = ["Mzari", "Mapako", "Orange Groove", "Town", "Chitambo", "Katanda", "Coldstream", "White City"];

const Main: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchQuery, setSearchQuery] = useState("");
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    let scrollValue = 0;
    let scroller = setInterval(() => {
      scrollValue += 1;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: scrollValue, animated: true });
      }
      if (scrollValue > screenWidth * (areas.length - 2)) {
        scrollValue = 0;
        scrollViewRef.current?.scrollTo({ x: scrollValue, animated: false });
      }
    }, 50);
    return () => clearInterval(scroller);
  }, []);

  const filteredAccommodations = accommodations.filter((acc) =>
    acc.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    acc.distance.includes(searchQuery.trim()) ||
    acc.price.toString().includes(searchQuery.trim())
  );

  return (
    <ScrollView>
      <SafeAreaView style={tw`py-4`}>
        <View style={tw`mx-2 mt-4`}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-black font-bold text-2xl`}>Get Your Favorite</Text>
              <Text style={tw`text-black font-bold text-2xl`}>Accommodation!</Text>
            </View>
            <TouchableOpacity style={tw`w-10 h-10 rounded-full flex justify-center items-center border border-gray-200`}>
              <Ionicons name="notifications" size={24} color="orange" />
            </TouchableOpacity>
          </View>

          <View style={tw`mt-10 w-full rounded-xl h-10 bg-gray-200 flex flex-row items-center px-2`}>
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
              style={tw`ml-2 flex-1`}
              placeholder="Search by name, price, or distance"
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FontAwesome name="exchange" size={20} color="orange" style={tw`border-l pl-4 border-gray-400`} />
          </View>

          <View style={tw`mt-10 px-2 py-4 bg-[#F28E1D] w-full h-40 rounded-xl`}>
            <Text style={tw`text-white text-xl`}>Book Accommodation</Text>
            <Text style={tw`text-white text-xl`}>At Just A Tap</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Mzari")}>
              <Text style={tw`bg-[#303030] mt-8 w-40 text-center py-2 rounded-xl font-semibold text-4 text-white`}>View All Houses</Text>
            </TouchableOpacity>
            <Image source={require("../assets/images/house5.png")} style={tw`absolute right-0 rounded-l-10 mt-8 w-30 h-32`} />
          </View>

          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} style={tw`mt-4`}>
            <View style={tw`flex flex-row`}>
              {areas.map((area, index) => (
                <View key={index} style={tw`rounded-xl ml-2 w-30 flex items-center h-24 bg-gray-200`}>
                  <Image source={require("../assets/images/mainhouse.png")} style={tw`mt-8 w-24 h-10`} />
                  <Text style={tw`text-3 text-orange-900 font-bold pt-1`}>{area}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text style={tw`text-black text-xl pt-6`}>Recommended for you</Text>
          {filteredAccommodations.length > 0 ? (
            <View style={tw`mt-0 flex flex-wrap flex-row`}>
              {filteredAccommodations.map((acc) => (
                <TouchableOpacity key={acc.id} style={tw`flex px-2 w-1/2`} onPress={() => navigation.navigate("HouseDetail", { house: acc })}>
                  <Image source={acc.image} style={tw`rounded-xl mt-4 w-full h-45`} />
                  <Text style={tw`text-black font-semibold text-xl pt-1`}>{acc.name}</Text>
                  <Text style={tw`text-black text-3 font-2`}>{acc.distance} to Campus</Text>
                  <Text style={tw`text-black font-semibold text-3 pt-1`}>${acc.price}/month</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={tw`text-center text-gray-500 mt-4`}>No accommodations found</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Main;

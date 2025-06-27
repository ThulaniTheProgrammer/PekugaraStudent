import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { createClient } from "@supabase/supabase-js";
import MainHeader from "./Components/Header";
import Footer from "./Components/Footer";


const supabaseUrl = "https://aqlztcsukugmsztrrkau.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbHp0Y3N1a3VnbXN6dHJya2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzQyMTgsImV4cCI6MjA1MzU1MDIxOH0.jjefq42swAHHFCfAjE66gDniK4fyJaYOl5iDNBfzmcc";
const supabase = createClient(supabaseUrl, supabaseKey);

const Main: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedHouses, setRecommendedHouses] = useState<any[]>([]);
  const footerAnim = useRef(new Animated.Value(100)).current; // Initially hidden

  useEffect(() => {
    const fetchRecommendedHouses = async () => {
      const { data, error } = await supabase
        .from("House")
        .select("id, name, distance, price, Image");
      if (error) {
        console.error("Error fetching recommended houses:", error);
      } else {
        setRecommendedHouses(data);
      }
    };
    fetchRecommendedHouses();
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Slide up on scroll down
    if (offsetY > 10) {
      Animated.timing(footerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const filteredHouses = recommendedHouses.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    house.distance.includes(searchQuery.trim()) ||
    house.price.toString().includes(searchQuery.trim())
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SafeAreaView style={tw`pb-4 bg-white h-full`}>
          <MainHeader title="Home" />

          <View style={tw`mx-2 mt-6`}>
            <Text style={tw`text-black font-bold text-4xl mb-[-8]`}>
              Get Your Favorite
            </Text>
            <Text style={tw`text-black font-bold text-2xl`}>
              Accommodation!
            </Text>

            <View style={tw`mt-10 w-full rounded-xl h-10 bg-gray-200 flex flex-row items-center px-2`}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                style={tw`ml-2 flex-1`}
                placeholder="Search by name, price, or distance"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FontAwesome
                name="exchange"
                size={20}
                color="orange"
                style={tw`border-l pl-4 border-gray-400`}
              />
            </View>

            <View style={tw`mt-10 px-2 py-4 bg-orange-600 w-full h-40 rounded-xl`}>
              <Text style={tw`text-white text-xl`}>Book Accommodation</Text>
              <Text style={tw`text-white text-xl`}>At Just A Tap</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Mzari")}>
                <Text style={tw`bg-[#303030] mt-8 w-40 text-center py-2 rounded-xl font-semibold text-4 text-white`}>
                  View All Houses
                </Text>
              </TouchableOpacity>
              <Image
                source={require("../assets/images/house5.png")}
                style={tw`absolute right-0 rounded-l-10 mt-8 w-30 h-32`}
              />
            </View>

            <Text style={tw`text-black font-thick text-2xl pt-8 pb-2`}>
              Recommended Houses
            </Text>
            {filteredHouses.length > 0 ? (
              <View style={tw`mt-0 flex flex-wrap flex-row`}>
                {filteredHouses.map((house) => (
                  <TouchableOpacity
                    key={house.id}
                    style={tw`flex px-2 w-1/2`}
                    onPress={() =>
                      navigation.navigate("HouseDetail", { house })
                    }
                  >
                    <Image
                      source={{
                        uri: house.Image || "https://via.placeholder.com/150",
                      }}
                      style={tw`rounded-xl mt-4 w-full h-45`}
                    />
                    <Text style={tw`text-black text-lg pt-1`}>{house.name}</Text>
                    <Text style={tw`text-gray-700 text-3 font-2 mb-[-6]`}>
                      {house.distance} to Campus
                    </Text>
                    <Text style={tw`text-black font-semibold italic text-3 pt-1`}>
                      {house.price}/month
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={tw`text-center text-gray-500 mt-4`}>
                Make sure your network is available
              </Text>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>

      {/* ✅ Animated Footer */}
      <Animated.View
        style={[
          tw`absolute left-0 right-0 bottom-0`,
          {
            transform: [{ translateY: footerAnim }],
          },
        ]}
      >
        <Footer />
      </Animated.View>
    </View>
  );
};

export default Main;

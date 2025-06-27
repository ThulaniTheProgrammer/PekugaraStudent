import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { createClient } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import {  Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
const supabaseUrl = "https://aqlztcsukugmsztrrkau.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbHp0Y3N1a3VnbXN6dHJya2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzQyMTgsImV4cCI6MjA1MzU1MDIxOH0.jjefq42swAHHFCfAjE66gDniK4fyJaYOl5iDNBfzmcc";
const supabase = createClient(supabaseUrl, supabaseKey);

const { width } = Dimensions.get("window");

const features = [
  { name: "WiFi", icon: <Ionicons name="wifi" size={24} color="orange" />, available: true },
  { name: "TV", icon: <FontAwesome name="tv" size={24} color="orange" />, available: false },
  { name: "Beds", icon: <FontAwesome name="bed" size={24} color="orange" />, available: true },
  { name: "Solar", icon: <MaterialCommunityIcons name="solar-power" size={24} color="orange" />, available: true },
  { name: "Stove", icon: <MaterialCommunityIcons name="stove" size={24} color="orange" />, available: false },
  { name: "Fridge", icon: <FontAwesome name="snowflake-o" size={24} color="orange" />, available: true },
];

const HouseDetail = () => {
  const route = useRoute();
  const { house } = route.params;
  const [landlordPhone, setLandlordPhone] = useState("Not available");
  const [address, setAddress] = useState("Address not available");
  const [images, setImages] = useState(house.Image ? [house.Image] : []);
  const [description, setDescription] = useState("No description available.");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      if (!house?.id) {
        console.error("Error: house.id is undefined");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("House")
          .select("landlordPhone, address, Description, Image, Image1, Image2, Image3")
          .eq("id", house.id)
          .single();

        if (!error && data) {
          setLandlordPhone(data.landlordPhone || "Not available");
          setAddress(data.address || "Address not available");
          setDescription(data.Description || "No description available.");
          setImages([data.Image, data.Image1, data.Image2, data.Image3].filter(Boolean));
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchHouseDetails();
  }, [house?.id]);

  return (
    <ScrollView>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        {images.length > 0 ? (
          <Carousel
            loop
            width={width}
            height={400}
            autoPlay
            data={images}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={tw`w-full h-full rounded-xl`} />
            )}
          />
        ) : (
          <Image source={{ uri: house.Image }} style={tw`w-full h-96 rounded`} />
        )}

        {/* Carousel Pagination */}
        <View style={tw`absolute bottom-5 left-0 right-0 flex-row justify-center`}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                tw`w-3 h-3 mx-1 rounded-full`,
                index === currentIndex ? tw`bg-blue-500` : tw`bg-gray-400`,
              ]}
            />
          ))}
        </View>
        <View style={tw`px-4 bg-orange-50 pt-4 rounded-xl mt-[-20px] pb-10`}>
          <Text style={tw`text-black font- text-2xl`}>{house.name} </Text>

          <Text style={tw`text-black font-light text-xl`}>{house.price}/month</Text>
          <Text style={tw`text-gray-600 text-sm`}>{house.distance} to Campus</Text>
        </View>
        <View style={tw`px-4 bg-white pt-1 rounded-xl mt-[-20px] pb-10`}>
        

          <Text style={tw`text-xl my-3 font-sans`}>Available House Facilities</Text>

          <View style={tw`flex-row justify-between `}>{features.slice(3, 6).map((feature, index) => (
            <View key={index}>{feature.icon}<Text>{feature.name}</Text></View>
          ))}</View>

          {landlordPhone && (
            <View style={tw`mt-5 flex-row items-center bg-gray-200 p-4 rounded-xl`}>
              <Image source={{ uri: house.Image }} style={tw`w-16 h-16 rounded-full`} />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-lg font-bold`}>Landlord</Text>
                <Text style={tw`text-gray-600`}>{landlordPhone}</Text>
              </View>
              {landlordPhone !== "Not available" && (
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${landlordPhone}`)}>
                  <FontAwesome name="phone" size={30} color="black" />
                </TouchableOpacity>
              )}
            </View>
          )}

          <Text style={tw`text-xl my-4 font-sans`}>Description</Text>
          <Text style={tw`text-gray-500`}>{description}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HouseDetail;

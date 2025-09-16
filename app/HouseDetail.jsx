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
  { name: "WiFi", icon: <Ionicons name="wifi" size={22} color="#f59e0b" />, available: true },
  { name: "TV", icon: <FontAwesome name="tv" size={22} color="#f59e0b" />, available: true },
  { name: "Bed", icon: <FontAwesome name="bed" size={22} color="#f59e0b" />, available: true },
  { name: "Solar", icon: <MaterialCommunityIcons name="solar-power" size={22} color="#f59e0b" />, available: false },
  { name: "Stove", icon: <MaterialCommunityIcons name="stove" size={22} color="#f59e0b" />, available: true },
  { name: "Fridge", icon: <FontAwesome name="snowflake-o" size={22} color="#f59e0b" />, available: true },
  { name: "Parking", icon: <MaterialCommunityIcons name="car-parking-lights" size={22} color="#f59e0b" />, available: true },
  { name: "Security", icon: <MaterialCommunityIcons name="shield-home" size={22} color="#f59e0b" />, available: true },
  { name: "Hot Water", icon: <MaterialCommunityIcons name="water-boiler" size={22} color="#f59e0b" />, available: false },
  { name: "Study Desk", icon: <MaterialCommunityIcons name="desk" size={22} color="#f59e0b" />, available: true },
  { name: "Wardrobe", icon: <MaterialCommunityIcons name="wardrobe" size={22} color="#f59e0b" />, available: true },
  { name: "Laundry", icon: <MaterialCommunityIcons name="washing-machine" size={22} color="#f59e0b" />, available: false },
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
          <View>
            <Carousel
              loop
              width={width}
              height={400}
              autoPlay
              data={images}
              scrollAnimationDuration={1800}
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={tw`w-full h-full`} />
              )}
            />
            <View style={[tw`absolute bottom-0 left-0 right-0 h-28`, { backgroundColor: "rgba(0,0,0,0.45)" }]} />
          </View>
        ) : (
          <Image source={{ uri: house.Image }} style={tw`w-full h-96`} />
        )}

        {/* Carousel Pagination */}
        <View style={tw`absolute bottom-5 left-0 right-0 flex-row justify-center`}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                tw`mx-1 rounded-full`,
                { width: 8, height: 8, backgroundColor: index === currentIndex ? "#F4C84B" : "#d1d5db" },
              ]}
            />
          ))}
        </View>

        <View style={tw`px-4 bg-white pt-5 rounded-t-3xl mt-[-24px] pb-6 shadow`}>
          <View style={tw`flex-row items-start justify-between`}>
            <View style={tw`flex-1 pr-3`}>
              <Text style={tw`text-black font-bold text-2xl`}>{house.name}</Text>
              <Text style={tw`text-gray-600 mt-1`}>{address}</Text>
              <View style={tw`flex-row mt-2`}>
                <View style={tw`px-3 py-1 bg-orange-100 rounded-full mr-2`}>
                  <Text style={tw`text-orange-600 text-xs`}>{house.distance} to Campus</Text>
                </View>
              </View>
            </View>
            <View style={[tw`px-3 py-2 rounded-xl`, { backgroundColor: "#D4AF37" }]}>
              <Text style={tw`text-black font-semibold`}>{house.price}/month</Text>
            </View>
          </View>
        </View>
        <View style={tw`px-4 bg-white pt-1 rounded-xl mt-[-20px] pb-10`}>
        

          <Text style={tw`text-xl my-3 font-sans`}>Available House Facilities</Text>

          <View style={tw`flex-row flex-wrap -mx-1 mt-1`}>
            {features.map((feature, index) => {
              const isAvailable = feature.available;
              const borderColor = isAvailable ? "#10B981" : "#EF4444";
              const badgeBg = isAvailable ? "#ECFDF5" : "#FEF2F2";
              const badgeIcon = isAvailable ? (
                <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              ) : (
                <Ionicons name="close-circle" size={18} color="#EF4444" />
              );
              return (
                <View key={index} style={tw`w-1/2 px-1 py-1`}> 
                  <View style={[tw`rounded-2xl p-3 flex-row items-center`, { borderWidth: 1, borderColor, backgroundColor: "#ffffff" }]}> 
                    <View style={tw`w-10 h-10 rounded-xl items-center justify-center mr-3`}>
                      {feature.icon}
                    </View>
                    <View style={tw`flex-1`}> 
                      <Text style={tw`text-sm text-black`}>{feature.name}</Text>
                    </View>
                    <View style={[tw`rounded-full px-2 py-1 items-center justify-center` , { backgroundColor: badgeBg }]}> 
                      {badgeIcon}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={tw`mt-3 flex-row items-center`}>
            <View style={[tw`rounded-full p-1 mr-2`, { backgroundColor: "#ECFDF5" }]}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </View>
            <Text style={tw`text-gray-600 mr-4 text-xs`}>Available</Text>
            <View style={[tw`rounded-full p-1 mr-2`, { backgroundColor: "#FEF2F2" }]}>
              <Ionicons name="close-circle" size={16} color="#EF4444" />
            </View>
            <Text style={tw`text-gray-600 text-xs`}>Unavailable</Text>
          </View>

          {landlordPhone && (
            <View style={tw`mt-6 p-4 rounded-2xl bg-gray-50`}> 
              <View style={tw`flex-row items-center`}>
                <Image source={{ uri: house.Image }} style={tw`w-14 h-14 rounded-full`} />
                <View style={tw`ml-4 flex-1`}>
                  <Text style={tw`text-base font-bold`}>Landlord</Text>
                  <Text style={tw`text-gray-600`}>{landlordPhone}</Text>
                </View>
                {landlordPhone !== "Not available" && (
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${landlordPhone}`)}>
                    <View style={[tw`px-4 py-2 rounded-xl flex-row items-center`, { backgroundColor: "#D4AF37" }]}>
                      <FontAwesome name="phone" size={18} color="#1f2937" />
                      <Text style={tw`ml-2 text-black font-semibold`}>Call</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          <Text style={tw`text-xl my-4 font-sans`}>Description</Text>
          <Text style={tw`text-gray-600 leading-6`}>{description}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HouseDetail;

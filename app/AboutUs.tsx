import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const AboutUs = () => (
  <SafeAreaView style={tw`flex-1 bg-white`}>
    <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
      <Text style={tw`text-3xl font-bold text-orange-600 mb-4`}>
        About Pekugara
      </Text>

      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        <Text style={tw`font-bold`}>Pekugara Student</Text> is a modern student accommodation platform built to help university students in Chinhoyi access safe, secure, and affordable off-campus housing.
      </Text>

      <Image
        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB2je9M00eEy_hRNW2t8UH_3Mt08wacz9KMQ&s" }}
        style={tw`rounded-xl w-full h-50 mb-4`}
        resizeMode="cover"
      />

      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        Whether you're new to town or just looking for a better place to stay, Pekugara makes it easy to search, compare, and connect with trusted landlords. All listings are verified to ensure students have peace of mind when choosing their next home.
      </Text>

      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        The project is proudly incubated at the <Text style={tw`font-bold`}>Chinhoyi University of Technology Innovation Hub</Text>, where young innovators are building real-world solutions to everyday problems.
      </Text>

      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        At Pekugara, we believe that finding accommodation shouldn't be a hassle. That's why we offer user-friendly tools, quality listings, and responsive support — all designed with students in mind.
      </Text>

      <Text style={tw`text-base text-gray-800 leading-relaxed`}>
        Our mission is simple: to make student housing in Chinhoyi more accessible, reliable, and stress-free.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default AboutUs;

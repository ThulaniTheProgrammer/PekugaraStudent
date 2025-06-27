import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Privacy = () => (
  <SafeAreaView style={tw`flex-1 bg-white`}>
    <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
      <Text style={tw`text-3xl font-bold text-orange-600 mb-4`}>
        Privacy Policy
      </Text>

      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        At <Text style={tw`font-bold`}>Pekugara Student</Text>, we respect and protect your privacy. This Privacy Policy outlines how we collect, use, store, and protect your personal information in compliance with Zimbabwean law, including the Data Protection Act [Chapter 11:12].
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        1. Information We Collect
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        We may collect the following personal data when you use our platform:
        {"\n"}- Full name
        {"\n"}- Phone number
        {"\n"}- Email address
        {"\n"}- Location or GPS data
        {"\n"}- Accommodation preferences
        {"\n"}- Device and usage information
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        2. How We Use Your Information
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        Your information helps us:
        {"\n"}- Match students with suitable accommodation.
        {"\n"}- Contact you about bookings or service updates.
        {"\n"}- Improve our services based on user behavior.
        {"\n"}- Comply with legal obligations under Zimbabwean law.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        3. Data Storage and Security
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        We use secure cloud infrastructure and encryption to protect your data. Only authorized team members have access to your personal information. We do not sell or share your data with third parties without your consent.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        4. Your Rights Under Zimbabwean Law
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        You have the right to:
        {"\n"}- Access the personal information we hold about you.
        {"\n"}- Request correction or deletion of your data.
        {"\n"}- Withdraw consent to data processing.
        {"\n"}- Report misuse to the Cyber and Data Protection Authority of Zimbabwe.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        5. Cookies and Tracking
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        We may use cookies or similar technologies to improve your experience. These tools help us remember your preferences and optimize performance. You can manage cookies in your device settings.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        6. Third-Party Services
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        We may integrate with third-party services (e.g., payment platforms or messaging tools). These services have their own privacy policies and we encourage you to review them.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        7. Policy Updates
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed mb-4`}>
        This Privacy Policy may be updated occasionally to reflect changes in our operations or legal obligations. We will notify you via the app or email when significant updates occur.
      </Text>

      <Text style={tw`text-xl font-bold text-black mt-6 mb-2`}>
        8. Contact Us
      </Text>
      <Text style={tw`text-base text-gray-800 leading-relaxed`}>
        If you have questions or requests about this policy, contact us at:
        {"\n"}📧 support@pekugara.co.zw
        {"\n"}📍 CUT Innovation Hub, Chinhoyi, Zimbabwe
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default Privacy;

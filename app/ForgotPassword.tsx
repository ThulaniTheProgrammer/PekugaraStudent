import React, { useState } from 'react';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import { TextInput, TouchableOpacity } from 'react-native';
import { auth } from './Components/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

type RootStackParamList = {
  StudentLogIn: undefined;
};

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check Your Email', 'A password reset link has been sent to your email.');
      navigation.navigate('StudentLogIn');
    } catch (error: any) {
      Alert.alert('Reset Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-4`}>
      <View style={tw`items-center mt-6`}>
        <Image source={require('../assets/images/logo.png')} style={tw`w-24 h-24`} />
      </View>

      <Text style={tw`text-black font-bold text-2xl mt-4 text-center`}>Forgot Password</Text>
      <Text style={tw`text-gray-500 text-center mt-2`}>Enter your email to reset your password</Text>

      <View style={tw`mt-6`}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={tw`bg-white text-black p-3 rounded-lg border border-gray-300 mb-3`}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={tw`w-full bg-[#ff914d] rounded-xl mt-6 p-3`}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={tw`text-center text-white font-semibold text-lg`}>Send Reset Link</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StudentLogIn')}>
        <Text style={tw`text-center text-gray-500 mt-6`}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

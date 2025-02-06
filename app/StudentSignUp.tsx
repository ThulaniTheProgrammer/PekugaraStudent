import React, { useState } from 'react';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import { TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth } from './Components/firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

type RootStackParamList = {
  Approved: undefined;
  StudentLogIn: undefined;
};

const StudentSignUp: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignUp = async () => {
    if (!email || !password || !phone || !regNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Enter a valid email address');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);
      Alert.alert(
        'Verification Email Sent',
        'Please check your email and verify your account before logging in.'
      );

      navigation.navigate('StudentLogIn');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-6`}>
      {/* Logo */}
      <View style={tw`items-center mt-6`}>
        <Image source={require('../assets/images/logo.png')} style={tw`w-24 h-24`} />
      </View>

      {/* Welcome Text */}
      <Text style={tw`text-black font-bold text-2xl mt-4 text-center`}>Create Account</Text>
      <Text style={tw`text-gray-500 text-center`}>Sign up to register</Text>

      {/* Input Fields */}
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
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={tw`bg-white text-black p-3 rounded-lg border border-gray-300 mb-3`}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          style={tw`bg-white text-black p-3 rounded-lg border border-gray-300 mb-3`}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Reg Number"
          placeholderTextColor="#ccc"
          style={tw`bg-white text-black p-3 rounded-lg border border-gray-300 mb-3`}
          value={regNumber}
          onChangeText={setRegNumber}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={tw`w-full bg-[#ff914d] rounded-xl mt-6 p-3`}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-center text-white font-semibold text-lg`}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Sign in link */}
      <Text style={tw`text-center text-gray-500 mt-4`}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('StudentLogIn')} style={tw`font-bold text-black`}>
          Log In
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default StudentSignUp;

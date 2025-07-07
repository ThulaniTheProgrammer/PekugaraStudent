import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { auth } from './Components/firebaseConfig';
import { signOut, deleteUser } from 'firebase/auth';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.reset({ index: 0, routes: [{ name: 'StudentLogIn' }] });
        } catch (error: any) {
            Alert.alert('Logout Failed', error.message);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (auth.currentUser) {
                                await deleteUser(auth.currentUser);
                                navigation.reset({ index: 0, routes: [{ name: 'StudentLogIn' }] });
                            } else {
                                Alert.alert('Error', 'No user is currently logged in.');
                            }
                        } catch (error: any) {
                            let msg = error.message;
                            if (msg.includes('recently logged in')) {
                                msg = 'Please log out and log in again before deleting your account.';
                            }
                            Alert.alert('Delete Failed', msg);
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={tw`flex-1 p-6 bg-white`}>
            <Text style={tw`text-2xl font-bold mb-6 text-center`}>Settings</Text>

            {/* Notifications Toggle */}
            <View style={tw`flex-row justify-between items-center mb-6`}>
                <Text style={tw`text-lg text-gray-800`}>Enable Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                />
            </View>

            {/* Dark Mode Toggle */}
            <View style={tw`flex-row justify-between items-center mb-6`}>
                <Text style={tw`text-lg text-gray-800`}>Dark Mode</Text>
                <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={tw`bg-orange-500 rounded-xl p-3 mt-6`}
                onPress={handleLogout}
            >
                <Text style={tw`text-center text-white font-semibold text-lg`}>Logout</Text>
            </TouchableOpacity>

            {/* Delete Account Button */}
            <TouchableOpacity
                style={tw`bg-red-500 rounded-xl p-3 mt-4`}
                onPress={handleDeleteAccount}
            >
                <Text style={tw`text-center text-white font-semibold text-lg`}>Delete Account</Text>
            </TouchableOpacity>

            {/* App Version */}
            <View style={tw`mt-10`}>
                <Text style={tw`text-base text-gray-600 text-center`}>App Version: 1.0.0</Text>
            </View>
        </ScrollView>
    );
};

export default Settings;
import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import tw from 'twrnc';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

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

            {/* App Version */}
            <View style={tw`mt-10`}>
                <Text style={tw`text-base text-gray-600 text-center`}>App Version: 1.0.0</Text>
            </View>
        </ScrollView>
    );
};

export default Settings;
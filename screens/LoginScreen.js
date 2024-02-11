import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { useAuthorization } from "../factories/AuthProvider";

export default function LoginScreen() {
    const { logIn } = useAuthorization();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className="flex-1 bg-white" style={{backgroundColor: '#877dfa'}}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.navigate('Welcome')}
                                      className="bg-yellow-400 p-3 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4">
                        <ArrowLeftIcon size="25" color="black"/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center pt-4">
                    <Image source={require('../assets/images/login.png')} style={{width: 275, height: 275}}/>
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8 mt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="Email"
                        value={email}
                        onChangeText={value => setEmail(value)}
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={value=> setPassword(value)}
                    />
                    <TouchableOpacity className="flex items-end"
                                      onPress={() => navigation.navigate('SignUp')}>
                        <Text className="text-gray-700 mb-5">Don't have an account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-3 bg-yellow-400 rounded-xl" onPress={() => {
                        if (email && password) logIn(email, password);
                    }}>
                        <Text className="text-xl font-bold text-center text-gray-700">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

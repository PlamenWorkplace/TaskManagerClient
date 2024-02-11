import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuthorization } from "../factories/AuthProvider";

export default function SignUpScreen() {
    const navigation = useNavigation();
    const { signUp } = useAuthorization();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
                    <Image source={require('../assets/images/signup.png')} style={{width: 260, height: 176}}/>
                </View>
            </SafeAreaView>
            <View className="flex-1 bg-white px-8 pt-8 mt-8" style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Username</Text>
                    <TextInput
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        value={name}
                        onChangeText={value=> setName(value)}
                        placeholder="username"
                    />
                    <Text className="text-gray-700 ml-4">Email Address</Text>
                    <TextInput
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        value={email}
                        onChangeText={value=> setEmail(value)}
                        placeholder="email"
                    />
                    <Text className="text-gray-700 ml-4">Password</Text>
                    <TextInput
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        value={password}
                        onChangeText={value=> setPassword(value)}
                        placeholder="password"
                    />
                    <TouchableOpacity className="flex items-end"
                                      onPress={() => navigation.navigate('Login')}>
                        <Text className="text-gray-700 mb-5">Already have an account?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={() => {
                        if (name && email && password) signUp(name, email, password);
                    }}>
                        <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Keyboard, Text,
} from "react-native";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export default function HomeScreen() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const navigation = useNavigation();

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy)
    }

    return (
        <View className="flex-1" style={{backgroundColor: '#877dfa'}}>
            <TouchableOpacity
              className="py-3 bg-white rounded-xl top-10 border-gray-700 w-max mx-7 mb-7"
              onPress={() => navigation.navigate('Login')}>
                <Text className="text-xl font-bold text-center text-gray-500">
                    Switch User / Logout
                </Text>
            </TouchableOpacity>
            <ScrollView keyboardShouldPersistTaps='handled'
            className="flex-grow bg-white rounded-3xl mx-7 my-14">
                <View className="mt-5 px-5">
                    {
                        taskItems.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                    <View className="border-gray-700 bg-gray-200 p-3.5 rounded-xl flex-row items-center justify-between mb-5">
                                        <View className="flex-row items-center">
                                            <View className="w-6 h-6 opacity-40 rounded-md mr-3"
                                                  style={{backgroundColor: '#877dfa'}}></View>
                                            <Text>{item}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="border-gray-700 bottom-12 flex-row justify-around mx-4 pt-10">
                <TextInput className="p-3.5 rounded-full bg-white border-gray-700 w-64"
                           placeholder={'Write a task...'}
                           value={task}
                           onChangeText={text => setTask(text)}/>
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View className="rounded-full bg-white justify-center items-center h-14 w-14 border-gray-700">
                        <Image source={require('../assets/images/plus.png')} style={{width: 20, height: 20}}/>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

import React, { useReducer } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  Keyboard,
} from "react-native";
import { useAuthorization } from "../factories/AuthProvider";

const initialState = {
  task: "",
  taskItems: [],
  editableIndex: null,
  modifiedTask: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return { ...state, task: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        taskItems: [...state.taskItems, state.task],
        task: "",
      };
    case "SET_EDITABLE_INDEX":
      return { ...state, editableIndex: action.payload };
    case "SET_MODIFIED_TASK":
      return { ...state, modifiedTask: action.payload };
    case "COMPLETE_TASK":
      let itemsCopy = [...state.taskItems];
      itemsCopy.splice(action.payload, 1);
      return { ...state, taskItems: itemsCopy };
    case "UPDATE_TASK":
      let itemsCopyForUpdate = [...state.taskItems];
      itemsCopyForUpdate[state.editableIndex] = state.modifiedTask;
      return { ...state, taskItems: itemsCopyForUpdate, editableIndex: null };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const { signOut } = useAuthorization();
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    task,
    taskItems,
    editableIndex,
    modifiedTask
  } = state;

  const handleLongPress = (index) => {
    dispatch({ type: "SET_EDITABLE_INDEX", payload: index });
    dispatch({ type: "SET_MODIFIED_TASK", payload: taskItems[index] });
    dispatch({ type: "SET_TASK", payload: "" });
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      dispatch({ type: "ADD_TASK" });
    }
  };

  const completeTask = (index) => {
    dispatch({ type: "COMPLETE_TASK", payload: index });
  };

  const handleUpdateTask = () => {
    dispatch({ type: "UPDATE_TASK" });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: "#877dfa" }}>
      <TouchableOpacity
        onPress={() => signOut()}
        className="py-3 bg-white rounded-xl top-10 border-gray-700 w-max mx-7 mb-7"
      >
        <Text className="text-xl font-bold text-center text-gray-500">Logout</Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="flex-grow bg-white rounded-3xl mx-7 my-14"
      >
        <View className="mt-5 px-5">
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => completeTask(index)}
                onLongPress={() => handleLongPress(index)}
              >
                <View className="border-gray-700 bg-gray-200 p-3.5 rounded-xl flex-row items-center justify-between mb-5">
                  <View className="flex-row items-center h-10">
                    <View
                      className="w-6 h-6 opacity-40 rounded-md mr-3 max-w-sm"
                      style={{ backgroundColor: "#877dfa" }}
                    ></View>
                    {editableIndex === index ? (
                      <TextInput
                        className="text-base w-60"
                        value={modifiedTask}
                        onChangeText={(text) =>
                          dispatch({ type: "SET_MODIFIED_TASK", payload: text })
                        }
                        onBlur={handleUpdateTask}
                        autoFocus
                      />
                    ) : (
                      <Text className="text-base w-60">{item}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="border-gray-700 bottom-12 flex-row justify-around mx-4 pt-10"
      >
        <TextInput
          className="p-3.5 rounded-full bg-white border-gray-700 w-64"
          placeholder={"Write a task..."}
          value={task}
          onChangeText={(text) => dispatch({ type: "SET_TASK", payload: text })}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View className="rounded-full bg-white justify-center items-center h-14 w-14 border-gray-700">
            <Image
              source={require("../assets/images/plus.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

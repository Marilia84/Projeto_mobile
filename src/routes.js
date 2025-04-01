import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Favoritos from "./pages/Favoritos";
import Detalhes from "./pages/Detalhes";
import { Image } from "react-native"; 

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createStackNavigator();

export default function Routes() {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
        options={{  headerLeft: null,
          headerTitle: () => (
            <Image source={require("../assets/logo2.png")}
            style={{ width:150, height: 200, resizeMode:"contain"}}  />
            ),
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#F5EFE8",
            },
            headerTintColor: "#0F0C0C",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }} />
          <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerLeft: null,
          headerTitle: () => (
            <Image source={require("../assets/logo2.png")}
            style={{ width:150, height: 200, resizeMode:"contain"}}  />
            ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F5EFE8",
          },
          headerTintColor: "#0F0C0C",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#0F0C0C"
              style={{ marginRight: 15 }}
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                } catch (error) {
                  console.error("Erro ao realizar o logout:", error);
                }
              }}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="Cadastro" 
        component={Cadastro} 
        options={{
          headerTitle: () => (
            <Image source={require("../assets/logo2.png")}
            style={{ width:150, height: 200, resizeMode:"contain"}}  />
            ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F5EFE8",
          },
          headerTintColor: "#0F0C0C",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }} 
      />
      <Stack.Screen 
        name="Detalhes" 
        component={Detalhes}
        options={{
          headerTitle: () => (
            <Image source={require("../assets/logo2.png")}
            style={{ width:150, height: 200, resizeMode:"contain"}}  />
            ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F5EFE8",
          },
          headerTintColor: "#0F0C0C",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }} 
      />
      <Stack.Screen 
        name="Favoritos"
        component={Favoritos}
        options={{
          headerTitle: () => (
            <Image source={require("../assets/logo2.png")}
            style={{ width:150, height: 200, resizeMode:"contain"}}  />
            ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F5EFE8",
          },
          headerTintColor: "#0F0C0C",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }} 
      />

      </Stack.Navigator>
   
  );
}
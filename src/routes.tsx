import React from "react";
import { Image } from "react-native";

import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NewBet from "./pages/NewBet";
import Cart from "./components/Cart";

import { Ionicons, Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <Cart {...props} />}
    >
      <Drawer.Screen name="NewBet" component={NewBet} />
    </Drawer.Navigator>
  );
};

const TabsScreen = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case "Home":
            return (
              <>
                <View
                  style={[
                    focused
                      ? { borderColor: "#B5C300" }
                      : { borderColor: "transparent" },
                    { height: 45, justifyContent: "space-between" },
                  ]}
                >
                  <View
                    style={{
                      width: 30,
                      height: 4,
                      backgroundColor: focused ? "#B5C300" : "transparent",
                      borderRadius: 15,
                    }}
                  />
                  <Feather
                    name={"home"}
                    size={30}
                    color={focused ? "#B5C300" : "#C1C1C1"}
                  />
                </View>
              </>
            );
          case "Account":
            return (
              <>
                <View
                  style={[
                    focused
                      ? { borderColor: "#B5C300" }
                      : { borderColor: "transparent" },
                    { height: 45, justifyContent: "space-between" },
                  ]}
                >
                  <View
                    style={{
                      width: 30,
                      height: 4,
                      backgroundColor: focused ? "#B5C300" : "transparent",
                      borderRadius: 15,
                    }}
                  />
                  <Feather
                    name={"user"}
                    size={30}
                    color={focused ? "#B5C300" : "#C1C1C1"}
                  />
                </View>
              </>
            );
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: "black",
      inactiveTintColor: "#969696",
      style: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "white",
        width: "100%",
        height: 75,
        zIndex: 8,
      },
      labelStyle: {
        marginTop: 2,
        fontSize: 15,
        marginBottom: 8,
      },
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen
      name="Drawer"
      component={DrawerScreen}
      options={() => ({
        tabBarIcon: () => (
          <View
            style={{
              paddingLeft: 4,
              width: 92,
              height: 92,
              borderRadius: 100,
              borderWidth: 7,
              borderColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#B5C300",
            }}
          >
            <Ionicons name={"logo-usd"} size={60} color={"#fff"} />
          </View>
        ),
        tabBarLabel: "",
      })}
    />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="App"
        component={TabsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Routes;

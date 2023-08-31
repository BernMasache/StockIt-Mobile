import * as React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/Collections";
import SettingsScreen from "./components/NewCollection";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f0edf6"
        inactiveColor="#f0ecf2"
        barStyle={{ backgroundColor: "#5579c6" }}
      >
        <Tab.Screen
          name="Collections"
          component={HomeScreen}
          options={{
            tabBarLabel: "Collections",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="reorder-horizontal"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="New"
          component={SettingsScreen}
          options={{
            tabBarLabel: "New ",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="database-plus"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

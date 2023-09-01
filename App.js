import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/Collections";
import SettingsScreen from "./components/NewCollection";
import UseCollectionStore from "./services/store/collection.store";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const collectionsStore = new UseCollectionStore();

const Tab = createMaterialBottomTabNavigator();
function App() {
  const [collections, setCollections] = useState([]);

  const loadCollections = () => {
    return collectionsStore.getCollections().then((res) => {
      // console.log(res?.data[0]?.collections);
      // setCollections(res?.data[0]?.collections[0]);
      return res?.data[0]?.collections;
    });
  };

  useEffect(() => {
    loadCollections();
  }, []);

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
          // initialParams={{
          //   name: { data: "Bernard" },
          //   collections: { data: loadCollections() },
          // }}
          options={{
            tabBarLabel: "Collections",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="reorder-horizontal"
                color={color}
                size={30}
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
                size={30}
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
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

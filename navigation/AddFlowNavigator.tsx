import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ActionScreen from "../screens/ActionScreen";
import SymptomsScreen from "../screens/SymptomsScreen";
import { AddFlowParamList } from "../types";


const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator>
      <AddFlowStack.Screen
        name="ActionScreen"
        component={ActionScreen}
        options={{ headerShown: false }}
      />
      <AddFlowStack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={{ headerShown: false }}
      />
    </AddFlowStack.Navigator>
  );
}

export default AddFlowNavigator;

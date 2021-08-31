import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ActionScreen from "../screens/ActionScreen";
import SymptomsScreen from "../screens/SymptomsScreen";
import AreaSelect from "../screens/add-flow/AreaSelectScreen";
import SeverityScreen from "../screens/add-flow/SeverityScreen";
import TimeSelectScreen from "../screens/add-flow/TimeSelectScreen";
import { AddFlowParamList } from "../types";

const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator>
      <AddFlowStack.Screen
        name="SeverityScreen"
        component={SeverityScreen}
        options={{ headerShown: false }}
      />
      <AddFlowStack.Screen
        name="AreaSelectScreen"
        component={AreaSelect}
        options={{ headerShown: false }}
      />
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
      <AddFlowStack.Screen
        name="TimeSelectScreen"
        component={TimeSelectScreen}
        options={{ headerShown: false }}
      />
    </AddFlowStack.Navigator>
  );
};

export default AddFlowNavigator;

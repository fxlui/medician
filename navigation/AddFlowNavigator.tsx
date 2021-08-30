import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ActionScreen from "../screens/ActionScreen";
import SymptomsScreen from "../screens/SymptomsScreen";
import SeverityScreen from "../screens/add-flow/SeverityScreen";
import TimeSelectScreen from "../screens/add-flow/TimeSelectScreen";
import ProgressBar from "../components/ProgressBar";
import { AddFlowParamList, ProgressFlowParamList } from "../types";


const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator>
      <AddFlowStack.Screen
        name="ProgressFlow"
        component={ProgressFlowNavigator}
        options={{
          header: () => {
            return(
              <ProgressBar progress={0} />
            );
          }
        }}
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
    </AddFlowStack.Navigator>
  );
}

const ProgressFlowStack = createStackNavigator<ProgressFlowParamList>();

const ProgressFlowNavigator = () => {
  return (
    <ProgressFlowStack.Navigator>
      <ProgressFlowStack.Screen
        name="SeverityScreen"
        component={SeverityScreen}
        options={{ headerShown: false }}
      />
      <ProgressFlowStack.Screen
        name="TimeSelectScreen"
        component={TimeSelectScreen}
        options={{ headerShown: false }}
      />
    </ProgressFlowStack.Navigator>
  );
}

export default AddFlowNavigator;

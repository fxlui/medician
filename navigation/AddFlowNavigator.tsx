import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddFlowParamList } from "../types";
import ProgressBar from "../components/ProgressBar";
import SymptomsScreen from "../screens/SymptomsScreen";
import AreaSelect from "../screens/add-flow/AreaSelectScreen";
import SeverityScreen from "../screens/add-flow/SeverityScreen";
import TimeSelectScreen from "../screens/add-flow/TimeSelectScreen";
import DetailsScreen from "../screens/add-flow/DetailsScreen";
import MediaScreen from "../screens/add-flow/MediaScreen";

const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator
      initialRouteName="SymptomsScreen"
      screenOptions={{
        header: () => <ProgressBar percentage={50} />,
      }}
    >
      <AddFlowStack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={{ headerShown: false }}
      />
      <AddFlowStack.Screen name="AreaSelectScreen" component={AreaSelect} />
      <AddFlowStack.Screen name="SeverityScreen" component={SeverityScreen} />
      <AddFlowStack.Screen
        name="TimeSelectScreen"
        component={TimeSelectScreen}
      />
      <AddFlowStack.Screen name="DetailsScreen" component={DetailsScreen} />
      <AddFlowStack.Screen name="MediaScreen" component={MediaScreen} />
    </AddFlowStack.Navigator>
  );
};

export default AddFlowNavigator;

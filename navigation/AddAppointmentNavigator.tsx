import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddAppointmentParamList } from "../types";
import ProgressBar from "../components/ProgressBar";
import PickTime from "../screens/add-appt-flow/PickDate"

const AddAppointmentStack = createStackNavigator<AddAppointmentParamList>();

const AddFlowNavigator = () => {
  return (
    <AddAppointmentStack.Navigator
      initialRouteName="PickTime"
      screenOptions={{
        header: () => <ProgressBar percentage={50} />,
      }}
    >
      <AddAppointmentStack.Screen
        name="PickTime"
        component={PickTime}
        options={{ headerShown: false }}
      />

    </AddAppointmentStack.Navigator>
  );
};

export default AddFlowNavigator;

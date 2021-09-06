import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddFlowParamList } from "../types";
import ProgressBar from "../components/ProgressBar";
import SymptomsScreen from "../screens/SymptomsScreen";

// Default Flow
import AreaSelect from "../screens/add-flow/AreaSelectScreen";
import SeverityScreen from "../screens/add-flow/SeverityScreen";
import TimeSelectScreen from "../screens/add-flow/TimeSelectScreen";
import DetailsScreen from "../screens/add-flow/DetailsScreen";
import MediaScreen from "../screens/add-flow/MediaScreen";

// Add Flow Optional Screens
import TemperatureSelectionScreen from "../screens/add-flow/TemperatureSelectionScreen";
import TemperatureScreen from "../screens/add-flow/TemperatureScreen";

import ToiletScreen from "../screens/add-flow/ToiletScreen";
import ToiletPainScreen from "../screens/add-flow/ToiletPainScreen";
import ToiletColorScreen from "../screens/add-flow/ToiletColorScreen";

import DizzyScreen from "../screens/add-flow/DizzyScreen";

import SleepHoursScreen from "../screens/add-flow/SleepHoursScreen";

import CustomScreen from "../screens/add-flow/CustomScreen";

// Add Appointment Flow
import AppointmentTimeScreen from "../screens/add-appt-flow/AppointmentTimeScreen";
import AppointmentDetailsScreen from "../screens/add-appt-flow/AppointmentDetailsScreen";

// Add Routine Flow
import RoutineSelectScreen from "../screens/add-rout-flow/RoutineSelectScreen";
import RoutineDetailsScreen from "../screens/add-rout-flow/RoutineDetailsScreen";
import RoutineTimeScreen from "../screens/add-rout-flow/RoutineTimeScreen";

const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  return (
    <AddFlowStack.Navigator
      initialRouteName="SymptomsScreen"
      screenOptions={{
        header: () => <ProgressBar />,
        headerMode: "float",
        cardShadowEnabled: true,
      }}
    >
      <AddFlowStack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={{ headerShown: false }}
      />
      <AddFlowStack.Screen
        name="AreaSelectScreen"
        component={AreaSelect}
        options={{ headerMode: "screen" }}
      />
      <AddFlowStack.Screen name="SeverityScreen" component={SeverityScreen} />
      <AddFlowStack.Screen
        name="TimeSelectScreen"
        component={TimeSelectScreen}
      />
      <AddFlowStack.Screen name="DetailsScreen" component={DetailsScreen} />
      <AddFlowStack.Screen name="MediaScreen" component={MediaScreen} />
      <AddFlowStack.Screen
        name="TemperatureSelectionScreen"
        component={TemperatureSelectionScreen}
      />
      <AddFlowStack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
      />
      <AddFlowStack.Screen name="ToiletScreen" component={ToiletScreen} />
      <AddFlowStack.Screen
        name="ToiletPainScreen"
        component={ToiletPainScreen}
      />
      <AddFlowStack.Screen
        name="ToiletColorScreen"
        component={ToiletColorScreen}
      />
      <AddFlowStack.Screen name="DizzyScreen" component={DizzyScreen} />
      <AddFlowStack.Screen
        name="SleepHoursScreen"
        component={SleepHoursScreen}
      />
      <AddFlowStack.Screen name="CustomScreen" component={CustomScreen} />
      <AddFlowStack.Screen
        name="AppointmentTimeScreen"
        component={AppointmentTimeScreen}
      />
      <AddFlowStack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
      />
      <AddFlowStack.Screen
        name="RoutineSelectScreen"
        component={RoutineSelectScreen}
      />
      <AddFlowStack.Screen
        name="RoutineDetailsScreen"
        component={RoutineDetailsScreen}
      />
      <AddFlowStack.Screen
        name="RoutineTimeScreen"
        component={RoutineTimeScreen}
      />
    </AddFlowStack.Navigator>
  );
};

export default AddFlowNavigator;

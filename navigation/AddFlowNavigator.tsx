import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AddFlowParamList } from "../types";
import AddFlowHeader from "../components/AddFlowHeader";
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

import { useStores } from "../models/root-store-provider";
import CustomScreen from "../screens/add-flow/CustomScreen";

// Add Appointment Flow
import AppointmentTimeScreen from "../screens/add-appt-flow/AppointmentTimeScreen";
import AppointmentDetailsScreen from "../screens/add-appt-flow/AppointmentDetailsScreen";

// Add Routine Flow
import RoutineSelectScreen from "../screens/add-rout-flow/RoutineSelectScreen";
import MedicationScreen from "../screens/add-rout-flow/MedicationScreen";
import ExerciseScreen from "../screens/add-rout-flow/ExerciseScreen";
import RoutineTimeScreen from "../screens/add-rout-flow/RoutineTimeScreen";

const AddFlowStack = createStackNavigator<AddFlowParamList>();

const AddFlowNavigator = () => {
  const { progressStore } = useStores();
  return (
    <AddFlowStack.Navigator
      initialRouteName="SymptomsScreen"
      screenOptions={{
        header: (navigation) => (
          <AddFlowHeader screenProps={navigation} title={"I feel..."} />
        ),
        headerMode: "float",
        cardShadowEnabled: true,
      }}
      screenListeners={() => ({
        gestureEnd: () => {
          progressStore.goBack();
        },
      })}
    >
      <AddFlowStack.Screen name="SymptomsScreen" component={SymptomsScreen} />
      <AddFlowStack.Screen name="AreaSelectScreen" component={AreaSelect} />
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
        options={{ headerMode: "screen" }}
      />
      <AddFlowStack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
      />
      <AddFlowStack.Screen
        name="ToiletScreen"
        component={ToiletScreen}
        options={{ headerMode: "screen" }}
      />
      <AddFlowStack.Screen
        name="ToiletPainScreen"
        component={ToiletPainScreen}
      />
      <AddFlowStack.Screen
        name="ToiletColorScreen"
        component={ToiletColorScreen}
      />
      <AddFlowStack.Screen
        name="DizzyScreen"
        component={DizzyScreen}
        options={{ headerMode: "screen" }}
      />
      <AddFlowStack.Screen
        name="SleepHoursScreen"
        component={SleepHoursScreen}
        options={{ headerMode: "screen" }}
      />
      <AddFlowStack.Screen
        name="CustomScreen"
        component={CustomScreen}
        options={{ headerMode: "screen" }}
      />
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
        name="MedicationScreen"
        component={MedicationScreen}
      />
      <AddFlowStack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      <AddFlowStack.Screen
        name="RoutineTimeScreen"
        component={RoutineTimeScreen}
      />
    </AddFlowStack.Navigator>
  );
};

export default AddFlowNavigator;

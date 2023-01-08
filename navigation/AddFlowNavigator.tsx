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
      screenListeners={() => ({
        gestureEnd: () => {
          progressStore.goBack();
        },
      })}
    >
      <AddFlowStack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader screenProps={navigation} title={"I feel..."} />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="AreaSelectScreen"
        component={AreaSelect}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Where is the area affected?"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="SeverityScreen"
        component={SeverityScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"How severe is it?"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="TimeSelectScreen"
        component={TimeSelectScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"When did it occur?"}
              subtitle={
                "You can select multiple dates and times by tapping on the dates."
              }
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please describe what you observe."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="MediaScreen"
        component={MediaScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={" Attach any photos or videos here."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="TemperatureSelectionScreen"
        component={TemperatureSelectionScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Were you able to take your temperature?"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="TemperatureScreen"
        component={TemperatureScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"What was your temperature?"}
              subtitle="Tap on the number to change the unit."
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="ToiletScreen"
        component={ToiletScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please select all that applies."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="ToiletPainScreen"
        component={ToiletPainScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader screenProps={navigation} title={"Does it hurt?"} />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="ToiletColorScreen"
        component={ToiletColorScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"What colour is it?"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="DizzyScreen"
        component={DizzyScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Is your head spinning or the room spinning?"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="SleepHoursScreen"
        component={SleepHoursScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"How long did you sleep?"}
              subtitle="Put in an estimate if you're not sure."
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="CustomScreen"
        component={CustomScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please describe what you observe."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="AppointmentTimeScreen"
        component={AppointmentTimeScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"When is your appointment?"}
              subtitle="Select the dates you have booked."
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please tell me more about your appointment."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="RoutineSelectScreen"
        component={RoutineSelectScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Choose the type of routine"}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="MedicationScreen"
        component={MedicationScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please tell me more about your medication."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Please tell me more about your exercise."}
            />
          ),
        }}
      />
      <AddFlowStack.Screen
        name="RoutineTimeScreen"
        component={RoutineTimeScreen}
        options={{
          header: (navigation) => (
            <AddFlowHeader
              screenProps={navigation}
              title={"Choose the times for your routine."}
              subtitle="Check with your doctor or pharmacist before starting any medication or
          supplements."
            />
          ),
        }}
      />
    </AddFlowStack.Navigator>
  );
};

export default AddFlowNavigator;

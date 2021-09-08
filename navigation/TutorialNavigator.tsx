import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { TutorialParamList } from "../types";
import ProgressBar from "../components/ProgressBar";
import SymptomsScreen from "../screens/SymptomsScreen";

import WelcomeTut from "../screens/tutorial/WelcomeTut";
import HomeTut from "../screens/tutorial/HomeTut";
import ActionTut from "../screens/tutorial/ActionTut";
import SymptomTut from "../screens/tutorial/SymptomTut";
import RoutineTut from "../screens/tutorial/RoutineTut";
import OverviewTut from "../screens/tutorial/OverviewTut";
import EndingTut from "../screens/tutorial/EndingTut";



const TutorialStack = createStackNavigator<TutorialParamList>();

const TutorialStackNavigator = () => {
  return (
    <TutorialStack.Navigator
      initialRouteName="WelcomeTut"
      screenOptions={{
        headerMode: "float",
        cardShadowEnabled: true,
      }}
    >
      <TutorialStack.Screen
        name="WelcomeTut"
        component={WelcomeTut}
        options={{ headerShown: false }}
      />
    </TutorialStack.Navigator>
  );
};

export default TutorialStackNavigator;

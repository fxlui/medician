import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { PressableBase } from './PressableBase';


export const TabBarButton = (props: BottomTabBarButtonProps) => {
  return(
    <PressableBase extraProps={props}>
      {props.children}
    </PressableBase>
  );
}

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 110,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

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
    height: 70,
    bottom: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    paddingBottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

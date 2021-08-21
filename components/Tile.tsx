import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import PillSVG from '../assets/images/PillSVG';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TileDetails {
  title: string;
}

const Tile: React.FC<TileDetails> = ({
  title,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons 
          style={styles.icon}
          name="pill" 
          size={41} 
          color="white"
        />
        <Text style={styles.tileText}>
          {title}
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderRadius: 13,
    borderColor: 'black',
    backgroundColor: '#24AC29',
    padding: 20,
    marginRight: 20,
  },
  content: {
    backgroundColor: '#24AC29',
    flexDirection: 'column',
    height: 100,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  icon: {
    // marginBottom: 35,
  },
  tileText: {
    color: 'white',
  },
});

export default Tile;

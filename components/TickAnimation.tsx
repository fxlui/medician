import * as React from "react";
import { Animated, View } from "react-native";
import Svg, { SvgProps, Path } from "react-native-svg";
import * as Haptics from "expo-haptics";
import useColorScheme from "../hooks/useColorScheme";
import { Text } from "./Themed";

const AnimatedPath = Animated.createAnimatedComponent(Path);

/*
const animation = (
                  <View>
                    <TickSVG />
                  </View>
                );
                Toast.show(animation, {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.CENTER,
                  shadow: false,
                  animation: true,
                  hideOnPress: true,
                  delay: 50,
                  containerStyle: {
                    backgroundColor: "transparent",
                  },
                  opacity: 0.9,
                });
                */
interface TickProps extends SvgProps {
  message?: string;
}

function SvgComponent(props: TickProps) {
  const colorScheme = useColorScheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const textColor = colorScheme === "light" ? "#333333" : "#fff";
  const tileColor = colorScheme === "light" ? "#fff" : "#252525";
  const interpolateRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["100px", "0px"],
  });

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: tileColor,
        paddingHorizontal: 15,
      }}
    >
      <Animated.View>
        <Svg width={154} height={154} {...props}>
          <AnimatedPath
            stroke={textColor}
            opacity={0.8}
            strokeWidth={10}
            strokeDasharray="100px,100px"
            strokeDashoffset={interpolateRotation}
            d="M43.5 77.8l20.2 20.1 48.5-48.5"
            fill="none"
          />
        </Svg>
      </Animated.View>
      <Text style={{ fontWeight: "500", marginBottom: 20, fontSize: 16 }}>
        {props.message ? props.message : "Success!"}
      </Text>
    </View>
  );
}

export default SvgComponent;

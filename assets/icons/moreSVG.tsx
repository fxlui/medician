import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SvgComponent(props: Props) {
  return (
    <Svg viewBox="0 0 30 30" width={60} height={60} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M5 12a3 3 0 100 6 3 3 0 000-6zm10 0a3 3 0 100 6 3 3 0 000-6zm10 0a3 3 0 100 6 3 3 0 000-6z"
      />
    </Svg>
  );
}

export default SvgComponent;

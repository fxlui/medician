import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function IgnoreSVG(props: Props) {
  return (
    <Svg viewBox="0 0 24 24" width={96} height={96} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M5.99 4.99a1 1 0 00-.697 1.717L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 101.414-1.414L13.414 12l5.293-5.293a1 1 0 00-.727-1.717 1 1 0 00-.687.303L12 10.586 6.707 5.293a1 1 0 00-.717-.303z"
      />
    </Svg>
  );
}

export default IgnoreSVG;

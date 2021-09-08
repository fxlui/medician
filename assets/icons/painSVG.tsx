import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
import { Animated } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SvgComponent(props: Props) {
  return (
    <Svg viewBox="0 0 30 30" width={90} height={90} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M24.184 9.808c.105-.134.089-.321-.036-.418l-1.351-1.056a.293.293 0 00-.378.027l-3.116 2.605v.001a.324.324 0 00-.059.058c-.105.134-.089.321.036.418l1.238.968-2.19 2.116a.447.447 0 00-.042.045c-.105.134-.089.321.036.418a.284.284 0 00.3.026l3.998-1.905.001-.006a.31.31 0 00.154-.103c.105-.134.089-.321-.036-.418l-1.238-.968 2.585-1.725a.3.3 0 00.098-.083z"
      />
      <AnimatedCircle
        fill={props.animatedValue ? props.animatedValue : props.fill}
        cx={17.5}
        cy={5.5}
        r={2.5}
      />
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M15.38 17.784a1 1 0 001.41-.14.99.99 0 00-.14-1.4l-.03-.03-2.75-2.17 1.31-1.56c.04-.07.08-.15.11-.23a2.5 2.5 0 00-1.79-4.25h-.007a2.879 2.879 0 00-2.337 1.206l-2.99 4.185a2.881 2.881 0 00-.052 3.273l1.426 2.136 1.03 1.84.43 5.44c.05.52.49.91 1 .91h.09c.51-.05.91-.48.91-.99v-6c0-.14-.03-.27-.08-.39v-.01l-.22-2.93.08-.95 2.6 2.06z"
      />
    </Svg>
  );
}

export default SvgComponent;

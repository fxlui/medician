import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SleepSVG(props: Props) {
  return (
    <Svg viewBox="0 0 50 50" width={50} height={50} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M3 9c-1.645 0-3 1.355-3 3v30h6v-5h38v5h6V27c0-2.745-2.255-5-5-5H21a1 1 0 00-1 1v5h-.01a1 1 0 00-.027-.14s-1.276-5.075-5.436-7.04c-1.037-.49-2.114-.724-3.144-.799-2.448-.177-4.577.521-5.383.829V12c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v18h9.969c.41.021.809.022 1.195 0H48v10h-2v-5H4v5H2V12c0-.555.445-1 1-1zm8.248 11.057c.826.047 1.664.212 2.426.572 2.434 1.15 3.512 3.677 3.947 4.828-.67.213-1.831.53-3.154.543h-.43c-.87-.038-1.794-.222-2.69-.67a1 1 0 00-.02-.01c-2.432-1.148-3.502-3.592-3.942-4.732.81-.26 2.044-.635 3.863-.531zM22 24h23c1.655 0 3 1.345 3 3v1H22v-4zm-16 .531c.58 1.115 1.449 2.414 2.727 3.469H6v-3.469z"
      />
    </Svg>
  );
}

export default SleepSVG;

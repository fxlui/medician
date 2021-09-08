import * as React from "react";
import Svg, { SvgProps, Path, SvgCss } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SvgComponent(props: Props) {
  return (
    <Svg viewBox="0 0 50 50" width={40} height={40} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M27.5 2a4.5 4.5 0 100 9 4.5 4.5 0 100-9zm-2.026 11H23.21c-.879 0-1.734.29-2.432.824l-6.951 4.558-.693.888-2.996 7.071 3.764 1.23 2.577-5.779 4.563-2.61-1.887 8.748.49 3.241 5.471 5.905 2.113 9.486 4.511-2.14-2.012-9.071L26 29.006l2.856-11.503S26.946 13 25.474 13z"
      />
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M29.5 43a2.5 2.5 0 100 5 2.5 2.5 0 100-5zM23 33a4 4 0 010-8v8zm-11-8a2 2 0 100 4 2 2 0 100-4zm3-7a2 2 0 100 4 2 2 0 100-4zm10.5-5a3.5 3.5 0 100 7 3.5 3.5 0 100-7zm13.154 9.118l.003-.007-4.99-1.465-2.693-3.815c-.011.153-.015.307-.037.457l-1.197 4.878 1.867 2.073 5.614 1.604.003.001.057.022.002-.004c.222.086.463.138.717.138a1.995 1.995 0 00.654-3.882zM18.443 32.876l-.938 4.705-4.764 6.144A2.5 2.5 0 0014.5 48c.918 0 1.712-.5 2.146-1.237l.008.006 4.971-6.477.894-3.351-4.076-4.065z"
      />
    </Svg>
  );
}

export default SvgComponent;

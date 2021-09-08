import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Animated } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SvgComponent(props: Props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <AnimatedPath
        d="M3.2 0C1.451 0 0 1.451 0 3.2l.003 4.763C.003 7.841 0 7.853 0 8c0 4.706 2.933 8.744 7.063 10.397a4.781 4.781 0 002.537 2.11V25.6c0 3.516 2.884 6.4 6.4 6.4h6.4c3.516 0 6.4-2.884 6.4-6.4v-.278a4.8 4.8 0 001.794-7.916A4.8 4.8 0 0022.4 20.8a4.8 4.8 0 003.2 4.519v.281c0 1.787-1.413 3.2-3.2 3.2H16a3.176 3.176 0 01-3.2-3.2v-5.094a4.781 4.781 0 002.537-2.11C19.468 16.745 22.4 12.707 22.4 8V3.2c0-1.749-1.451-3.2-3.2-3.2H16v3.2h3.2V8c0 4.438-3.562 8-8 8-4.438 0-8-3.562-8-8 0 .12.003.109.003-.037L3.2 3.2h3.2V0H3.2z"
        fill={
          props.animatedValue
            ? props.animatedValue
            : props.fill
            ? props.fill
            : "url(#prefix__paint0_linear)"
        }
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={16}
          y1={0}
          x2={16}
          y2={32}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#18BDF1" />
          <Stop offset={1} stopColor="#00A3FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;

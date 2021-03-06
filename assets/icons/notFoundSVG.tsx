import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function NotFoundSVG(props: Props) {
  return (
    <Svg viewBox="0 0 128 128" width={128} height={128} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M87.7 84.1c-1.3-.3-2.7.3-3.4 1.5l-14 26c-.2.4-.4.9-.4 1.4v4c0 1.7 1.3 3 3 3h11v4c0 1.7 1.3 3 3 3s3-1.3 3-3v-4c1.7 0 3-1.3 3-3s-1.3-3-3-3V87c.1-1.4-.8-2.6-2.2-2.9zM84 114h-8v-.2l8-14.9V114zm-19 2V95c0-6.1-4.9-11-11-11s-11 4.9-11 11v21c0 6.1 4.9 11 11 11s11-4.9 11-11zm-16 0V95c0-2.8 2.2-5 5-5s5 2.2 5 5v21c0 2.8-2.2 5-5 5s-5-2.2-5-5zm-34-3v4c0 1.7 1.3 3 3 3h11v4c0 1.7 1.3 3 3 3s3-1.3 3-3v-4c1.7 0 3-1.3 3-3s-1.3-3-3-3V87c0-1.4-.9-2.6-2.3-2.9-1.3-.3-2.7.3-3.4 1.5l-14 26c-.2.4-.3.9-.3 1.4zm6 .8l8-14.9V114h-8v-.2zm98-4.8V43c0-1.7-1.3-3-3-3s-3 1.3-3 3v66c0 3.9-3.1 7-7 7-1.7 0-3 1.3-3 3s1.3 3 3 3c7.2 0 13-5.8 13-13zM29 19v48c0 1.7 1.3 3 3 3s3-1.3 3-3V19c0-3.9 3.1-7 7-7h51v7c0 7.2 5.8 13 13 13h8.4c1.7 0 4.6 0 4.6-3 0-12.7-10.3-23-23-23H42c-7.2 0-13 5.8-13 13zm70-6.7c7 1.2 12.5 6.8 13.7 13.7H106c-3.9 0-7-3.1-7-7v-6.7z"
      />
    </Svg>
  );
}

export default NotFoundSVG;

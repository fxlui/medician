import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function ColdSVG(props: Props) {
  return (
    <Svg viewBox="0 0 50 50" width={50} height={50} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M24.984-.014A1 1 0 0024 1v7.586l-4.293-4.293a1 1 0 00-.717-.303 1 1 0 00-.697 1.717L24 11.414V23.27l-10.266-5.928-2.088-7.797a1 1 0 00-.947-.754 1 1 0 00-.984 1.271l1.57 5.866-6.57-3.793a1 1 0 00-.475-.143 1 1 0 00-.1.002 1 1 0 00-.425 1.871l6.57 3.793-5.863 1.572a1 1 0 10.517 1.932l7.797-2.088L23.002 25l-10.266 5.926-7.797-2.088a1 1 0 00-.296-.037 1 1 0 00-.221 1.969l5.863 1.572-6.57 3.793a1 1 0 101 1.73l6.57-3.793-1.57 5.865a1 1 0 101.931.518l2.088-7.797L24 26.73v11.856l-5.707 5.707a1 1 0 101.414 1.414L24 41.414V49a1 1 0 102 0v-7.586l4.293 4.293a1 1 0 101.414-1.414L26 38.586V26.73l10.266 5.928 2.088 7.797a1 1 0 101.931-.517l-1.57-5.866 6.57 3.793a1 1 0 101-1.73l-6.57-3.793 5.863-1.572a1 1 0 00-.25-1.97 1 1 0 00-.267.038l-7.797 2.088L26.998 25l10.266-5.926 7.797 2.088a1 1 0 10.517-1.932l-5.863-1.572 6.57-3.793a1 1 0 00-.455-1.87 1 1 0 00-.545.14l-6.57 3.793 1.57-5.866a1 1 0 00-1.015-1.271 1 1 0 00-.916.754l-2.088 7.797L26 23.27V11.414l5.707-5.707a1 1 0 10-1.414-1.414L26 8.586V1a1 1 0 00-1.016-1.014z"
      />
    </Svg>
  );
}

export default ColdSVG;

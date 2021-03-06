import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SmellSVG(props: Props) {
  return (
    <Svg viewBox="0 0 50 50" width={100} height={100} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M17 4c0 .418-.258 1.82-.438 2.688-2.062 9.765-5.078 12.445-7.53 14.593C7.276 22.816 6 23.914 6 27.188 6 30.063 8.941 33 11.813 33c3.746 0 5.394 1.582 7 3.125C20.343 37.598 21.788 39 25 39c3.21 0 4.656-1.402 6.188-2.875 1.605-1.543 3.253-3.125 7-3.125C41.057 33 44 30.062 44 27.187c0-3.273-1.258-4.382-3.031-5.937-2.434-2.133-5.469-4.793-7.532-14.563C33.27 5.907 33 4.492 33 4h-2c0 .848.39 2.754.469 3.125 2.203 10.418 5.652 13.434 8.187 15.656C41.31 24.231 42 24.821 42 27.188 42 28.965 39.965 31 38.187 31c-4.55 0-6.664 2.04-8.374 3.688C28.366 36.078 27.405 37 25 37c-2.406 0-3.367-.922-4.813-2.313C18.474 33.04 16.364 31 11.813 31 10.04 31 8 28.965 8 27.187c0-2.363.672-2.972 2.344-4.437 2.515-2.203 5.984-5.203 8.187-15.625C18.61 6.742 19 4.773 19 4zm-2 33.594l-3.719 3.687 1.438 1.438L14 41.406V46h2v-4.594l1.281 1.313 1.438-1.438zm20 0l-3.719 3.687 1.438 1.438L34 41.406V46h2v-4.594l1.281 1.313 1.438-1.438z"
      />
    </Svg>
  );
}

export default SmellSVG;

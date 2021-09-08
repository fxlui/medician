import * as React from "react";
import Svg, { SvgProps, Path, SvgCss } from "react-native-svg";
import { Animated } from "react-native";
const AnimatedPath = Animated.createAnimatedComponent(Path);
interface Props extends SvgProps {
  animatedValue?: Animated.AnimatedInterpolation;
}

function SvgComponent(props: Props) {
  return (
    <Svg viewBox="0 0 50 50" width={50} height={50} {...props}>
      <AnimatedPath
        fill={props.animatedValue ? props.animatedValue : props.fill}
        d="M27 2c-2.75 0-5 2.25-5 5s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5zm0 2c1.668 0 3 1.332 3 3s-1.332 3-3 3-3-1.332-3-3 1.332-3 3-3zm-3.79 9a5.007 5.007 0 00-3.04 1.03l-5.951 4.558a1 1 0 00-.104.092 2.992 2.992 0 00-.82 1.047 1 1 0 00-.08.152l-2.836 6.69c-.23.42-.379.907-.379 1.431 0 1.645 1.355 3 3 3 1.318 0 2.436-.87 2.832-2.06l2.451-5.499 1.139-.834-1.235 5.069a1 1 0 00-.03.26c-.077.324-.152.658-.155 1.039a1 1 0 00-.006.027l-1.426 7.152-4.619 5.957a1 1 0 00-.014.02C11.6 42.588 11 43.384 11 44.5c0 1.921 1.579 3.5 3.5 3.5 1.396 0 2.352-.908 2.92-1.604a1 1 0 00.02-.023l4.978-6.47a1 1 0 00.174-.354l.93-3.486 1.697 1.548 1.834 7.368-.024-.147c.03.316.117.641.242.961.013.049.149.593.618 1.121.49.55 1.386 1.078 2.605 1.086 1.917.011 3.41-1.602 3.41-3.477 0-.436-.042-.912-.22-1.441l.023.078-2.008-8.05a1 1 0 00-.168-.356l-4.44-5.955 1.247-4.586 1.525 1.693a1 1 0 00.469.293l5.611 1.604h.004c.004 0 .012.003.02.006l.072.021c.061.017.144.04.24.063.192.046.387.107.721.107 1.646 0 3.058-1.35 3-3.035-.056-1.593-1.145-2.535-2.053-2.81a1 1 0 00-.008-.003l-4.656-1.367-3.799-5.383a1 1 0 00-.095-.117 4.494 4.494 0 00-3.67-2.256c-.036-.009-.108-.013-.168-.02l-.014-.001c-.013 0-.024-.008-.037-.008-.178 0-.107.001-.014.002L25.475 13H23.21zm0 2h2.265l.007.002c.229 0 .234-.002.018-.002 1.393 0 2.5 1.107 2.5 2.5 0 .216-.041.443-.115.697a1 1 0 00-.037.201l-2.813 10.346a1 1 0 00.162.86l4.61 6.183 1.959 7.858a1 1 0 00.023.076c.11.325.115.447.115.802 0 .888-.553 1.482-1.398 1.477-.709-.004-.953-.223-1.123-.414-.17-.191-.194-.309-.194-.309a1 1 0 00-.058-.173 1.48 1.48 0 01-.111-.461 1 1 0 00-.026-.147l-1.908-7.66a1 1 0 00-.297-.498l-5.016-4.576a1 1 0 00-.195-.139 3.007 3.007 0 01-.98-.89l.039.306a1 1 0 00-.143-.4c-.001-.003-.004-.004-.006-.006a1 1 0 00-.125-.156l.112.11A2.949 2.949 0 0120 29c0-.249.045-.503.123-.787a1 1 0 00.025-.137c.033-.126 1.213-4.627 1.872-7.683a1 1 0 00-1.569-1.018l-3.562 2.61a1 1 0 00-.323.4l-2.56 5.74a1 1 0 00-.05.14A.982.982 0 0113 29c-.565 0-1-.435-1-1 0-.186.053-.356.152-.518a1 1 0 00.069-.134l2.785-6.57-.065.083a1 1 0 00.135-.236.992.992 0 01.336-.426 1 1 0 00.197-.195l-.07.092 5.846-4.477.002-.002A3.01 3.01 0 0123.21 15zm6.497 4.186l2.143 3.037a1 1 0 00.535.382l4.98 1.463c.119.036.61.268.635.967.018.523-.436.965-1 .965.08 0-.114-.018-.248-.05-.067-.017-.13-.035-.176-.048l-.053-.013-.013-.004h-.002l-.006-.002-.006-.002-5.338-1.526-2.195-2.439.744-2.73zm-10.35 13.212c.335.353.716.654 1.131.897l1.367 1.248-1.144 4.299-4.842 6.29c-.378.463-.93.868-1.369.868-.84 0-1.5-.66-1.5-1.5 0-.273.277-.817.543-1.178l.002-.004 4.75-6.125a1 1 0 00.191-.416l.871-4.379z"
      />
    </Svg>
  );
}

export default SvgComponent;

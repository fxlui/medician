import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function ExerciseSVG(props: SvgProps) {
  return (
    <Svg width={19} height={38} viewBox="0 0 19 38" fill="none" {...props}>
      <Path
        d="M8.038 0a3.656 3.656 0 00-3.654 3.65 3.65 3.65 0 003.654 3.652 3.657 3.657 0 003.376-2.254A3.649 3.649 0 008.038 0zM6.576 10.223a3.652 3.652 0 00-3.654 3.65v7.302c0 .866.315 1.653.82 2.28-.002 0 4.396 5.236 4.396 5.236l2.092 7.947.02.11a1.46 1.46 0 002.227 1.027 1.464 1.464 0 00.657-1.505l-1.462-8.763a1.46 1.46 0 00-.091-.319l-.003-.023-1.79-4.281.36-4.147 3.75-.748c.537.606 1.31.996 2.179.996A2.93 2.93 0 0019 16.065a2.93 2.93 0 00-2.923-2.922c-1.278 0-2.36.835-2.755 1.983l-3.092.619v-1.871a3.652 3.652 0 00-3.654-3.651zM2.754 26.82l-2.51 8.697-.174.547a1.456 1.456 0 00.945 1.834c.15.048.298.072.446.072.581 0 1.11-.358 1.339-.913l2.963-5.902-.286-1.09L3.7 27.95l-.945-1.129z"
        fill={props.fill ? props.fill : "url(#prefix__paint0_linear)"}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={9.5}
          y1={0}
          x2={9.5}
          y2={38}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4E54C8" />
          <Stop offset={1} stopColor="#4B52DD" />
          <Stop offset={1} stopColor="#4B52DD" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default ExerciseSVG;

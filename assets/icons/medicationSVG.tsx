import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function MedicationSVG(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M22.405 0a9.579 9.579 0 00-6.792 2.801L2.804 15.606c-3.739 3.736-3.738 9.843 0 13.58v.003A9.6 9.6 0 009.596 32a9.598 9.598 0 006.792-2.814l12.809-12.802v-.003c3.737-3.736 3.738-9.843 0-13.58A9.579 9.579 0 0022.405 0zm0 3.18c1.635 0 3.27.628 4.528 1.884a6.375 6.375 0 010 9.054l-6.004 6.002-9.056-9.053 6.004-6.003a6.386 6.386 0 014.528-1.885z"
        fill={props.fill ? props.fill : "url(#prefix__paint0_linear)"}
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
          <Stop stopColor="#24AC29" />
          <Stop offset={0} stopColor="#24AC29" />
          <Stop offset={1} stopColor="#3DA523" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default MedicationSVG;

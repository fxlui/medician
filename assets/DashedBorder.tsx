import * as React from "react";
import Svg, { SvgProps, Rect } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={155} height={155} fill="none" {...props}>
      <Rect
        x={1}
        y={1}
        width={153}
        height={153}
        rx={12}
        stroke="#ACACAC"
        strokeWidth={2}
        strokeDasharray="10 10"
      />
    </Svg>
  );
}

export default SvgComponent;

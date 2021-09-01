import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function CancelSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={60}
      height={60}
      {...props}
    >
      <Path d="M7 4a.995.995 0 00-.707.293l-2 2a.999.999 0 000 1.414L11.586 15l-7.293 7.293a.999.999 0 000 1.414l2 2a.999.999 0 001.414 0L15 18.414l7.293 7.293a.999.999 0 001.414 0l2-2a.999.999 0 000-1.414L18.414 15l7.293-7.293a.999.999 0 000-1.414l-2-2a.999.999 0 00-1.414 0L15 11.586 7.707 4.293A.996.996 0 007 4z" />
    </Svg>
  );
}

export default CancelSVG;

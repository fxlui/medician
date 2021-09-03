import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function CancelSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={90}
      height={90}
      {...props}
    >
      <Path d="M7.979 5.98a2 2 0 00-1.393 3.434L12.172 15l-5.586 5.586a2 2 0 102.828 2.828L15 17.828l5.586 5.586a2 2 0 102.828-2.828L17.828 15l5.586-5.586a2 2 0 00-1.453-3.434 2 2 0 00-1.375.606L15 12.172 9.414 6.586A2 2 0 007.98 5.98z" />
    </Svg>
  );
}

export default CancelSVG;


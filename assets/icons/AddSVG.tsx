import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function AddSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={60}
      height={60}
      {...props}
    >
      <Path d="M14.97 2.973A2 2 0 0013 5v8H5a2 2 0 100 4h8v8a2 2 0 104 0v-8h8a2 2 0 100-4h-8V5a2 2 0 00-2.03-2.027z" />
    </Svg>
  );
}

export default AddSVG;

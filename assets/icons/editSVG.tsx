import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function EditSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={90}
      height={90}
      {...props}
    >
      <Path d="M22.828 3c-.512 0-1.023.195-1.414.586L19 6l5 5 2.414-2.414a2 2 0 000-2.828l-2.172-2.172A1.994 1.994 0 0022.828 3zM17 8L5.26 19.74s.918-.082 1.26.26c.342.342.06 2.58.48 3 .42.42 2.644.124 2.963.443.319.32.297 1.297.297 1.297L22 13l-5-5zM4 23l-.943 2.672A1 1 0 003 26a1 1 0 001 1 1 1 0 00.328-.057 1 1 0 00.01-.004l.025-.007a1 1 0 00.006-.004L7 26l-1.5-1.5L4 23z" />
    </Svg>
  );
}

export default EditSVG;

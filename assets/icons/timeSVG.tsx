import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function TimeSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={90}
      height={90}
      {...props}
    >
      <Path d="M15 3C8.385 3 3 8.385 3 15s5.385 12 12 12 12-5.385 12-12c0-4.14-2.102-7.8-5.3-9.957l1.146-1.47L18 3.395 19.398 8l1.063-1.365a9.97 9.97 0 014.484 7.367A1 1 0 0024 15a1 1 0 00.951.998 9.986 9.986 0 01-8.953 8.953A1 1 0 0015 24a1 1 0 00-.998.951 9.986 9.986 0 01-8.953-8.953A1 1 0 006 15a1 1 0 00-.951-.998A9.985 9.985 0 0115 5a1 1 0 100-2zm-.016 4.986A1 1 0 0014 9v5.5l-3.6 2.7a1 1 0 001.2 1.6l4-3a1 1 0 00.4-.8V9a1 1 0 00-1.016-1.014z" />
    </Svg>
  );
}

export default TimeSVG;

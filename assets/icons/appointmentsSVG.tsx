import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function AppointmentsSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={50}
      height={50}
      {...props}
    >
      <Path d="M4 2c-.534 0-1.037.208-1.414.586A1.988 1.988 0 002 4v3c0 2.942 1.83 5.454 4.408 6.486.354.616.914 1.09 1.592 1.33V18a4 4 0 004 4h4a4 4 0 004-4v-.174A3 3 0 0022 15a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 002 2.824V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3.184a2.987 2.987 0 001.592-1.33A7.01 7.01 0 0016 6.976V4a2 2 0 00-2-2h-1a1 1 0 000 2h1v2.777c0 2.61-1.901 4.945-4.498 5.198a5.171 5.171 0 01-.555.025c-2.733-.028-4.946-2.262-4.945-5.023L4 4h1a1 1 0 000-2H4z" />
    </Svg>
  );
}

export default AppointmentsSVG

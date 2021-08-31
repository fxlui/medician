import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={50}
      height={50}
      {...props}
    >
      <Path d="M19.637 3.006a7.341 7.341 0 00-5.207 2.15L5.156 14.43c-2.867 2.867-2.867 7.547 0 10.414a1 1 0 00.326.217 1 1 0 00.006.002c2.885 2.58 7.313 2.55 10.082-.22l9.274-9.273c2.867-2.867 2.867-7.547 0-10.414a7.34 7.34 0 00-5.207-2.15zm0 1.988c1.37 0 2.741.525 3.793 1.576a5.35 5.35 0 010 7.586l-2.137 2.137-1.793 1.793a.998.998 0 01-1.412.002l-4.055-4.057h-.002a2 2 0 00-2.828 0l-3.191 3.196a.999.999 0 01-1.422-1.403l9.254-9.254a5.346 5.346 0 013.793-1.576z" />
    </Svg>
  )
}

export default SvgComponent

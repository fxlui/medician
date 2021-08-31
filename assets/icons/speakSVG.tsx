import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={50}
      height={50}
      {...props}
    >
      <Path d="M7 4C4.254 4 2 6.254 2 9v24c0 2.746 2.254 5 5 5h4.094c.136 1.203.12 2.316-.188 3.25-.379 1.148-1.086 2.113-2.406 2.906A1 1 0 009 46c4.242 0 9.105-2.215 11.563-8H43c2.746 0 5-2.254 5-5V9c0-2.746-2.254-5-5-5zm0 2h36a3 3 0 013 3v24a3 3 0 01-3 3H20a1 1 0 00-.938.656c-1.554 4.242-4.332 6.262-7.218 7 .39-.558.761-1.148.969-1.781.519-1.578.476-3.305.156-5.063A1.002 1.002 0 0012 36H7a3 3 0 01-3-3V9a3 3 0 013-3z" />
    </Svg>
  )
}

export default SvgComponent

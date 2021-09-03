import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function HotSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 50 50"
      width={50}
      height={50}
      {...props}
    >
      <Path d="M21.75 0a1 1 0 00-.813.906c-.62 6.95-4.636 11.535-8.718 16.282C8.137 21.934 4 26.895 4 34.343c0 5.105 2.285 9.062 5.281 11.687C12.277 48.656 15.945 50 19 50c.36.004.695-.184.879-.496a1.01 1.01 0 000-1.008c-.184-.312-.52-.5-.879-.496-2.445 0-5.777-1.164-8.406-3.469C7.964 42.227 6 38.86 6 34.344c0-6.715 3.684-11.145 7.75-15.875 3.754-4.367 7.703-9.059 8.844-15.75C37.738 13.339 44 24.137 44 32.25c0 7.71-4.707 13.918-9.375 15.813-.52.207-.77.792-.563 1.312.208.52.793.77 1.313.563C40.988 47.66 46 40.761 46 32.25c0-9.367-7.094-20.941-23.5-32.063A1.01 1.01 0 0021.844 0h-.094zm3.844 15.406a1.01 1.01 0 00-.688.39c-.164.22-.23.497-.187.767.61 3.523.758 6.421.562 8.593-.195 2.172-.738 3.617-1.312 4.282-.574.664-1.012.746-1.875.375-.864-.372-2.082-1.446-3.313-3.344a.993.993 0 00-.797-.45 1.009 1.009 0 00-.828.387c-3.73 5.032-3.562 9.055-2.25 11.657 1.313 2.601 3.625 3.812 3.625 3.812.317.223.73.242 1.07.055a1 1 0 00-.133-1.805s-1.78-.957-2.78-2.938c-.907-1.8-1.145-4.5 1.375-8.437 1.054 1.363 2.117 2.418 3.25 2.906 1.464.63 3.128.285 4.156-.906 1.027-1.191 1.593-3.027 1.812-5.438.153-1.683.032-3.769-.218-6.062 2.707 2.676 4.902 5.559 5.78 8.688 1.102 3.921.552 8.078-2.656 12.468a1.006 1.006 0 101.625 1.188c3.504-4.797 4.227-9.723 2.97-14.188-1.259-4.465-4.415-8.465-8.438-11.781-.211-.172-.48-.25-.75-.219z" />
    </Svg>
  );
}

export default HotSVG;
import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.706 0a12.272 12.272 0 00-8.702 3.589L3.593 19.995c-4.79 4.787-4.79 12.611 0 17.4v.004A12.3 12.3 0 0012.295 41c3.147 0 6.308-1.212 8.702-3.605l16.411-16.402v-.004c4.789-4.788 4.79-12.612 0-17.4A12.273 12.273 0 0028.706 0zm0 4.074c2.096 0 4.19.805 5.802 2.415a8.168 8.168 0 010 11.6l-7.693 7.69-11.603-11.6 7.693-7.69a8.181 8.181 0 015.801-2.415z"
        fill="#fff"
      />
    </svg>
  )
}

export default SvgComponent

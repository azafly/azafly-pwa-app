export function HistorySvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={31}
      viewBox="0 0 28 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#prefix__filter0_d)">
        <path
          d="M14 2.019c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10h2a8 8 0 101.385-4.5H10v2H4v-6h2v2.5a9.98 9.98 0 018-4zm1 5v4.585l3.243 3.243-1.415 1.415L13 12.432V7.019h2z"
          fill="#000"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_d"
          x={-2}
          y={0.019}
          width={32}
          height={32}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}
import * as React from "react"

export function ActivitySvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className="prefix__highlight-icon"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.245 14.781l2.993-3.89 3.414 2.682 2.929-3.78"
                stroke={props.stroke ?? "#4990a4"}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx={19.995}
                cy={4.2}
                r={1.922}
                stroke={props.stroke ?? "#4990a4"}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.924 3.12H7.657c-3.012 0-4.88 2.133-4.88 5.144v8.083c0 3.011 1.832 5.135 4.88 5.135h8.604c3.011 0 4.878-2.124 4.878-5.135v-7.04"
                stroke={props.stroke ?? "#4990a4"}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}


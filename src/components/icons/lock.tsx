import * as React from "react"

export function LockSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M16.424 9.448V7.3a4.552 4.552 0 00-4.551-4.551 4.55 4.55 0 00-4.57 4.53v2.168"
                stroke="#868686"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M15.683 21.25h-7.64a3.792 3.792 0 01-3.793-3.792v-4.29a3.792 3.792 0 013.792-3.791h7.641a3.792 3.792 0 013.792 3.792v4.289a3.792 3.792 0 01-3.792 3.792z"
                stroke="#868686"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.863 14.203v2.22"
                stroke="#868686"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}


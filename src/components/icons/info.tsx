import * as React from "react"

export function InfoSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            width={37}
            height={38}
            viewBox="0 0 37 38"
            fill="none"
            min={40}
            xmlns="http://www.w3.org/2000/svg"

        >
            <circle cx={18.725} cy={18.78} r={18.264} fill="#4990A4" />
            <path
                d="M19.569 28.516V15.048h-2.604v13.468h2.604zM16.377 9.952c0 1.036.84 1.876 1.876 1.876 1.064 0 1.904-.84 1.904-1.876 0-1.064-.84-1.904-1.904-1.904-1.036 0-1.876.84-1.876 1.904z"
                fill="#fff"
            />
        </svg>
    )
}

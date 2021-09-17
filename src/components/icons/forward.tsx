export function ForwardSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={31}
            height={30}
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g
                opacity={props.opacity}
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M29.495 14.635h-28M24.495 20.635l5-6-5-6" />
            </g>
        </svg>
    )
}

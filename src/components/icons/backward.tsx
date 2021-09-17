export function BackwardSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            onClick={props.onClick}
            width={31}
            height={30}
            viewBox="0 0 31 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                opacity={props.opacity}
                d="M1.495 15.635h28"
                stroke={props.stroke ?? 'white'}
                strokeWidth={2}
                fill={props.fill ?? 'white'}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                opacity={props.opacity}
                d="M6.495 9.635l-5 6 5 6"
                stroke={props.stroke ?? 'white'}
                fill={props.fill ?? 'white'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

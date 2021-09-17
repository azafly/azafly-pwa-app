export function CalendarSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.093 9.404h17.824M16.442 13.31h.01M12.005 13.31h.009M7.558 13.31h.009M16.442 17.196h.01M12.005 17.196h.009M7.558 17.196h.009M16.044 2v3.29M7.966 2v3.29"
                stroke={props.stroke ?? 'white'}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M16.238 3.58H7.771C4.834 3.58 3 5.214 3 8.221v9.05C3 20.326 4.834 22 7.771 22h8.458C19.175 22 21 20.355 21 17.348V8.222c.01-3.007-1.816-4.643-4.762-4.643z"
                stroke={props.stroke ?? 'white'}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
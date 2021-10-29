import * as React from 'react';

export function TransactionSvgComponent(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg height={24} width={24} xmlns='http://www.w3.org/2000/svg' {...props}>
            <g
                fill='none'
                fillRule='evenodd'
                stroke={props.stroke}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.636}
                transform='translate(1 1)'
            >
                <circle cx={14.438} cy={7.563} r={6.875} />
                <path d='M5.844 12.918c0 .502.306.954.772 1.14l1.893.758a1.23 1.23 0 01-.459 2.371H6.187m1.376 1.376v-1.375M4.84 8.128a6.875 6.875 0 109.033 9.031m1.94-12.346h-1.864a1.23 1.23 0 00-.458 2.37l1.892.758a1.23 1.23 0 01-.459 2.372h-1.861m1.375-5.5V3.438m0 8.25v-1.376' />
            </g>
        </svg>
    );
}

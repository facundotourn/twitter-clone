import * as React from 'react'

export default function Search({ height, width, stroke }) {
  return (
    <svg
      height={height}
      viewBox="0 0 21 21"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={8.5} cy={8.5} r={5} />
        <path d="M17.571 17.5L12 12" />
      </g>
    </svg>
  )
}

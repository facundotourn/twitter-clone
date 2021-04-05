import * as React from 'react'

export default function Home({ height, width, stroke }) {
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
        <path d="M1.5 10.5l9-9 9 9M3.5 11.5v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
      </g>
    </svg>
  )
}

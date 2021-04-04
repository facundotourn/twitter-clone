import { colors } from '../../styles/theme'

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          background: ${colors.black};
          border: 0;
          cursor: pointer;
          color: ${colors.white};
          border-radius: 9999px;
          font-weight: 800;
          font-size: 16px;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  )
}

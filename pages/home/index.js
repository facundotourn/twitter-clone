import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { useEffect, useState } from 'react'

export default function HomPage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then(res => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ avatar, message, username, id }) => {
            return (
              <Devit
                key={id}
                username={username}
                avatar={avatar}
                message={message}
                id={id}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
        }

        section {
          padding-top: 49px;
        }

        nav {
          bottom: 0;
          position: sticky;
          border-top: 1px solid #ccc;
          height: 49px;
          width: 100%;
        }
      `}</style>
    </>
  )
}

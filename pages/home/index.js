import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

export default function HomPage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetchLatestDevits().then(timeline => {
        setTimeline(timeline)
      })
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ avatar, content, userName, id, userId, createdAt }) => {
              return (
                <Devit
                  key={id}
                  createdAt={createdAt}
                  userName={userName}
                  avatar={avatar}
                  content={content}
                  id={id}
                  userId={userId}
                />
              )
            }
          )}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          align-items: center;
          border-bottom: 1px solid #eee;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
          padding-left: 15px;
        }

        nav {
          bottom: 0;
          position: sticky;
          border-top: 1px solid #eee;
          height: 49px;
          width: 100%;
          background: #fff;
        }
      `}</style>
    </>
  )
}

import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import { colors } from 'styles/theme'
import Head from 'next/head'

export default function HomePage() {
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
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ avatar, img, content, userName, id, userId, createdAt }) => {
              return (
                <Devit
                  key={id}
                  createdAt={createdAt}
                  userName={userName}
                  avatar={avatar}
                  img={img}
                  content={content}
                  id={id}
                  userId={userId}
                />
              )
            }
          )}
        </section>
        <nav>
          <Link href={'/home'}>
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href={'/search'}>
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href={'/compose/tweet'}>
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
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

        section {
          flex: 1;
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
          display: flex;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
          transition: 200ms ease-in-out;
        }

        nav a:hover {
          background: radial-gradient(#0099ff11 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
